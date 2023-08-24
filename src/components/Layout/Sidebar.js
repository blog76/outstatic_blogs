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
        <div className="md:max-w-[450px] md:px-6 text-xl bg-white rounded-md py-5 px-5 mx-auto my-8  ">
          <form
            role="search"
            method="get"
           className=" relative flex justify-between p-2.5 rounded-md border border-gray-300"
            action="https://bestadvise4u.com/"
            aria-haspopup="listbox"
            data-live-results="thumbs"
          >
            <input
              type="search"
              placeholder="Search"
              value=""
              name="s"
              autocomplete="off"
              title="Search for..."
              aria-label="Search for..."
            />

            <button
              type="submit"
              class="search-submit"
              aria-label="Search button"
            >
              <svg
                class="ct-icon"
                aria-hidden="true"
                width="15"
                height="15"
                fill="#3A4F66"
                viewBox="0 0 15 15"
              >
                <path d="M14.8,13.7L12,11c0.9-1.2,1.5-2.6,1.5-4.2c0-3.7-3-6.8-6.8-6.8S0,3,0,6.8s3,6.8,6.8,6.8c1.6,0,3.1-0.6,4.2-1.5l2.8,2.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2C15.1,14.5,15.1,14,14.8,13.7z M1.5,6.8c0-2.9,2.4-5.2,5.2-5.2S12,3.9,12,6.8S9.6,12,6.8,12S1.5,9.6,1.5,6.8z"></path>
              </svg>
              <span data-loader="circles">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </form>
        </div>

        <div className="md:max-w-[450px] bg-white py-8 px-5 mx-auto my-5">
          {/* <iframe
            src="/info/sidebar-menu" // Replace with the actual path to the component or page you want to render
            width="100%" // Set the desired width of the sidebar
            height="100%"
            // scrolling="no"
            style={{ border: "0px", overflow: "hidden", height: "100vh" }}
          /> */}
          <iframe
          className="invisible "
            ref={iframeRef}
            src="/info/sidebar-menu"
            width="100%"
            // height="100%" (remove this line)
            scrolling="no"
            style={{
              border: "0px",
              overflow: "hidden",
              width: "100%",
              minHeight: "80vh",
            }} // Adjust width and minHeight
          />
        </div>
        <div className="md:max-w-[450px] md:px-6 text-xl bg-white rounded-md py-2.5 px-2 mx-auto my-8">
        <div className=" text-[#192a3d] text-lg font-bold px-2 py-1 mb-3">
            Select Your Category
          </div>
          <div>
            <ul id="category" className="bg-white text-[#3A4F66] w-60 ">
              {category.map(([label, href], i) => (
                <Link href={href} key={i}>
                  <li
                    key={label}
                    className={`text-base font-normal ml-2 `}
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
