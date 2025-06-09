import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon, Menu } from 'lucide-react';

export function CustomNavbar() {
  return (
    <div className="mx-auto sm:px-0 md:px-6 lg:px-8 max-w-7xl">
      <header className="md:mt-7 md:bg-slate-50 flex items-center justify-between gap-8 rounded-full lg:border border-border px-2.5 py-5 md:py-1.5 backdrop-blur-lg md:top-6 mx-auto w-full max-w-7xl">
        {/* Logo and Main Navigation */}
        <div className="flex items-center gap-3">
          <div className="ml-3 flex items-center gap-3 mr-10">
            <Link href="https://deploystack.io" className="hover:text-black flex items-center gap-2">
              <span className="sr-only">DeployStack</span>
              <Image
                src="/logo-deploystack.svg"
                alt="DeployStack Logo"
                width={22}
                height={24}
                className="inline w-[22px] h-[24px] -mt-1"
              />
              <span className="ml-2 text-[18px] font-semibold">DeployStack</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="mx-auto hidden items-center justify-center border border-transparent lg:flex md:gap-1">
            <nav className="relative flex max-w-max flex-1 items-center justify-center">
              <ul className="menu flex gap-6" data-orientation="horizontal">
                <li>
                  <Link href="https://deploystack.io/mcp" className="hover:text-primary transition-colors">
                    Browse MCP Server
                  </Link>
                </li>
                <li>
                  <Link href="https://deploystack.io/c" className="hover:text-primary transition-colors">
                    Browse Docker
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/docs" 
                    className="text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="https://deploystack.io/roadmap" className="hover:text-primary transition-colors">
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link href="https://deploystack.io/changelog" className="hover:text-primary transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center justify-end gap-3">
          {/* Mobile Menu Button */}
          <div className="flex lg:hidden mr-5">
            <button 
              type="button" 
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* GitHub Link */}
          <Link
            href="https://github.com/deploystackio/deploystack"
            target="_blank"
            className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-full hidden md:inline-flex"
          >
            <GithubIcon className="w-4 h-4 me-1" />
            GitHub
          </Link>

          {/* Login Button */}
          <Link
            href="https://cloud.deploystack.io/login"
            className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-gray-800 h-9 px-4 py-2 rounded-full hidden md:inline-flex"
          >
            Login
          </Link>
        </div>
      </header>
    </div>
  );
}
