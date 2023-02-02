import { useState } from "react";
import "../../style/style.css";
import { useNavigate } from "react-router-dom";
type all = {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  delPassword: string;
  token: string;
  setIsVerified: boolean;
  settingPassword: string;
};
const SettingComponent = (): JSX.Element => {
  let [all, setall] = useState<all>({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    delPassword: "",
    token: "",
    setIsVerified: false,
    settingPassword: "",
  });
  let auth = JSON.parse(localStorage.getItem("me") || "{}").auth;
  let navigate = useNavigate();
  const Update = () => {
    all.password === all.confirmpassword
      ? fetch(`http://localhost:3300/users/update`, {
          method: "PUT",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
          body: JSON.stringify({
            name: all.name,
            email: all.email,
            password: all.password,
            UpdateOne: "true",
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setall((l) => ({ ...l, token: data.auth }));
            if (data.success) {
              delete data.success;
              localStorage.setItem("me", JSON.stringify(data));
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          })
          .catch((err) => {
            throw new Error(err);
          })
      : console.log("localStorage is undefined");
  };
  const Delete = () => {
    fetch(`http://localhost:3300/users/delete`, {
      method: "DELETE",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
      body: JSON.stringify({ dropOne: true, password: all.delPassword }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.removeItem("me");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const Verify = () => {
    fetch("http://localhost:3300/users/verify", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
      body: JSON.stringify({ password: all.settingPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setall((prev) => ({ ...prev, setIsVerified: true }));
        } else {
          setall((prev) => ({ ...prev, setIsVerified: false }));
        }
      })
      .catch((err) => {
        if (err) {
          setall((prev) => ({ ...prev, setIsVerified: false }));
          throw new Error(err);
        }
      });
  };
  return !all.setIsVerified ? (
    <>
      <div>{all.setIsVerified ? <div></div> : <div id="bgi"></div>}</div>
      <form
        className="sm:w-1/2 rounded-sm mx-auto w-nine p-3 shadow
        absolute h-auto flex flex-col items-center
           bg-white justify-between z-50"
        id="modal"
      >
        <div className="items-start flex flex-col w-full">
          <label className="font-pop text-base text-left">Password</label>
          <input
            type={"password"}
            className="font-pop text-base shadow rounded p-3 block w-full"
            placeholder="Enter your Password"
            name="name"
            value={all.settingPassword}
            onChange={(e) => {
              setall((prev) => ({ ...prev, settingPassword: e.target.value }));
            }}
          />
        </div>
        <button
          className="font-pop text-white text-base block w-full bg-black p-3 mt-3"
          type={"button"}
          onClick={() => Verify()}
        >
          Confirm
        </button>
      </form>
    </>
  ) : (
    <div className="grid grid-cols-1 w-nine mx-auto p-5 rounded shadow  gap-10 bg-white">
      <form className="grid grid-cols-1 w-full gap-5 p-5 shadow">
        <h1 className="font-pop uppercase self-start text-2xl">
          Account Profile Update!
        </h1>
        <div className="flex flex-col items-start w-full shadow">
          <input
            type={"text"}
            placeholder="Enter new name"
            className="font-pop text-base p-3 shadow outline-none border-none block w-full"
            onChange={(e) => {
              setall((l) => ({ ...l, name: e.target.value }));
            }}
          />
        </div>
        <div className="flex flex-col items-start w-full shadow">
          <input
            type={"email"}
            placeholder="Enter new email"
            className="font-pop text-base p-3 shadow outline-none border-none block w-full"
            onChange={(e) => {
              setall((l) => ({ ...l, email: e.target.value }));
            }}
          />
        </div>
        <div className="flex flex-col items-start w-full shadow">
          <input
            type={"password"}
            placeholder="Enter new password"
            className="font-pop text-base p-3 shadow outline-none border-none block w-full"
            onChange={(e) => {
              setall((l) => ({ ...l, password: e.target.value }));
            }}
          />
        </div>
        <div className="flex flex-col items-start w-full shadow">
          <input
            type={"password"}
            placeholder="Confirm new password"
            className="font-pop text-base p-3 shadow outline-none border-none block w-full"
            onChange={(e) => {
              setall((l) => ({ ...l, confirmpassword: e.target.value }));
            }}
          />
        </div>
        <button
          className="w-2/5 block p-4 rounded text-base text-white bg-black my-3 font-pop"
          type={"button"}
          onClick={() => Update()}
        >
          Update
        </button>
      </form>
      <div className="w-full mx-auto shadow">
        <form className="grid grid-cols-1 w-full gap-5 p-5">
          <h1 className="font-pop uppercase text-left text-2xl">
            Account Profile Delete!
          </h1>
          <div className="flex flex-col w-full">
            <input
              type={"text"}
              className="font-pop text-sm p-4 w-full block shadow"
              placeholder="Enter password"
              onChange={(e) => {
                setall((l) => ({ ...l, delPassword: e.target.value }));
              }}
            />
          </div>
        </form>
        <button
          className="w-1/3 block p-4 rounded text-base text-white bg-red-700 my-3 ml-5"
          onClick={() => Delete()}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default SettingComponent;
