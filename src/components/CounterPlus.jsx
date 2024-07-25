// import { ReactNode } from "react";

// eslint-disable-next-line react/prop-types
export default function CounterPlus({ title, children }) {
  return (
    <>
      <div className="flex gap-[.8rem] items-center justify-center md:justify-normal lg:p-[1rem]">
        {children[0]}
        <div>
          {children[1]}
          <p className=" text-[1rem] text-white ">{title}</p>
        </div>
      </div>
    </>
  );
}
