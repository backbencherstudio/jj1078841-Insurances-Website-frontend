"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { IoSearchOutline } from 'react-icons/io5';
import { IoSendSharp } from 'react-icons/io5';
import { BsThreeDotsVertical, BsEmojiSmile } from 'react-icons/bs';
import { IoAttach } from 'react-icons/io5';
import avatar1 from "@/public/avatar-1 (1).png"
import avatar2 from "@/public/avatar-1 (2).png"
import avatar3 from "@/public/avatar-1 (3).png"
import avatar4 from "@/public/avatar-1 (4).png"
import avatar5 from "@/public/avatar-1 (5).png"
import avatar6 from "@/public/avatar-1 (6).png"
import avatar7 from "@/public/avatar-1 (7).png"
import avatar8 from "@/public/avatar-1 (8).png"
import avatar9 from "@/public/avatar-1 (9).png"

interface Message {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  time: string;
  status?: string;
  isTyping?: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: any;
  lastMessage: string;
  time: string;
  isOnline?: boolean;
}

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([
    {
      id: '1',
      name: 'Ralph Edwards',
      avatar: avatar1,
      lastMessage: 'Hey, how\'s it going?',
      time: '10:30 AM',
    },
    {
      id: '2',
      name: 'Theresa Webb',
      avatar: avatar2,
      lastMessage: 'Typing...',
      time: '04:50 PM',
      isOnline: true,
    },
    {
      id: '3',
      name: 'Esther Howard',
      avatar:  avatar3,
      lastMessage: 'Finished reading a captivating no...',
      time: 'Yesterday',
    },
    {
      id: '4',
      name: 'Eleanor Pena',
      avatar: avatar4,
      lastMessage: 'Finished reading a captivating no...',
      time: 'Yesterday',
    },
    {
      id: '5',
      name: 'Albert Flores',
      avatar: avatar5,
      lastMessage: 'Finished reading a captivating no...',
      time: 'Yesterday',
    }
  ]);

  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      message: currentMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '/avatars/you.png'
    };

    setMessages(prev => [...prev, newMessage]);
    
    setChatUsers(prev => prev.map(user => 
      user.id === selectedUser.id 
        ? { ...user, lastMessage: currentMessage, time: newMessage.time }
        : user
    ));

    setCurrentMessage('');

    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: selectedUser.name,
        message: `This is an automated reply to: ${currentMessage}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: selectedUser.avatar
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const filteredUsers = chatUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCurrentUserMessages = () => {
    return messages.filter(message => 
      message.sender === 'You' || 
      (selectedUser && message.sender === selectedUser.name)
    );
  };

  return (
    <>
      <h1 className=' text-4xl font-semibold py-5 text-gray-bold'>Message</h1>
      <div className="flex h-[calc(100vh-160px)] bg-white p-8  overflow-hidden gap-6">
        {/* Left Sidebar - Chat List */}
        <div className="w-full md:w-1/3 lg:w-1/4   bg-disabled rounded-l-xl">
          <div className="h-full flex flex-col">
            {/* Search Section - Fixed */}
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none"
                />
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            
            {/* Chat List - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-2 p-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center p-3 hover:bg-[#e0f1fb] rounded-lg cursor-pointer ${
                      selectedUser?.id === user.id ? 'bg-[#e0f1fb]' : ''
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="relative">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-[#0B1C39]">{user.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
                    </div>
                    <span className="text-xs text-gray-400">{user.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Chat Window */}
        <div className="hidden md:flex flex-col flex-1 bg-disabled  rounded-xl">
          {selectedUser ? (
            <>
              {/* Chat Header - Fixed */}
              <div className="flex items-center justify-between p-4  bg-[#e6f4fa] rounded-t-xl">
                <div className="flex items-center">
                  <Image
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <h2 className="text-lg font-medium text-[#0B1C39]">{selectedUser.name}</h2>
                    <p className="text-sm text-green-500">Online</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <BsThreeDotsVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Chat Messages - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {getCurrentUserMessages().map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'You' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender !== 'You' && (
                      <Image
                        src={message.avatar}
                        alt={message.sender}
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'You'
                          ? 'bg-[#2EB0E4] text-white'
                          : 'bg-white'
                      }`}
                    >
                      <p className="text-sm  ">{message.message}</p>
                      <span className={`text-xs ${
                        message.sender === 'You' ? 'text-white/80' : 'text-gray-500'
                      } mt-1 block`}>
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input - Fixed */}
              <div className="p-4 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <BsEmojiSmile className="w-5 h-5 text-gray-500" />
                  </button>
                  
                  <input
                    type="text"
                    placeholder="Type message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 p-2 border border-[#E2E8F0] rounded-lg focus:outline-none"
                  />
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <IoAttach className="w-5 h-5 text-gray-500" />
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    className="p-2 bg-[#2eb0e4] text-white rounded-lg hover:bg-blue-600 flex items-center gap-1"
                  >
                    Send <IoSendSharp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </ >
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </ >
  );
}
