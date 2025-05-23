"use client";
import React, { useEffect, useState } from "react"
import {Avatar, AvatarImage,} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,
DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from "next/navigation";
import { useUSer } from "@/hooks";
import { LoginForm } from "./LoginForm";



  
  export function  UserNav ()  {
    const {user, logout} = useUSer();
    const router = useRouter()
    const searchParams = useSearchParams();
  
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
        if (searchParams.get("login") === "true") {
          setOpen(true);
    
          // Clean the URL after opening the menu
          router.replace("/", { scroll: false });
        }
      }, [searchParams, router]);

    return (
<DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
            {!user && <AvatarImage src="/avatar.png" alt="avatar" /> }

            {user && (<p className="font-semibold bg-gray-300 flex h-8 w-8 items-center justify-center" >
                {user.email?.slice(0, 2).toUpperCase()}
                </p>) }
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
 {user &&(
   <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal">
             <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.email}</p>
                <p className="text-xs leading-none text-muted-foreground">
                 {user.name}
                </p>
             </div>
            </DropdownMenuLabel>  

       <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>{
            logout();
          }}>
            Log out
          </DropdownMenuItem>
  </DropdownMenuGroup>
        )}

{!user &&(
    <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold leading-none">Login</p>
            </div>
          </DropdownMenuLabel>
    <LoginForm/>

         <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>{
          router.push("/register");
           }}>
             Register   
          </DropdownMenuItem>

     </DropdownMenuGroup>
        )}
     
     
    </DropdownMenuContent>
</DropdownMenu>
    )
  }

export const Navbar = () => {
    const router = useRouter()
return(
    <div className="border-b bg-white">
          <div className="flex h-16 items-center px-4">
            <h1 className="font-semibold text-lg hover:underline"
            onClick={() =>{
            router.push("/");
        }}>Translator App</h1>

            <div className="ml-auto flex items-center space-x-4">
              <UserNav/>
            </div>
          </div>
        </div>)
}
