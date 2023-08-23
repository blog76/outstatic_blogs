import React from "react";
import { FooterLinks } from "../UI/FooterLink";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="bg-zinc-800">
        <div className="font-mono m-auto max-w-5xl text-white py-[3rem] pl-20 md:px-[10rem] w-[60%]">
          <FooterLinks />
        </div>
      </div>
      <div className="bg-cyan-400">
        <div className=" m-auto max-w-5xl text-center font-normal px-[2rem] md:px-[8rem] py-[1rem] text-white">
          © 2023 AI Tools. Disclaimer: We are not affiliated with or endorsed by
          AI Editing software. Our website provides information and tutorials
          about the AI tool based on our own experiences and research.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
