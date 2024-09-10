import {
  SlSocialFacebook,
  SlSocialYoutube,
  SlSocialLinkedin,
} from "react-icons/sl";
import { TfiTwitter } from "react-icons/tfi";

import { CiHeart } from "react-icons/ci";
import "./footer.css";
import Pagefooter from "../Pagefooter";

function Footer() {
  return (
    <footer className="custom-footer">
    <div className=" mx-auto px-4 py-6">
        <div className="flex flex-row-reverse justify-center gap-x-10 items-center">
            <ul className="social-links flex space-x-4 justify-end">
                <li>
                    <a href="#" className="iconfooter social-icon">
                        <SlSocialFacebook className="text-xl" />
                    </a>
                </li>
                <li>
                    <a href="#" className="iconfooter social-icon">
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

   <Pagefooter/>
        </div>
    </div>
    <div className="new_footer_top">

        <div className="footer_bg">
            <div className="footer_bg_one" />
            <div className="footer_bg_two" />
        </div>
    </div>
    {/* <div className="footer_bottom"> */}
        {/* <div className="container">
            <div className="row align-items-center"> */}
                {/* <div className="col-lg-6 col-sm-7">
                 
                </div> */}
                {/* <div className="col-lg-6 col-sm-5 text-right">
                    <p>
                        Made with{' '}
                        <i className="icon_heart" />
                        {' '}in{' '}
                        <a
                            href="http://cakecounter.com"
                            target="_blank"
                        >
                            School Name
                          
                        </a>
                    </p>
                </div> */}
            {/* </div>
        </div> */}
    {/* </div> */}
</footer>

  );
}

export default Footer;
