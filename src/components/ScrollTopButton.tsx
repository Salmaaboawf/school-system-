import React, { useState, useEffect, CSSProperties } from "react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false); 

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            ...buttonStyle,
            backgroundColor: isHovered
              ? "#0056b3"
              : buttonStyle.backgroundColor, 
          }}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
        >
          ↑
        </button>
      )}
    </div>
  );
};

// Define the buttonStyle with CSSProperties type
const buttonStyle: CSSProperties = {
  position: "fixed" as const, 
  bottom: "20px",
  left: "20px", 
  backgroundColor: "#002749", 
  color: "#fff",
  border: "none",
  width: "60px", 
  height: "60px", 
  borderRadius: "50%",
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  cursor: "pointer",
  fontSize: "30px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  transition: "background-color 0.3s, opacity 0.3s", 
};

export default ScrollToTopButton;
