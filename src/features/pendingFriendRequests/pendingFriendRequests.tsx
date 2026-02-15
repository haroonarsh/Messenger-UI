// components/PendingFriendRequests.tsx

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  UserPlus, 
  Loader2 
} from 'lucide-react';

import { useSocket } from '@/hooks/socket/useSocket';
import { useAuth } from '@/hooks/auth/useAuth';
import { 
  getPendingRequests, 
  acceptFriendRequest, 
  rejectFriendRequest   // We'll create this in service
} from '@/services/user/user.service';
import { useRouter } from 'next/navigation';
import { FriendRequest } from '@/libs/types';

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PendingFriendRequests({ open, onOpenChange }: Props) {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const router = useRouter();

  const { user } = useAuth();
  const { socket } = useSocket();

  // Fetch pending requests
  const fetchRequests = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(data);
    } catch (error: unknown) {
      toast.error('Failed to load pending requests');
    }
  };

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  // Real-time: New incoming request
  useEffect(() => {
    if (!socket) return;

    socket.on('friendRequest', (data: { from: FriendRequest['from'] }) => {
      toast.success(`${data.from.name} sent you a friend request!`);
      fetchRequests(); // Refresh list
    });

    return () => {
      socket.off('friendRequest');
    };
  }, [socket]);

  const handleAccept = async (requestId: string, fromUserId: string) => {
    setProcessingId(requestId);
    try {
      const res = await acceptFriendRequest(requestId);
      toast.success('Friend request accepted!');
      setRequests(prev => prev.filter(r => r._id !== requestId));

      // Optional: Emit to sender (if backend doesn't)
      socket?.emit('friendRequestAccepted', { toUserId: fromUserId });

      // Auto open chat
      if (res.conversationId) {
        router.push(`/chat/${res.conversationId}`);
      }
    } catch (error: unknown) {
      toast.error('Failed to accept request');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (requestId: string) => {
    setProcessingId(requestId);
    try {
      await rejectFriendRequest(requestId); // We'll add this function
      toast.success('Request declined');
      setRequests(prev => prev.filter(r => r._id !== requestId));
    } catch (error: unknown) {
      toast.error('Failed to reject request');
    } finally {
      setProcessingId(null);
    }
  };

  if (requests.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="hidden">
              <UserPlus className="w-6 h-6 text-blue-600" />
              Pending Friend Requests <Badge className="ml-2">{requests.length}</Badge>
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-muted-foreground py-8">
            No pending friend requests
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="space-y-4">
        <DialogHeader>
        <DialogTitle className="hidden">
          <UserPlus className="w-6 h-6 text-blue-600" />
          Pending Friend Requests <Badge className="ml-2">{requests.length}</Badge>
        </DialogTitle>
      </DialogHeader>
        {requests.map((req) => (
          <div key={req._id} className="flex items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={req.from.avatar?.url} />
                <AvatarFallback>{req.from.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{req.from.name}</p>
                <p className="text-sm text-muted-foreground">@{req.from.username}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleAccept(req._id, req.from._id)}
                disabled={processingId === req._id}
                className="bg-green-600 hover:bg-green-700"
              >
                {processingId === req._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                )}
                Accept
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReject(req._id)}
                disabled={processingId === req._id}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </ DialogContent>
    </ Dialog>
  );
}