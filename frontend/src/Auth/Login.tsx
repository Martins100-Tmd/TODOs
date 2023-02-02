import style from "../style/style.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/style.css";
type stateType = {
  password: string;
  email: string;
};
const LoginComponent = (): JSX.Element => {
  let [state, setstate] = useState<stateType>({
    password: "",
    email: "",
  });
  let navigate = useNavigate();
  const Login = () => {
    if (state) {
      fetch("http://localhost:3300/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem(
              "me",
              JSON.stringify({
                name: data.name,
                auth: data.token,
              })
            );
            setTimeout(() => {
              navigate(data.page);
            }, 1000);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className={style.bg}>
      <div className={style.bgi}>
        <div
          className="flex md:flex-row flex-col w-2/3 mx-auto rounded shadow min-h-400 pt-10 z-50 absolute"
          id="log"
        >
          <div className="md:w-2/5 w-full bg-cyan-900 md:rounded-l md:inline hidden relative">
            <div
              className="flex flex-col items-center absolute top-1/4"
              id="log"
            >
              <i className="fa text-6xl text-center text-white">&#xf23d;</i>
              <p className="font-pop text-3xl text-center text-white mt-4">
                DEVAS TODO APP
              </p>
            </div>
          </div>
          <div className="md:w-3/5 w-full bg-gray-50 p-10 md:rounded-r">
            <form className="w-3/4 mx-auto rounded-sm  flex flex-col items-start shadow bg-white p-5 gap-5 mt-16">
              <div className="items-start w-full">
                <input
                  type={"text"}
                  className="font-pop text-base p-3 shadow w-full block outline-none border border-cyan-50"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setstate((prev) => ({ ...prev, email: e.target.value }));
                  }}
                />
              </div>
              <div className="items-start w-full">
                <input
                  type={"password"}
                  className="font-pop text-base p-3 shadow w-full block outline-none border border-cyan-50"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setstate((prev) => ({ ...prev, password: e.target.value }));
                  }}
                />
              </div>
              <button
                type={"button"}
                className="bg-black text-white font-pop text-base block w-full p-3"
                onClick={() => {
                  Login();
                  console.log(state);
                }}
              >
                Login
              </button>
              <Link
                className="text-blue-700 mt-2 text-sm text-left self-start font-pop cursor-pointer"
                to="/"
              >
                Signup?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
