import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Store/Auth";
import { toast } from "react-toastify";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLocal } = useAuth();

  // now handling the input

  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  //  handling the form submit !

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  alert(user);
    console.log(user);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("response from the server", res_data.extraDetails);

      if (response.ok) {
        // store the data in local host

        storeTokenInLocal(res_data.token);

        // localStorage.setItem("token", res_data.token);

        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });

        navigate("/");
        toast.success("Registration Successful !");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <div className="registerPageContainer">
      <div className="leftPart">
        <img src="Images/a.png" alt="leftImage" className="imageLeftPart" />
      </div>
      <div className="rightPart">
        <h1 className="registerHeading text-2xl font-bold text-blue-500 capitalize mb-5">you must register to join</h1>
        <div className='w-[90%] h-[100%] flex flex-col gap-2'>
          <form onSubmit={handleSubmit} className="formContainer">
            <p className="formLabels">Username</p>
            <input
              type="text"
              name="username"
              required
              autoComplete="off"
              placeholder="username"
              value={user.username}
              onChange={handleInput}
              id="username"
              className="inputField"
            />
            <p className="formLabels">Email</p>
            <input
              type="email"
              name="email"
              id="email"
              required
              autoComplete="off"
              placeholder="abc@gmail.com"
              value={user.email}
              onChange={handleInput}
              className="inputField"
            />
            <p className="formLabels">Phone</p>
            <input
              type="number"
              name="phone"
              required
              autoComplete="off"
              value={user.phone}
              onChange={handleInput}
              placeholder="phone no"
              id="phone"
              className="inputField"
            />
            <p className="formLabels"> Password</p>
            <div className="inputPasswordBox">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={user.password}
                onChange={handleInput}
                required
                autoComplete="off"
                placeholder="********"
                className="inputField"
              />
              
            </div>
            <div>
              <input
                type="submit"
                value="Register"
                className="registerButton  text-xl"
              />
            </div>
            <div className="w-[100%] h-[80px] flex justify-between">
              <div>Have An Account ?</div>
              <div><NavLink to="/login" className="text-xl font-semibold">Sign In</NavLink></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
