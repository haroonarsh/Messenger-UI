"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User } from "@/libs/types"
import { useAuth } from "@/hooks/auth/useAuth"
import { useSocket } from "@/hooks/socket/useSocket"
import { searchUsers, sendFriendRequest } from "@/services/user/user.service"
import toast from "react-hot-toast"

// Mock user data
// const MOCK_USERS = [
//   { id: 1, name: "Alice Johnson", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alice" },
//   { id: 2, name: "Bob Smith", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Bob" },
//   { id: 3, name: "Carol White", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Carol" },
//   { id: 4, name: "David Brown", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David" },
//   { id: 5, name: "Emma Davis", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emma" },
//   { id: 6, name: "Frank Miller", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Frank" },
//   { id: 7, name: "Grace Lee", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Grace" },
//   { id: 8, name: "Henry Wilson", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Henry" },
// ]

interface InviteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InviteModal({ open, onOpenChange }: InviteModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])

  ///////////////
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [debounceTime, setDebounceTime] = useState<NodeJS.Timeout | null>(null);
  const { user } = useAuth();
  const { socket } = useSocket();

  // Debounce search
  useEffect(() => {
    if (debounceTime) clearTimeout(debounceTime);

    const timer = setTimeout(async () => {
      if (searchQuery.length > 0) {
        setLoading(true);
        try {
          const searchPayload = { q: searchQuery };
          const data = await searchUsers(searchPayload);
          setUsers(data.filter(u => u._id !== user?._id)); // Exclude self
        } catch (error) {
          toast.error("Error searching users");
          setUsers([]);
        } finally {
          setLoading(false);
        }
      } else {
        setUsers([]);
      }
    }, 300); // 300ms debounce

    setDebounceTime(timer);

    return () => {
      if (debounceTime) clearTimeout(debounceTime);
    };
  }, [searchQuery, user?._id]);

  const handleSendRequest = async (userId: string) => {
    try {
      const payload = { userId };
      await sendFriendRequest(payload);
      toast.success("Friend request sent");
      setUsers(prev => prev.filter(u => u._id !== userId)); // Remove from list
      // Socket handles recipient notification
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to send request");
    }
  };

  // // Filter users based on search query
  // const filteredUsers = useMemo(() => {
  //   if (!searchQuery.trim()) return MOCK_USERS

  //   return MOCK_USERS.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  // }, [searchQuery])

  // const handleSelectUser = (userId: string) => {
    
  // }
  // const handleInvite = () => {
  //   console.log("Inviting users:", selectedUsers)
  //   setSelectedUsers([])
  //   setSearchQuery("")
  //   onOpenChange(false)
  // }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to conversation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <Input
            placeholder="Search by name..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-gray-200 text-md"
          />

          {/* Loading Indicator */}
          {loading && <p className="text-sm text-muted-foreground">Searching...</p>}

          {/* Users List */}
          <div className="space-y-2 max-h-80 pr-1 overflow-y-auto scrollbar-component">
            {users.map((user) => (
                <div
                  key={user._id}
                  // onClick={() => handleSelectUser(user._id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors`}
                >
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage
                      src={typeof user.avatar === "string" ? user.avatar : (user.avatar?.url ?? "/placeholder.svg")}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{user.name}</p>
                  </div>

                  {/* Checkbox Indicator */}
                  {/* <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedUsers.includes(user._id) ? "bg-primary border-primary" : "border-muted-foreground"
                    }`}
                  >
                    {selectedUsers.includes(user._id) && (
                      <X className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                    )}
                  </div> */}
                  <Button
                    onClick={() => handleSendRequest(user._id)}
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Send Request
                  </Button>
                </div>
              )
            )}
            {users.length === 0 && searchQuery.length > 0 && !loading && (
              <p className="text-sm text-gray-500 mt-2 text-center">No users found.</p>
            )}
              {/* <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">No users found</p>
              </div> */}
          </div>

          {/* Action Buttons */}
          {/* <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 text-gray-200 cursor-pointer">
              Cancel
            </Button>
            <Button onClick={() => onOpenChange(false)} disabled={selectedUsers.length === 0} className="flex-1 border hover:bg-blak/10 cursor-pointer">
              Invite ({selectedUsers.length})
            </Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}


// ${
//                     selectedUsers.includes(user._id)
//                       ? "bg-primary/10 border border-primary"
//                       : "hover:bg-muted border border-transparent"
//                   }