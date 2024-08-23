import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ModeToggle } from "@/components/wrapper/ModeToggle";



const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
       
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">CSI-Innowave</span>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <span className="sr-only">Toggle menu</span>
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuItem>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="#">Products</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="#">About</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="#">Contact</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <nav className="items-center space-x-6 text-sm font-medium hidden md:flex">
          <Link href="/" className="transition-colors hover:text-foreground/80">Dashboard</Link>
          <Link href="/createEvent" className="transition-colors hover:text-foreground/80">Create Events</Link>
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center  gap-4 ">
           
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;