import Link from "next/link";
import { useRouter } from "next/router";
const MENU = [
  { name: "About us", path: "/info/about-us" },
  { name: "Terms", path: "/info/terms-and-conditions" },
  { name: "Privacy Policy", path: "/info/privacy-policy" },
  { name: "Contact Us", path: "/info/contact-us" },
  { name: "Disclaimer", path: "/info/disclaimer" },
];
export function FooterLinks() {
  const router = useRouter();
  return MENU.map((label, ind) => (
    <Link
      key={ind}
      href={label.path}
      className="px-3 font-bold text-[#214b7d] hover:text-[#2872fa] uppercase"
    >
      <span>{label.name}</span>
    </Link>
  ));
}
