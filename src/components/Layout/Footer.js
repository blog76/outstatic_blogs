import React from "react";
import { FooterLinks } from "../UI/FooterLink";

const Footer = () => {
  return (
    <footer className="bg-white p-5">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-evenly mx-auto p-5">
        <FooterLinks />
        <div className="">
          <div className=" m-auto max-w-5xl text-center font-normal mt-5">
            © Smart AI Solutions 2023 - All rights reserved. Disclaimer: We are
            not affiliated with or endorsed by AI Editing software. Our website
            provides information and tutorials about the AI tool based on our
            own experiences and research.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
