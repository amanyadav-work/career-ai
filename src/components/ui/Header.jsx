"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book, Menu, Sunset, Trees, Zap, X, Brain } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getInitials } from "@/lib/utils";

const menu = [
  { title: "Home", url: "/" },
  {
    title: "Products",
    items: [
      {
        title: "Dashboard",
        description: "The latest industry news, updates, and info",
        icon: <Book className="size-5 shrink-0" />,
        url: "/pages/dashboard",
      },
      {
        title: "Career Path",
        description: "Our mission is to innovate and empower the world",
        icon: <Trees className="size-5 shrink-0" />,
        url: "/pages/careerpath",
      },
      {
        title: "Skill Gap",
        description: "Browse job listing and discover our workspace",
        icon: <Sunset className="size-5 shrink-0" />,
        url: "/pages/skillgap",
      },
      {
        title: "Support",
        description: "Get in touch with our support team or visit our community forums",
        icon: <Zap className="size-5 shrink-0" />,
        url: "/pages/markettrends",
      },
    ],
  },
];

const auth = {
  login: { title: "Login", url: "/login" },
  signup: { title: "Sign Up", url: "/signup" },
};

export const Navbar1 = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Brain className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Career AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth / Avatar */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Avatar>
                {user.profile ? (
                  <AvatarImage src={user.profile} alt={user.name} />
                ) : (
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                )}
              </Avatar>
            ) : (
              <>
                <Link href={auth.login.url}>
                  <Button variant="ghost">{auth.login.title}</Button>
                </Link>
                <Link href={auth.signup.url}>
                  <Button>{auth.signup.title}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col gap-4"
              >
                {menu.map((item) => renderMobileMenuItem(item, setIsMobileMenuOpen))}
              </Accordion>

              <div className="flex flex-col space-y-2 px-3 pt-4">
                {user ? (
                  <div className="flex items-center gap-2">
                    <Avatar>
                      {user.profile ? (
                        <AvatarImage src={user.profile} alt={user.name} />
                      ) : (
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      )}
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                ) : (
                  <>
                    <Link href={auth.login.url} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">{auth.login.title}</Button>
                    </Link>
                    <Link href={auth.signup.url} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">{auth.signup.title}</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const renderMenuItem = (item) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground !w-80">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title}>
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item, onClick) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} onClick={onClick} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className="text-md font-semibold block px-3 py-2"
      onClick={() => onClick(false)}
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item, onClick }) => {
  return (
    <Link
      href={item.url}
      onClick={() => onClick && onClick(false)}
      className="hover:bg-muted hover:text-accent-foreground flex select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

