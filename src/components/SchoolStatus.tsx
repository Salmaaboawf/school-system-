import React from "react";
import bgImg from "../assets/images/slide_min_2.jpg";
type SchoolStatusProp = {
  children: React.ReactElement;
};

const SchoolStatus = ({ children }: SchoolStatusProp) => {
  return (
    <section
      className="px-10 bg-no-repeat bg-cover bg-fixed"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="container flex flex-wrap gap-y-4 justify-between mx-auto py-16 px-4">
        {children}
      </div>
    </section>
  );
};

export default SchoolStatus;
