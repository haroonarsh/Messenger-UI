'use client';

import FriendChat from '@/features/friendChat/friendChat'
import FriendsBar from '@/features/friendsBar/friendsBar'
import Sidebar from '@/features/sidebar/sidebar'
import { useAuth } from '@/hooks/auth/useAuth';
import { IUser } from '@/libs/types';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';

function Page() {
  const { loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user || user === null) {
      router.push('/');
    }
  }, [loading, user, router]);

  return (
    <main className='bg-[#f5f5f5] h-screen overflow-hidden w-full flex items-start justify-start'>
      <Sidebar data={user as IUser} />
      
      <FriendsBar {...pathname === '/main' ? { friend: null } : {}}/>
      <FriendChat conversationId="" friend={null} />
      {/* <FriendInfo /> */}
      <Toaster />
    </main>
  )
}

export default Page