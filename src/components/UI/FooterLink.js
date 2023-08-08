import Link from "next/link";
import { useRouter } from "next/router";
export function FooterLinks() {
  const router = useRouter();
  return [
    ["About us", "/info/about-us"],
    ["Terms", "/info/terms-and-conditions"],
    ["Privacy Policy", "/info/privacy-policy"],
    ["Contact Us", "/info/contact-us"],
  ].map(([label, href]) => (
    <Link key={label} href={href} className={`flex border-b border-gray-700`}>
      <span className={` ${router.pathname === href ? "activeLinkRoute" : ""}`}>
        {label}
      </span>
    </Link>
  ));
}
