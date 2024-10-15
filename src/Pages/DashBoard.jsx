import { useAuth } from "../Store/Auth";

const DashBoard = () => {
    const { complains = [] } = useAuth();

  console.log("This is the complain list in dashboard : ", complains);

  return (
    <div className="w-[90%] min-h-[150px] h-auto flex flex-col gap-2 justify-center items-center m-auto ">
      <h1 className="text-4xl text-blue-600 capitalize mb-4">Hey Sir !</h1>
      <h2 className="text-3xl text-pink-500 mb-5 capitalize">
        These are the list of new Complain Lists -----
      </h2>
      <div className="w-[80%] min-h-[250px] h-auto flex flex-row flex-wrap justify-center items-center gap-10  m-auto">
        {complains?.length > 0 ? (
          complains.map((ele, index) => {
            return (
              <div
                className="w-[250px] h-[200px] flex flex-col border-inherit bg-emerald-200"
                key={index}
              >
                <h3 className=" text-violet-500 mb-2">Name: {ele.username}</h3>
                <h3 className="text-orange-400 mb-3">Email : {ele.email}</h3>
                <h3 className="text-blue-700 mb-3">
                  Complain : {ele.complain}
                </h3>
                <div>
                  <button className="bg-green-500 w-[120px] h-[40px] mt-5 text-white">
                    Reply
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No complains found!</p>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
