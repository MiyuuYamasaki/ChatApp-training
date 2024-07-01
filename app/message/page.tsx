"use client";

import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VscChevronLeft } from "react-icons/vsc";
import { BsWechat } from "react-icons/bs";
import {
  RiAccountCircleLine,
  RiAccountCircleFill,
  RiSendPlaneFill,
} from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import { MdDriveFileRenameOutline } from "react-icons/md";

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
  const [inputContent, setinputContent] = useState("");

  const router = useRouter();

  //Home back
  const handleClick = () => {
    router.push("/");
  };

  //edit page
  const handleeditClick = () => {
    router.push(`/message/edit/${authorId}`);
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
    fetchMessages();
    setinputContent("");
  };

  const [messages, setmessages] = useState<Message[]>([]);
  const [users, setusers] = useState<User[]>([]);

  const fetchMessages = async () => {
    const res = await fetch("/api/message");
    const messages = await res.json();
    setmessages(messages);
  };
  //GET
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user");
      const users = await res.json();
      console.log(users);
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
    if (confirmed) {
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
        <div className="flex items-center gap-3 flex-grow-1">
          <span
            onClick={handleClick}
            className="text-3xl text-gray-500 font-bold hover:text-sky-500"
            title="Back to home"
          >
            <VscChevronLeft />
          </span>
          <div className="flex font-bold text-xl text-gray-600 justify-center w-full">
            Chat Page
            <BsWechat className="flex text-2xl text-sky-300" />
          </div>
        </div>
        <div className="grid">
          <div className="flex">
            <div>
              <select
                onChange={(event) => {
                  const selectedUserName = event.target.value;
                  const selectedUser = users.find(
                    (user) => user.name === selectedUserName
                  );
                  if (selectedUser) {
                    setAuterId(selectedUser.id);
                  }
                }}
                name="authorId"
                id="autherId"
                title="Select user"
                className="row-start-1 col-start-1 bg-slate-50 text-sm border border-gray-300 rounded-md px-5 py-1"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <span 
            onClick={handleeditClick}
            className="text-3xl text-gray-600"
            title="Edit name">
              <MdDriveFileRenameOutline />
            </span>
          </div>
        </div>
      </header>
      <div className="bg-background border-t px-4 py-3 flex items-center gap-2 bg-gray-100">
        <textarea
          onChange={(event) => {
            setContent(event.target.value);
            setinputContent(event.target.value);
          }}
          value={inputContent}
          name="content"
          id="content"
          className="w-full p-2"
          placeholder={inputContent ? "" : "Please enter a message."}
        ></textarea>
        <span
          onClick={() => {
            handleSubmit();
            setContent("");
          }}
          className="text-4xl hover:text-sky-600 cursor-pointer"
          title="Send"
        >
          <RiSendPlaneFill />
        </span>
      </div>
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
                  <div
                    className={`flex items-start gap-3 ${
                      isAuthorA ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isAuthorA && (
                      <div className="flex flex-col justify-center items-center">
                        <span className="text-3xl text-gray-600">
                          <RiAccountCircleFill />
                        </span>
                        <p className="text-xs">
                          {user ? user.name : "Unknown User"}
                        </p>
                      </div>
                    )}
                    <div
                      className={`bg-muted rounded-lg p-3 max-w-[80%]  shadow-lg shadow-gray-500/40 ${
                        isAuthorA ? "bg-sky-200" : "bg-gray-100"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div className="flex justify-end items-center mt-1 text-xs text-muted-foreground">
                        <span className="mr-3">{formattedDateTime}</span>
                        <span
                          onClick={() => handleUpdate(message.id)}
                          className="flex text-gray-600 hover:text-white"
                          title="Delete"
                        >
                          <RxCrossCircled />
                        </span>
                      </div>
                    </div>

                    {isAuthorA && (
                      <div className="flex flex-col justify-center items-center">
                        <span className="text-3xl text-gray-600">
                          <RiAccountCircleLine />
                        </span>
                        <p className="text-xs">
                          {user ? user.name : "Unknown User"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
