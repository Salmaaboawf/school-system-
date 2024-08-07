import {
  SlSocialFacebook,
  SlSocialYoutube,
  SlSocialLinkedin,
} from "react-icons/sl";
import { TfiTwitter } from "react-icons/tfi";

import { CiHeart } from "react-icons/ci";
import "./footer.css";

function Footer() {
  return (
    <footer className="custom-footer  ">
      <div className=" mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <ul className="social-links flex flex-wrap justify-center  mb-6 space-x-4">
            <li>
              <a href="#" className="iconfooter social-icon">
                <SlSocialFacebook className="text-xl" />
              </a>
            </li>
            <li>
              <a href="#" className=" iconfooter social-icon">
                <SlSocialYoutube className="text-xl" />
              </a>
            </li>
            <li>
              <a href="#" className="iconfooter social-icon">
                <TfiTwitter className="text-xl" />
              </a>
            </li>
            <li>
              <a href="#" className="iconfooter social-icon">
                <SlSocialLinkedin className="text-xl" />
              </a>
            </li>
          </ul>
          <div className=" footer-text-container">
            <span className="footer-text">
              © 2022 Enfant Primary School crafted with
              <CiHeart className="text-[#ff4e31] mx-1" /> in Bucharest
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
