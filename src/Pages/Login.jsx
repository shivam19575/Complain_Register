import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Store/Auth";
import { toast } from "react-toastify";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLocal } = useAuth();

  //  handling the input !

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(user);
      //  alert(user);

      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("response from the server", res_data);

      if (response.ok) {
        storeTokenInLocal(res_data.token);

        //  localStorage.setItem("token", res_data.token);

        setUser({
          email: "",

          password: "",
        });
        navigate("/");
        console.log("login successful !");
        toast.success("login successful !");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.msg
        );
      }
    } catch (error) {
      console.log("invalid credentials", error);
      toast.error("invalid credentials");
    }
  };

  return (
    <>
      <div className="registerPageContainer ">
        <div className="leftPart">
        <img src="Images/b.png" alt="leftImage" className="imageLeftPart" />
        </div>
        <div className="rightPart">
          <h1 className="registerHeading">You must sign in to join</h1>
          <div className="formContainer">
            <form onSubmit={handleSubmit}>
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
                  value="Login"
                  className="registerButton"
                />
              </div>
              <div className="w-[100%] h-[80px] flex justify-between">
              <div>Dont't Have An Account ?</div>
              <div><NavLink to="/register" className="text-xl font-semibold">Sign Up</NavLink></div>
            </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Loading /> */}
    </>
  );
};

export default Login;
