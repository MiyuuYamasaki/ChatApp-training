"use client";

import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const prisma = new PrismaClient();

type Message = {
  id: number;
  content: string;
  authorId: number;
  createdAt: string;
  published: boolean;
};

type User = {
  id: number;
  name: string;
};
export default function ChatPage() {
  const [content, setContent] = useState("");
  const [authorId, setAuterId] = useState<number>(1);
  const [published, setPublished] = useState<boolean>(false);

  const router = useRouter();

  //Home back
  const handleClick = () => {
    router.push("/");
  };

  //CREATE
  const handleSubmit = async () => {
    const Response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, authorId, published }),
    });
    console.log(Response);
    fetchMessages();
  };

  const [messages, setmessages] = useState<Message[]>([]);
  const [users, setusers] = useState<User[]>([]);

  const fetchMessages = async () => {
    const res = await fetch("/api/message");
    const messages = await res.json();
    console.log(messages);
    setmessages(messages);

  };
  //GET
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user");
      const users = await res.json();
      setusers(users);
    };

    fetchMessages();
    fetchUsers();
    router.refresh();
  }, []);

  const id = useParams<{ id: string }>().id;

  //EDIT
  const handleUpdate = async (id: number) => {
    const confirmed = window.confirm("Would you like to delete this message?");
    if(confirmed) {
      const Response = await fetch(`/api/message/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ published: true }),
    });
    fetchMessages();
  }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-background border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            onClick={handleClick}
            className="i-ep-d-arrow-left w-10 h-10 bg-sky-300"
          ></span>
          <div className="font-bold text-xl text-gray-600">Chat Page</div>
          <span className="i-ep-chat-dot-round w-6 h-6 bg-gray-600"></span>
        </div>
        <div className="grid">
          <div>
            <p className="text-sm text-gray-500">Select user</p>
          <select
            onChange={(event) => {
              const selectedUserName = event.target.value;
              const selectedUser = users.find((user) => user.name === selectedUserName);
              if (selectedUser) {
                setAuterId(selectedUser.id);
              }
            }}
            name="authorId"
            id="autherId"
            className="row-start-1 col-start-1 bg-slate-50 dark:bg-slate-800 text-sm border border-gray-300 rounded-md px-5 py-1"
          >
            <option value={"A"}>A</option>
            <option value={"B"}>B</option>
          </select>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-3">
          {messages.map((message) => {
            const user = users.find((user) => user.id === message.authorId);
            const isAuthorA = message.authorId === 1;
            const ispublished = message.published === true;
            const createdAt = new Date(message.createdAt);
            const formattedDateTime = createdAt.toLocaleString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });
            return (
              <div key={message.id}>
                {!ispublished && (
                  <div className={`flex items-start gap-3 ${isAuthorA ? "justify-end" : "justify-start"}`}>
                    {!isAuthorA && (
                      <span className="i-fa6-solid-b w-6 h-6 bg-gray-600"></span>
                    )}
                    <div className={`bg-muted rounded-lg p-3 max-w-[80%]  ${isAuthorA ? 'bg-sky-200' : 'bg-gray-100'}`}>
                      <p>{message.content}</p>
                      <div className=" justify-end items-center mt-1 text-xs text-muted-foreground">
                        <span className="mr-3 ">{formattedDateTime}</span>
                        <span
                          onClick={() => handleUpdate(message.id)}
                          className="flex i-ep-circle-close-filled w-3 h-3 bg-gray-600 hover:bg-white"
                        ></span>
                      </div>
                    </div>
                    {isAuthorA && (
                      <span className="i-fa6-solid-a w-6 h-6 bg-gray-600"></span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-background border-t px-4 py-3 flex items-center gap-2 bg-gray-100">
        <textarea
          onChange={(event) => {
            setContent(event.target.value);
          }}
          name="content"
          id="content"
          className="w-full p-2"
        ></textarea>
        <span 
        onClick={handleSubmit}
        className="i-ep-position w-10 h-10 bg-gray-500 hover:bg-sky-500 "></span>
      </div>
    </div>
  );
}
