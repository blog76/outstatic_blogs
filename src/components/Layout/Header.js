import React, { useState } from "react";
import { HeaderLinks, HeaderLinksDrawer } from "../UI/HederLink";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const redirect = (path) => {
    router.push(path);
    toggleDrawer();
  };

  return (
    <nav class="bg-white p-2 text-[#192a3d]">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
        <span className="w-auto font-bold text-[25px] leading-normal items-center mr-auto lg:flex hover:text-[#2872fa]">
          <Link
            href="/"
            className="leading-normal"
            style={{ paddingLeft: "16px" }}
          >
            Smart AI Solutions
          </Link>
        </span>

        <button
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600"
          onClick={toggleDrawer}
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`z-50 fixed top-0 right-0 h-screen w-64 bg-gray-900 text-white transform transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button className="p-4 text-dark" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
          <HeaderLinksDrawer redirect={redirect} />
        </div>
        <HeaderLinks />
      </div>
    </nav>
  );
}
