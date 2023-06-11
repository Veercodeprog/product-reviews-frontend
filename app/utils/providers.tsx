'use client'
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { SessionManagerProvider } from "./sessionnew";
import { useState } from 'react';

import MainHeader from "../components/layout/main-header";
import Footer from "../components/layout/footer";
import SessionManager from './session';

export function Providers() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const excludeHeader = pathname.startsWith('/admin');
  const excludeHeader1 = pathname.startsWith('/blog');

  return (
    <div>
      {!excludeHeader && <MainHeader />}
    
      {!excludeHeader && <Footer />}
    </div>
  );
}
