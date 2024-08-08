

function Heading({ h2, p }) {
  return (
    <div className="main-heading mt-20 ">
      <h2 className="text-center relative text-4xl font-normal  uppercase ">
        {h2}
      </h2>
      <p className=" text-center  mb-24 leading-loose relative ">
        {p}
      </p>
    </div>
  );
}

export default Heading
