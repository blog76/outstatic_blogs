import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow.document;
      const iframeContentHeight = iframeDocument.body.scrollHeight;
      iframeRef.current.style.height = `${iframeContentHeight}px`;
    }
  }, []);
  useEffect(() => {
    const handleMessage = (event) => {
      const { type, path } = event.data;
      if (type === "changePath") {
        router.push(path);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("message", handleMessage);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    router.push(`/?s=${search}`);
  };

  return (
    <aside className="lg:w-[450px]  md:relative md:right-0">
      <div className="md:max-w-[450px]">
        <div className="md:max-w-[350px] md:px-7 text-xl shadow-gray-500 shadow-md py-8 px-16 mx-auto my-8">
          Search
          <div className="flex gap-3">
            <input
              type="text"
              value={search}
              onChange={handleChangeSearch}
              className="border border-black w-[8rem] mr"
            />
            <button
              onClick={handleSearch}
              className="bg-black text-md text-white py-1 px-3 rounded"
            >
              Search
            </button>
          </div>
        </div>

        <div className="md:max-w-[350px] shadow-gray-500 shadow-md py-8 px-5 mx-auto my-8">
          {/* <iframe
            src="/info/sidebar-menu" // Replace with the actual path to the component or page you want to render
            width="100%" // Set the desired width of the sidebar
            height="100%"
            // scrolling="no"
            style={{ border: "0px", overflow: "hidden", height: "100vh" }}
          /> */}
          <iframe
            ref={iframeRef}
            src="/info/sidebar-menu"
            width="100%"
            // height="100%" (remove this line)
            scrolling="no"
            style={{
              border: "0px",
              overflow: "hidden",
              width: "100%",
              minHeight: "100vh",
            }} // Adjust width and minHeight
          />
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-lg font-bold px-2 py-1 shadow-lg rounded-xl mt-3">
            Select Your Category
          </div>
          <div>
            <ul id="category" className="bg-white text-[#1b78e2] w-60">
              {category.map(([label, href], i) => (
                <Link href={href} key={i}>
                  <li
                    key={label}
                    className={`hover:text-gray-900 text-base font-semibold ml-2 border-gray-900 p-2 border-b`}
                  >
                    <span>{label}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
