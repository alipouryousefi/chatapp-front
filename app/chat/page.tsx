"use client";
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Volume2, Send } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
}

interface Chat {
  id: number;
  avatar: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  hasAudio: boolean;
  chatHistory: Message[];
}

const ChatInterface: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState<string>('');

  const messages: Chat[] = [
    {
      id: 1,
      avatar: "/api/placeholder/32/32",
      name: "Sarah",
      message: "Just shared some photos",
      time: "2:32 PM",
      unread: 2,
      hasAudio: true,
      chatHistory: [
        { id: 1, sender: "Sarah", content: "Hey, how are you?", time: "2:30 PM" },
        { id: 2, sender: "me", content: "I'm good, thanks! How about you?", time: "2:31 PM" },
        { id: 3, sender: "Sarah", content: "Just shared some photos from the event!", time: "2:32 PM" },
      ]
    },
    {
      id: 2,
      avatar: "/api/placeholder/32/32",
      name: "Tech Group",
      message: "Latest updates from the team",
      time: "1:45 PM",
      unread: 5,
      hasAudio: false,
      chatHistory: [
        { id: 1, sender: "Alex", content: "New project updates", time: "1:40 PM" },
        { id: 2, sender: "me", content: "Thanks for sharing", time: "1:42 PM" },
        { id: 3, sender: "Sarah", content: "Latest updates from the team meeting", time: "1:45 PM" },
      ]
    },
    {
      id: 3,
      avatar: "/api/placeholder/32/32",
      name: "Work Updates",
      message: "New project requirements",
      time: "12:30 PM",
      unread: 0,
      hasAudio: true,
      chatHistory: [
        { id: 1, sender: "Bot", content: "New requirements added", time: "12:25 PM" },
        { id: 2, sender: "me", content: "I'll review them", time: "12:28 PM" },
        { id: 3, sender: "Bot", content: "Thank you!", time: "12:30 PM" },
      ]
    }
  ];

  const handleSendMessage = (): void => {
    if (message.trim()) {
      // Here you would typically integrate with your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const ChatList: React.FC = () => (
    <div className="flex flex-col h-full border-r border-slate-700">
      <div className="p-4 border-b border-slate-700">
        <Input 
          placeholder="Search" 
          className="bg-slate-800 border-slate-700 text-white"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1">
          {messages.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center p-4 hover:bg-slate-800 cursor-pointer ${
                selectedChat?.id === chat.id ? 'bg-slate-800' : ''
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={chat.avatar} alt={chat.name} />
              </Avatar>
              
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{chat.name}</span>
                  <span className="text-sm text-slate-400">{chat.time}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {chat.hasAudio && <Volume2 className="h-4 w-4 text-slate-400" />}
                    <span className="text-sm text-slate-400">{chat.message}</span>
                  </div>
                  
                  {chat.unread > 0 && (
                    <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  const ChatView: React.FC<{ chat: Chat }> = ({ chat }) => (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-700 flex items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={chat.avatar} alt={chat.name} />
        </Avatar>
        <span className="ml-3 font-medium">{chat.name}</span>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chat.chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === 'me'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-white'
                }`}
              >
                <p>{msg.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-700 flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="bg-slate-800 border-slate-700 text-white"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  const EmptyChatView: React.FC = () => (
    <div className="flex-1 flex items-center justify-center text-slate-400 h-screen">
      <div className="text-center">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-slate-900 text-white flex">
      {/* Chat List - Fixed width */}
      <div className="w-80">
        <ChatList />
      </div>
      
      {/* Chat View - Flexible width */}
      <div className="flex-1">
        {selectedChat ? <ChatView chat={selectedChat} /> : <EmptyChatView />}
      </div>
    </div>
  );
};

export default ChatInterface;