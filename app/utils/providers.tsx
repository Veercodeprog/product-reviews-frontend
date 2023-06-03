'use client'
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation'
import { SessionManagerProvider } from "./sessionnew";
import { useState } from 'react';
import UseSession from './useSession';
import MainHeader from "../components/layout/main-header";
import Footer from "../components/layout/footer";	
import SessionManager from './session';
export function Providers({ children }: { children: React.ReactNode }) {
const [isLoading, setLoading] = useState(false);
const [user, setUser] = useState<any | null>(null);
const updateUser = (user) => {
  setUser(user);
};
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const excludeHeader = pathname.startsWith('/admin')
 const excludeHeader1 = pathname.startsWith('/blog')

  return (
    <div>
{/* <SessionManager updateUser={setUser} setLoading={setLoading} /> */}

       {!(excludeHeader ) && <MainHeader />} 
        {children}
 
   {!(excludeHeader ) && <Footer />} 
    </div>
  );
}

