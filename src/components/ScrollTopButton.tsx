import React, { useState, useEffect, CSSProperties } from "react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (window.scrollY > 25) {
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
        <button onClick={scrollToTop} style={buttonStyle}>
          ↑
        </button>
      )}
    </div>
  );
};

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
  transition: "opacity 0.3s",
  zIndex: "1000",
};

export default ScrollToTopButton;
