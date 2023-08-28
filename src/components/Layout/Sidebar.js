import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FeaturedBlog from "../UI/FeaturedBlog";

const category = [
  ["AI Avtar Generator", "/category/avatar-generators"],
  ["AI Chatbot", "/category/chatbots"],
  ["AI Logo Maker", "/category/logo-makers"],
  ["AI Transcriber", "/category/transcribers"],
  ["AI Video Generator", "/category/video-generators"],
  ["AI Voice", "/category/aivoices"],
  ["AI Writer", "/category/writers"],
  ["Text Generator", "/category/text-generators"],
];

const Sidebar = ({ changePager }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/?s=${search}`);
  };

  return (
    <div className="sm:grid grid-cols-12 gap-8 mt-0 rounded-xl w-full">
      <div className="col-span-12 mb-5 sm:mb-0">
        <div className=" md:px-6 text-xl bg-white rounded-md py-5 px-5 mb-0">
          <form
            role="search"
            className=" relative flex justify-between p-2.5 rounded-md border border-gray-300"
          >
            <input
              placeholder="Seach"
              type="text"
              value={search}
              onChange={handleChangeSearch}
              className="w-[8rem] font-normal focus:outline-none focus:border-gray-500 text-gray-500 min-w-[60%] relative"
            />

            <button
              type="submit"
              aria-label="Search button"
              onClick={handleSearch}
            >
              <svg
                aria-hidden="true"
                width="15"
                height="15"
                fill="#3A4F66"
                viewBox="0 0 15 15"
              >
                <path d="M14.8,13.7L12,11c0.9-1.2,1.5-2.6,1.5-4.2c0-3.7-3-6.8-6.8-6.8S0,3,0,6.8s3,6.8,6.8,6.8c1.6,0,3.1-0.6,4.2-1.5l2.8,2.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2C15.1,14.5,15.1,14,14.8,13.7z M1.5,6.8c0-2.9,2.4-5.2,5.2-5.2S12,3.9,12,6.8S9.6,12,6.8,12S1.5,9.6,1.5,6.8z"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div className="col-span-12 mb-5 sm:mb-0">
        <FeaturedBlog />
      </div>
      <div className="col-span-12 mb-5 sm:mb-0">

        <div className=" md:px-6 text-xl bg-white rounded-md py-2.5 px-2 my-8">
          <div className=" text-[#192a3d] text-lg font-bold px-2 py-1 mb-3">
            Select Your Category
          </div>
          <div>
            <ul id="category" className="bg-white text-[#3A4F66] w-60 ">
              {category.map(([label, href], i) => (
                <Link href={href} key={i} onClick={changePager}>
                  <li
                    key={label}
                    className={`text-base font-normal ml-2 hover:text-[#2872fa]`}
                  >
                    <span>{label}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
