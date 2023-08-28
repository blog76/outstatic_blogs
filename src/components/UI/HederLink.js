import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { name: "Home", path: "/" },
  {
    name: "AI Tools",
    path: "/category/ai-tool",
    dropdown: true,
    subMenu: [
      { name: "AI Avtar Generator", path: "/category/avatar-generators" },
      { name: "AI Chatbot", path: "/category/chatbots" },
      { name: "AI Logo Maker", path: "/category/logo-makers" },
      { name: "AI Transcriber", path: "/category/transcribers" },
      { name: "AI Video Generator", path: "/category/video-generators" },
      { name: "AI Voice", path: "/category/aivoices" },
      { name: "AI Writer", path: "/category/writers" },
      { name: "Text Generator", path: "/category/text-generators" },
      { name: "AI Tools", path: "/category/ai-tool" },
    ],
  },
];
export function HeaderLinks() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-0 md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
          {links.map((item, index) => {
            return (
              <li key={index}>
                {item.subMenu && item.subMenu.length ? (
                  <div
                    className="relative inline-block text-left"
                    ref={dropdownRef}
                  >
                    <span
                      onClick={toggleDropdown}
                      className={`flex items-center ps-5 py-5 leading-normal hover:text-[#2872fa] text-[15px] font-medium cursor-pointer`}
                    >
                      {item.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M6 9l6 6l6 -6"></path>
                      </svg>
                    </span>
                    {isOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 drop-shadow-lg">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          {item.subMenu.map((menu, ind) => {
                            return (
                              <a
                                key={ind}
                                href={menu.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                                onClick={() => localStorage.removeItem("n")}
                              >
                                {menu.name}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`px-5 py-5 leading-normal hover:text-[#2872fa] text-[15px] font-medium`}
                    aria-current="page"
                    onClick={() => localStorage.removeItem("n")}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export function HeaderLinksDrawer(props) {
  const { redirect } = props;
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <nav className="p-4">
        <div className="w-full">
          {links.map((item, index) => (
            <>
              {item.subMenu && item.subMenu.length ? (
                <div key={index} className={` ${index > 0 ? "mt-2" : ""}`}>
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center px-4 py-2 text-left focus:outline-none inline-flex items-center p-2 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600"
                  >
                    <span className="space-y-2 font-medium text-white text-base">
                      {item.name}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        activeIndex === index ? "transform rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>
                  {activeIndex === index && (
                    <div className="py-2 px-4">
                      {item.subMenu.map((menu, ind) => (
                        <p
                          className="flex text-white items-center p-2  rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
                          key={ind}
                          onClick={() => redirect(menu.path)}
                        >
                          {menu.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <ul className="space-y-2 font-medium">
                  <li>
                    <span
                      onClick={() => redirect(item.path)}
                      className="flex text-white items-center p-2  rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
                    >
                      <span className="ml-3">{item.name}</span>
                    </span>
                  </li>
                </ul>
              )}
            </>
          ))}
        </div>
      </nav>
    </>
  );
}
