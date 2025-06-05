import { Lexend } from "next/font/google";
import "./glo.css"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Section1 from "./introSection/section1";
import Section2 from "./introSection/section2";
import Section3 from "./introSection/section3";
import Section4 from "./introSection/section4";
import Section5 from "./introSection/section5";
import Section6 from "./introSection/section6";
import Section7 from "./introSection/section7";
import Section8 from "./introSection/section8";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  // fallback: ['ui-sans-serif', 'system-ui', 'sans-serif' ]
});

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];
const stats = [
  { id: 1, name: "Transactions every 24 hours", value: "500k+" },
  { id: 2, name: "Assets under holding", value: "200k+" },
  { id: 3, name: "New users annually", value: "50+" },
];


export default function IntroLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-black min-h-screen w-full flex flex-col justify-center">
      <header className="sticky inset-x-0 top-0 z-50 border-b border-solid border-[hsl(var(--border-color))] flex justify-center w-full bg-[hsl(var(--background)/.6)] backdrop-blur-md">
        <nav
          aria-label="Global"
          className="flex flex-row items-center justify-between p-4 lg:px-8 max-w-7xl w-full"
        >
          <div className="flex lg:flex-1">
            <a
              href="#"
              className="-m-1.5 p-1.5 flex items-center gap-x-2 text-gray-900 dark:text-white"
            >
              <span className="sr-only">Your Company</span>
              <img alt="" src="/tweatflash.svg" className="h-8 w-8" />
              tweatflash
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="!size-6 dark:stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                ></path>
              </svg>
              {/* <Bars3Icon aria-hidden="true" className="size-6" /> */}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 text-gray-900 dark:text-gray-400"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/sign-in"
              className="text-sm/6 text-gray-900 dark:text-white"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="!size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"></path></svg> */}
      </header>

      <div className="relative flex flex-col h-auto px-4 max-w-[450px] md:max-w-[750px] md:px-16 lg:max-w-[1300px]  w-full mx-auto lg:gap-y-[200px] md:gap-y-[150px] gap-y-[80px]">
          <Section1/>
          <Section2/>
          <Section3/>
          <Section4/>
          <Section5/>
          <Section6/>
          <Section7/>
          <div></div>
      </div>
      <Section8/>
    </div>
  );
}
