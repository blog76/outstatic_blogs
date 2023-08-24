import Link from "next/link";
import { useRouter } from "next/router";
export function FooterLinks() {
  const router = useRouter();
  return [
    ["About us", "/info/about-us"],
    ["Terms", "/info/terms-and-conditions"],
    ["Privacy Policy", "/info/privacy-policy"],
    ["Contact Us", "/info/contact-us"],
    ["Disclaimer", "/info/disclaimer"],
  ].map(([label, href]) => (
    <Link key={label} href={href} className={`flex border-gray-700 font-bold text-[16px] uppercase text-[#214b7d] hover:text-[#2872fa]`}>
      <span className={` ${router.pathname === href ? "activeLinkRoute" : ""}`}>
        {label}
      </span>
    </Link>
  ));
}
