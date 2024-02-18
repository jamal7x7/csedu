"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { DarkLightMode } from "./darkLightMode";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const LoginLogout = () => {
  //   const session = await getServerSession(authOptions)
  return (
    <div>
      {" "}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Se Connecter
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/addnewstudent" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  navigationMenuTriggerStyle() +
                  "bg-primary text-primary-foreground hover:bg-primary/90  hover:text-primary-foreground"
                }
              >
                S &apos;inscrire
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {/* <Button onClick={() => signOut()}></Button> */}
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  navigationMenuTriggerStyle() +
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                }
              >
                Logout
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <DarkLightMode />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default LoginLogout;
