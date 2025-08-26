import FriendChat from '@/features/friendChat/friendChat'
import FriendInfo from '@/features/friendInfo/friendInfo'
import FriendsBar from '@/features/friendsBar/friendsBar'
import Sidebar from '@/features/sidebar/sidebar'
import React from 'react'

function page() {
  return (
    <main className='bg-[#f5f5f5] h-screen overflow-hidden w-full flex items-start justify-start'>
      <Sidebar />
      <FriendsBar />
      <FriendChat />
      <FriendInfo />
    </main>
  )
}

export default page