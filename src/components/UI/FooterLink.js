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
    <Link key={label} href={href} className={` px-3 font-bold text-[#214b7d] hover:text-[#2872fa] uppercase`}>
      <span className={` ${router.pathname === href ? "activeLinkRoute" : ""} `}>
        {label}
      </span>
    </Link>
  ));
}
