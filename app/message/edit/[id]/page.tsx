"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiLegoSmileyLight } from "react-icons/pi";

export default function EditPage() {
  const id = useParams<{ id: string }>().id;

  const [name, setName] = useState("");
  const router = useRouter();

  //back to chat page
  const handleClick = () => {
    router.push("/message");
  };

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch(`/api/user/edit/${parseInt(id)}`);
      const messages = await res.json();
      setName(messages.name);
    };
    fetchMessage();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/user/edit/${parseInt(id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name }),
    });
    const user = await res.json();

    router.push("/message");
    router.refresh();
  };

  return (
<div className="container mx-auto max-w-md ">
      <div className="flex flex-col items-center space-y-6 h-screen justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground">Update your profile information.</p>
        </div>
        <div className="text-5xl"><PiLegoSmileyLight /></div>
        <div className="w-full space-y-4">
          <div className="grid gap-2">
            <h1 className="name">Name</h1>
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              value={name}
              className="rounded-md  border-2 p-2"
            />
          </div>
          </div>
          <div className="flex">
          <button onClick={handleUpdate}
          className="mr-10 font-bold bg-green-400 hover:bg-green-500 rounded-md px-10 py-2 text-sm text-white shadow items-center justify-center">
            Save
          </button>
          <button onClick={handleClick}
          className="font-bold bg-black hover:bg-gray-500 rounded-md px-10 py-2 text-sm text-white shadow items-center justify-center">
            Back
          </button>
          </div>
        </div>
      </div>
  );
}
