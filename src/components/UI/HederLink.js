import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
export function HeaderLinks({ setIsMobileMenuOpen, isMobileMenuOpen }) {
  const router = useRouter();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
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
      ],
    },
    // { name: "Submit Guest Post", path: "/submit-guest-post/" },
  ];

  const DropdownMenu = ({ subMenu,isMobileMenuOpen }) => {debugger
    return (
      <ul
        id="dropdown"
        className="bg-white border border-gray-500 text-[#192a3d] absolute z-10 w-60 mt-4"
      >
        {subMenu.map(({ name, path }, i) => (
          <Link
            href={path}
            key={i}
            onClick={() => {
              setIsSubMenuOpen(false);
              if (isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
              }
            }}
          >
            <li key={name} className={`hover:text-[#2872fa] p-3`}>
              <span
                className={`text-[15px] font-medium ${
                  router.pathname === path ? "activeLinkRoute" : ""
                }`}
              >
                {name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    );
  };
  return (
    <>
      {links.map(({ name, path, subMenu }, i) => (
        <div key={i} className="relative m-0">
          <Link
            href={path}
            className={`px-5 py-5 leading-normal hover:text-[#2872fa] text-[15px] font-medium ${
              router.pathname === path ? "activeLinkRoute" : ""
            }`}
            onClick={() => {
              if (name === "AI Tools") {
                setIsSubMenuOpen(true);
              } else {
                setIsMobileMenuOpen(false);
              }

              if (isMobileMenuOpen) {
                if (name === "AI Tools") {
                  setIsMobileMenuOpen(true);
                  setIsSubMenuOpen(true);
                } else {
                  setIsMobileMenuOpen(false);
                }
              }
            }}
          >
            <span>{name}</span>
          </Link>
          {name === "AI Tools" && (
            <span className=" fill-white pr-10 absolute top-1 left-20">
              <span>
                <svg
                  viewBox="0 0 330 512"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                >
                  <path d="M305.913 197.085c0 2.266-1.133 4.815-2.833 6.514L171.087 335.593c-1.7 1.7-4.249 2.832-6.515 2.832s-4.815-1.133-6.515-2.832L26.064 203.599c-1.7-1.7-2.832-4.248-2.832-6.514s1.132-4.816 2.832-6.515l14.162-14.163c1.7-1.699 3.966-2.832 6.515-2.832 2.266 0 4.815 1.133 6.515 2.832l111.316 111.317 111.316-111.317c1.7-1.699 4.249-2.832 6.515-2.832s4.815 1.133 6.515 2.832l14.162 14.163c1.7 1.7 2.833 4.249 2.833 6.515z"></path>
                </svg>
              </span>
            </span>
          )}
          {subMenu && name === "AI Tools" && isSubMenuOpen && (
            <DropdownMenu subMenu={subMenu}  isMobileMenuOpen={isMobileMenuOpen}/>
          )}
        </div>
      ))}
    </>
  );
}
