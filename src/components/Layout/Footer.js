import React from "react";
import { FooterLinks } from "../UI/FooterLink";

const Footer = () => {
  return (
    <footer className="mt-auto bg-[#f2f5f7]">
      <div className="">
        <div className="font-mono m-auto max-w-5xl text-white py-[3rem] pl-20 md:px-[10rem] ">
          <FooterLinks />
        </div>
      </div>
      <div className="">
        <div className=" m-auto max-w-5xl text-center font-normal px-[2rem] md:px-[8rem] py-[1rem] ">
          © Smart AI Solutions 2023 - All rights reserved. Disclaimer: We are
          not affiliated with or endorsed by AI Editing software. Our website
          provides information and tutorials about the AI tool based on our own
          experiences and research.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
