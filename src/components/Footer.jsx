import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-purple-20 h-20 text-white p-5 m-auto flex justify-center">
      <div className="items-center gap-20 m-auto text-sm ml-5 flex flex-row">
        <div>
          <p> © Gabriel Ing</p>
          <p>gabriel.ing1998@gmail.com</p>
        </div>
        <a target="_blank" href="https://www.linkedin.com/in/gabriel-ing-b94586144/"><FaLinkedin size={30}></FaLinkedin></a>
        <a target="_blank" href="https://github.com/gabriel-ing"><FaGithub size={30}></FaGithub></a>
        
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
