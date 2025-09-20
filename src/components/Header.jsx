'use client'
import { ArrowUpFromDotIcon, BellDotIcon, Book, FlameIcon, Menu, Sunset, Trees, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Header = () => {
    const { theme } = useTheme()
    const [isFixed, setIsFixed] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 50) {
            setIsFixed(true);
          } else {
            setIsFixed(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    
    return (
        <>
            <p className="text-background bg-foreground text-center w-full p-2.5  text-sm underline"><BellDotIcon className="inline-block size-4 mr-2" /> Micro.ai named one of 2025&apos;s most innovative companies   <ArrowUpFromDotIcon className="rotate-90 inline-block size-4 ml-2" />         </p>
            <header className="py-4 min-h-21">
                <div className={`container max-w-[1400px] mx-auto sm:px-6 lg:px-8 ${isFixed?"fixed" :"relative"} top-3 transition-all duration-[5s] left-0 right-0 z-50 bg-transparent `}>
                    {/* Desktop Menu */}
                    <nav className="hidden justify-between lg:flex ">
                        <div className={`flex items-center gap-6 backdrop-blur-[10px] bg-background/85 rounded-sm ${isFixed&&"border border-white/15 "}  px-4 py-2.5`}>
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2">
                                <img src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_6dcd65ae310584ca482ed6db823cb5fc/micro1.png" className={`max-h-9 ${theme === "light" ? "" : "brightness-[11]"}`} alt="logo" />
                            </Link>
                            <div className="flex items-center">
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        {/* Menu Items */}
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger className="text-xs">Home</NavigationMenuTrigger>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger className="text-xs">Products</NavigationMenuTrigger>
                                            <NavigationMenuContent className="bg-popover text-popover-foreground">
                                                <NavigationMenuLink className="w-80 text-xs" href="/login">Blog</NavigationMenuLink>
                                                <NavigationMenuLink className="w-80 text-xs" href="/about">Company</NavigationMenuLink>
                                                <NavigationMenuLink className="w-80 text-xs" href="#">Careers</NavigationMenuLink>
                                                <NavigationMenuLink className="w-80 text-xs" href="#">Support</NavigationMenuLink>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger className="text-xs">Resources</NavigationMenuTrigger>
                                            <NavigationMenuContent className="bg-popover text-popover-foreground">
                                                <NavigationMenuLink className="w-80 text-xs" href="/about">About Us</NavigationMenuLink>
                                                <NavigationMenuLink className="w-80 text-xs" href="#">Contact Us</NavigationMenuLink>
                                                <NavigationMenuLink className="w-80 text-xs" href="#">Status</NavigationMenuLink>
                                                <NavigationMenuLink className="w-80 text-xs" href="#">Terms of Service</NavigationMenuLink>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink href="#">Blog</NavigationMenuLink>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </div>
                        <div className={`flex gap-2 px-4 py-2.5 backdrop-blur-[10px] bg-background/85 rounded-sm ${isFixed&&"border border-white/15 "} `}>
                            <Button asChild variant="outline"  size="sm">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href="/register">Sign up</Link>
                            </Button>
                            <ModeToggle />
                        </div>
                    </nav>

                    {/* Mobile Menu */}
                    <div className="block lg:hidden">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2">
                                {/* <img src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg" className="max-h-8" alt="logo" /> */}
                                <FlameIcon className="size-4" />
                            </Link>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Menu className="size-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <Link href="https://www.shadcnblocks.com" className="flex items-center gap-2">
                                                <img src="https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg" className="max-h-8" alt="logo" />
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-6 p-4">
                                        <Button asChild variant="outline">
                                            <Link href="/login">Login</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href="/register">Sign up</Link>
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;