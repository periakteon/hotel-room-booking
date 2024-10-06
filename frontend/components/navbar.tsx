"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HotelIcon, MenuIcon } from "lucide-react";
import { useAuth } from "@/providers/auth";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User as IUser } from "@/hooks/useUser";
import API from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Separator } from "./ui/separator";

export default function Navbar() {
  const { user: userData, loading, isAuthenticated } = useAuth();

  return (
    <header className="flex h-14 w-full shrink-0 items-center px-4 md:px-6 border-b-2 border-gray-100 dark:border-gray-800">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="/" className="mr-6 hidden lg:flex">
            <HotelIcon className="h-6 w-6" />
            <span className="sr-only">Elegant Trading</span>
          </Link>
          <div className="grid gap-2 py-6">
            {loading && <Skeleton className="h-9 w-20" />}
            {!loading && !isAuthenticated && (
              <Link href="/login" className="h-9 w-20">
                <Button>Log in</Button>
              </Link>
            )}
            {!loading && isAuthenticated && userData && (
              <UserNav user={userData} />
            )}
            <Separator />
            <Link
              href="/"
              className="flex w-full items-center py-2 text-lg font-semibold"
            >
              Home
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 hidden lg:flex">
        <HotelIcon className="h-6 w-6" />
        <span className="sr-only">Elegant Trading</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          href="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        >
          Home
        </Link>
        {loading && <Skeleton className="h-9 w-20" />}
        {!loading && !isAuthenticated && (
          <Link href="/login" className="h-9 w-20">
            <Button>Log in</Button>
          </Link>
        )}
        {!loading && isAuthenticated && userData && <UserNav user={userData} />}
      </nav>
    </header>
  );
}

function UserNav({ user }: { user: IUser }) {
  const queryClient = useQueryClient();

  async function handleLogout() {
    await API.delete("/user/session");

    queryClient.setQueryData(["user"], null);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {`${user.firstName[0]}${user.lastName[0]}`}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-semibold leading-none">
              {`${user.firstName} ${user.lastName}`}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
