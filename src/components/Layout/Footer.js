import React from "react";
import { FooterLinks } from "../UI/FooterLink";

const Footer = () => {
  return (
    <footer
      className="bg-[#f2f5f7]"
    >
      <div>  
        <div className="font-mono m-auto max-w-5xl text-white py-[3rem] flex justify-center">
          <div className="lg:flex md:flex sm:flex-wrap lg:justify-center md:justify-center ">
            <FooterLinks />
          </div>
        </div>
      <div>
        <div>
            <div className=" m-auto max-w-5xl text-center font-normal px-[2rem] md:px-[8rem] py-[1rem]">
              <p>
                © Smart AI Solutions 2023 - All rights reserved. Disclaimer: We
                are not affiliated with or endorsed by AI Editing software. Our
                website provides information and tutorials about the AI tool
                based on our own experiences and research.
              </p>
            </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
