import {
  SlSocialFacebook,
  SlSocialYoutube,
  SlSocialLinkedin,
} from "react-icons/sl";
import { TfiTwitter } from "react-icons/tfi";
import "../../assets/homelanding.css";
import "./footer.css";

function Footer() {
  return (
    <footer className="custom-footer">
      <div className=" mx-auto px-4 py-6 ">
        <section className="container mx-auto py-8 mt-10 overflow-hidden">
          <div className="flex flex-wrap gap-x-2 loop justify-center">
            <div className="w-1/4 sm:w-1/6 lg:w-1/12 px-2 mb-4">
              <li className="list-none">
                <a href="#" className="iconfooter social-icon">
                  <SlSocialLinkedin className="text-xl" />
                </a>
              </li>
            </div>
            <div className="w-1/4 sm:w-1/6 lg:w-1/12 px-2 mb-4">
              <li className="list-none">
                <a href="#" className="iconfooter social-icon">
                  <TfiTwitter className="text-xl" />
                </a>
              </li>
            </div>
            <div className="w-1/4 sm:w-1/6 lg:w-1/12 px-2 mb-4">
              <li className="list-none">
                <a href="#" className="iconfooter social-icon">
                  <SlSocialYoutube className="text-xl" />
                </a>
              </li>
            </div>
            <div className="w-1/4 sm:w-1/6 lg:w-1/12 px-2 mb-4">
              <li className="list-none">
                <a href="#" className="iconfooter social-icon">
                  <SlSocialFacebook className="text-xl" />
                </a>
              </li>
            </div>
          </div>
        </section>
      </div>
      <div className="new_footer_top">
        <div className="footer_bg">
          <div className="footer_bg_one" />
          <div className="footer_bg_two" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
