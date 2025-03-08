"use client";

import Navigation from "../../ui/navigation";
import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Menu, GitBranch, Sun, Moon } from "lucide-react";
import LaunchUI from "../../logos/launch-ui";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { PATH_AUTH } from "@/routes/paths";

export default function Navbar() {
  const { data: session } = useSession();

  const user = session && session.user;

  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <a href="/" className="flex items-center gap-2 text-xl font-bold">
              <LaunchUI />
              Quizzy
            </a>
            <Navigation user={user} />
          </NavbarLeft>
          <NavbarRight>
            <Button variant="ghost" asChild>
              <Link
                href="https://github.com/rashidmya/quizzy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitBranch className="h-5 w-5" />
                <span className="sr-only">View on GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost">
              {"dark" === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle dark/light mode</span>
            </Button>
            <Sheet>
              <SheetTitle hidden>Quizzy App</SheetTitle>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>Quizzy</span>
                  </a>
                  {user ? (
                    <Link
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        signOut({ redirect: true, callbackUrl: "/" });
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Sign Out
                    </Link>
                  ) : (
                    <Link
                      href={PATH_AUTH.login}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Sign In
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
