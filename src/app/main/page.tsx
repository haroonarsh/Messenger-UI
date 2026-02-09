'use client';

import FriendChat from '@/features/friendChat/friendChat'
import FriendInfo from '@/features/friendInfo/friendInfo'
import FriendsBar from '@/features/friendsBar/friendsBar'
import Sidebar from '@/features/sidebar/sidebar'
import { useAuth } from '@/hooks/auth/useAuth';
import { IUser } from '@/libs/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const loadingToast = () => toast.loading("Loading...", { duration: 3000, position: "top-right"});
const errorToast = () => toast.error("Something went wrong");

function page() {
  const { loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user || user === null) {
      router.push('/');
    } else {
      console.log("User:", user);
    }
  }, [loading, user, router]);

  // if (loading) return loadingToast();
  // if (!user) return errorToast();

  return (
    <main className='bg-[#f5f5f5] h-screen overflow-hidden w-full flex items-start justify-start'>
      <Sidebar data={user as IUser} />
      <FriendsBar />
      <FriendChat conversationId="" friend={null} />
      {/* <FriendInfo /> */}
      <Toaster />
    </main>
  )
}

export default page