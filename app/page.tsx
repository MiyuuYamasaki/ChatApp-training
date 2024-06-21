"use client";

import { PrismaClient } from "@prisma/client";
import Link from "next/link";


export default function HomePage() {

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-r from-gray-100 to-gray-800">
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-8 lg:space-y-12">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="flex flex-col items-start justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome
                </h1>
                <p className="text-muted-foreground md:text-xl lg:text-lg xl:text-xl">
                This is a global chat shared with everyone. <br />
                Please refrain from sharing any personal information. 
                </p>
                <Link 
                  href="/message"
                  className="font-bold bg-white hover:bg-orange-500 rounded-md px-5 py-2 text-sm shadow items-center justify-center transition-color duration-500"
                  prefetch={false}
                >
                START!!!
                </Link>
            </div>
          </div>
          </div>
        </section>
      </main>
    </div>
    
  )
}
