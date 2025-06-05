// components/Navbar.tsx
'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function AppNavbar() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit text-xl">
          Dog Viewer
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Raças
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/login" color="primary">Login</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}