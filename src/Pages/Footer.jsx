const Footer = () => {
  return (
    <>
    <hr className="mt-5 bg-black text-black h-[2px] w-[100%]"/>
      <div className="w-[95%] h-[120px] flex flex-row flex-wrap gap-5 justify-center items-center m-auto">
        <h1 className="text-3xl text-blue-700 font-bold ">
          Developed by{" "}
          <a
            href="http://shivayyy.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hover:text-orange-500">Shivam</span>
          </a>{" "}
          |{" "}
        </h1>
        <h1 className="text-3xl text-zinc-700 font-bold">
          © 2024 All Rights Resersed
        </h1>
      </div>
    </>
  );
};

export default Footer;
