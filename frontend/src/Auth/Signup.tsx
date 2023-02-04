import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../style/style.module.css";
type obj = {
  name: string;
  email: string;
  password: string;
};
const SignupComponent = (): JSX.Element => {
  let [all, setall] = useState<obj>({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const SET = () => {
    console.log(all);
    fetch("https://eapi-production.up.railway.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(all),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem(
            "me",
            JSON.stringify({
              name: data.name,
              auth: data.token,
            })
          );
          setTimeout(() => {
            navigate(`/${data.page}`);
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={style.bg}>
      <div className={style.bgi}>
        <div className="sm:flex flex-row items-stretch sm:w-2/3 mx-auto pt-10 bg-black4-0 p-5 rounded shadow">
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
            <form
              className="w-3/4 mx-auto rounded-sm  flex flex-col items-start shadow bg-white p-5 gap-5 mt-10"
              id="form"
            >
              <div className="w-full items-start">
                <input
                  type={"text"}
                  className="py-3 px-2 rounded font-pop font-semibold text-sm block w-full shadow outline-none"
                  placeholder="Your Username"
                  name="name"
                  id="name"
                  value={all.name}
                  onChange={(e) =>
                    setall((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="w-full items-start">
                <input
                  type={"email"}
                  className="py-3 px-2 rounded font-pop font-semibold text-sm block w-full shadow outline-none"
                  placeholder="Your Email"
                  name="email"
                  id="email"
                  value={all.email}
                  onChange={(e) =>
                    setall((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="w-full items-start">
                <input
                  type={"password"}
                  className="py-3 px-2 rounded font-pop font-semibold text-sm block w-full shadow outline-none"
                  placeholder="Your Password"
                  name="password"
                  id="password"
                  value={all.password}
                  onChange={(e) =>
                    setall((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
              <button
                className="bg-black p-3 rounded text-sm font-pop text-white font-semibold block w-full"
                type={"button"}
                onClick={() => SET()}
              >
                Submit
              </button>
              <Link
                className="text-blue-700 mt-2 text-sm text-left self-start font-pop cursor-pointer"
                to="/Login"
              >
                Already have an account?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupComponent;
