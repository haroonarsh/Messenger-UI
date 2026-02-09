// frontend/src/components/GlobalMessageListener.tsx

"use client";

import { useUnread } from '@/context/UnreadContext';
import { useAuth } from '@/hooks/auth/useAuth';
import { useSocket } from '@/hooks/socket/useSocket';
import { useEffect, useRef } from 'react';

import toast from 'react-hot-toast';

export default function GlobalNotificationListener() {
  const { socket } = useSocket();
  const { user } = useAuth();
  const { incrementUnread } = useUnread();
  const listenerAdded = useRef(false);

  useEffect(() => {
    if (!socket || !user?.id) return;

    const handleNotification = (data: { message: any; senderId: string }) => {
      // Only notify if not from current user
      if (data.senderId !== user.id) {
        toast(`${data.message.sender.name}: ${data.message.text || "New message"}`, {
          icon: '💬',
          position: "top-right",
          duration: 4000,
        });

        incrementUnread(data.senderId);
      }
    };

    socket.on("new-message-notification", handleNotification);
    listenerAdded.current = true;

    return () => {
      socket.off("new-message-notification", handleNotification);
      listenerAdded.current = false;
    };
  }, [socket, user?.id, incrementUnread]);

  return null;
}