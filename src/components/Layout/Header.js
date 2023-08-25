import React, { useState } from "react";
import { HeaderLinks } from "../UI/HederLink";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  return (
    <>
      <div className="flex bg-white text-[#192a3d] flex-col">
        {/* Centering container */}
        <div className="xl:w-[134vh] lg:mx-auto md:w-full">
          <div className=" flex items-center justify-between p-5">
            <div className="lg:hidden order-2">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="relative flex justify-between items-center p-2 text-white focus:outline-none focus:ring-inset"
              >
                <span className="mr-10">
                  {/* Icon for open menu */}
                  <svg
                    className={`block h-6 w-6 ${
                      isMobileMenuOpen ? "hidden" : "-mr-44"
                    } text-[#3A4F66]`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  {/* Icon for close menu */}
                  <svg
                    className={`block h-6 w-6 ${
                      isMobileMenuOpen ? "-mr-44" : "hidden"
                    } text-black`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
                {/* <span className="text-[20px] text-black">Menu</span> */}
              </button>
            </div>
            {/* logo */}
            <div className="w-auto font-bold text-[25px] leading-normal items-center mr-auto lg:flex hover:text-[#2872fa]">
              <Link href="/" className="leading-normal">
                Smart AI Solutions
              </Link>
            </div>
            {/* items */}
            <div className="items-center sm:ml-6 lg:flex p-4 lg:flex-wrap md:m-0 hidden">
              <HeaderLinks  />
            </div>
          </div>
          {/* search Icon */}
          {/* <div
            className="p-4 hover:bg-gray-900 ml-auto lg:mr-16 w-14 "
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <span>
              <button>
                <span className="fill-white">
                  <svg
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M208 48c-88.366 0-160 71.634-160 160s71.634 160 160 160 160-71.634 160-160S296.366 48 208 48zM0 208C0 93.125 93.125 0 208 0s208 93.125 208 208c0 48.741-16.765 93.566-44.843 129.024l133.826 134.018c9.366 9.379 9.355 24.575-.025 33.941-9.379 9.366-24.575 9.355-33.941-.025L337.238 370.987C301.747 399.167 256.839 416 208 416 93.125 416 0 322.875 0 208z"
                    ></path>
                  </svg>
                </span>
              </button>
            </span>
          </div> */}
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 bg-white border border-gray-500 text-[#192a3d]">
            <div className="gap-5 text-lg font-medium space-y-5 h-[100%] pb-5">
              <HeaderLinks setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen}/>
            </div>
          </div>
        </div>
      )}
      {openModal && (
        <>
          <div
            className="bg-black bg-opacity-20 items-start pt-10 fixed top-0 left-0 bottom-0 right-0 flex justify-center backdrop-blur-sm z-10 "
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <div className="scale-100 mt-64 w-1/4">
              <form role="search" className="bg-white w-auto text-black">
                <div className="flex">
                  <input
                    type="search"
                    className="w-full h-14 px-3 py-5"
                    placeholder="Search …"
                    value=""
                    name="s"
                  />
                  <button aria-label="Search">
                    <span className="px-10 py-5">
                      <svg
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M208 48c-88.366 0-160 71.634-160 160s71.634 160 160 160 160-71.634 160-160S296.366 48 208 48zM0 208C0 93.125 93.125 0 208 0s208 93.125 208 208c0 48.741-16.765 93.566-44.843 129.024l133.826 134.018c9.366 9.379 9.355 24.575-.025 33.941-9.379 9.366-24.575 9.355-33.941-.025L337.238 370.987C301.747 399.167 256.839 416 208 416 93.125 416 0 322.875 0 208z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
