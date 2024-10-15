import { useState } from "react";
import { useAuth } from "../Store/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Complain = () => {
  const [complain, setComplain] = useState({
    username: "",
    email: "",
    complain: "",
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setComplain({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this is the data to be send while submitting :", complain);

    try {
      const response = await fetch(`http://localhost:5000/api/register/complain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complain),
      });

      const res_data = await response.json();
      console.log("response from the server", res_data.extraDetails);

      if (response.ok) {
        setComplain({
          username: "",
          email: "",
          complain: "",
        });

        navigate("/");
        toast.success("Complain registered successfully !");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log(
        "This is the complain error from the fronten section : ",
        error
      );
    }
  };

  console.log("this is the user data : ", user);

  return (
    <div className="w-[90%] min-h-[200px] h-auto  flex flex-row flex-wrap gap-5 m-auto justify-center items-center ">
      <div className="leftPart">
        <img src="Images/aboutMe.jpg" alt="image" />
      </div>
      <div className="rightPart flex flex-col justify-center items-center">
        <h1 className="text-orange-600 text-3xl capitalize text-center mb-3">
          Want to register complain here ?
        </h1>
        <h2 className="text-center text-2xl capitalize text-blue-600 mb-3">
          We take immediate action to the registered complains
        </h2>
        <h3 className="text-center text-xl capitalize text-violet-700 mb-3">
          Follow these 3 simple steps ---
        </h3>

        <form
          className="w-[80%] min-h-[140px] h-auto  flex flex-col m-auto justify-center items-center gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            onChange={handleChange}
            readOnly
            className="mt-2 w-[100%] h-[100%] p-5 inputField"
            value={user.username}
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            readOnly
            className="mt-2 w-[100%] h-[100%] p-5 inputField"
          />
          <textarea
            name="complain"
            placeholder="Write Your Complain Here ...."
            className="mt-2 w-[100%] min-h-[100px] h-auto p-5 inputField"
            onChange={handleChange}
            rows={10}
            cols={10}
            required
          ></textarea>
          <div className="w-[100%] h-[60px] flex justify-center items-center ">
            <input
              type="submit"
              value="Submit"
              className="registerButton cursor-pointer "
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Complain;
