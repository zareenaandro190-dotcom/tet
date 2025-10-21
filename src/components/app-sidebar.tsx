
'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, BookOpen, Bot, User, Settings, LogOut, Search, TrendingUp, Calendar, Layers, Book, Bell } from 'lucide-react';

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/ebooks', label: 'E-Books', icon: BookOpen },
  { href: '/subjects', label: 'Subjects', icon: Book },
  { href: '/flashcards', label: 'Flashcards', icon: Layers },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/progress', label: 'My Progress', icon: TrendingUp },
  { href: '/schedule', label: 'Schedule', icon: Calendar },
  { href: '/chatbot', label: 'AI Chat', icon: Bot },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { state, setOpenMobile } = useSidebar();
    const isCollapsed = state === 'collapsed';

    const handleLinkClick = () => {
        if (setOpenMobile) {
            setOpenMobile(false);
        }
    }

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <AppLogo className="size-8 shrink-0 text-primary"/>
            <span className="text-lg font-semibold font-headline group-data-[collapsible=icon]:hidden">
                EduSpark
            </span>
            <div className="flex-1" />
            <SidebarTrigger className="hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} onClick={handleLinkClick}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href) && (item.href === '/' ? pathname === '/' : true)}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={
                `w-full justify-start items-center gap-2 p-2 ${isCollapsed ? 'justify-center' : ''}`
            }>
                <Avatar className="size-8">
                    <AvatarImage src="https://picsum.photos/seed/1/100/100" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                    <span className="font-medium text-sm">Aspirant</span>
                    <span className="text-xs text-muted-foreground">user@example.com</span>
                </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" side="top" align={isCollapsed ? "center" : "end"}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  );
}
