import { useEffect, useState } from "react";
import ErrorComponent from "./Error";
import "../../style/style.css";
import { useContext } from "react";
import User from "../../context/context";
type Item = {
  body: string;
  _id: string;
  created: string;
};
type LOAD = {
  add: number;
  delete: number;
  error: number;
  date: string;
  text: string | undefined;
  modal: number;
};
const BusinessComponent = (): JSX.Element => {
  let { state } = useContext(User);
  let [b, setb] = useState<Array<Item>>([]);
  let [load, setload] = useState<LOAD>({
    add: 0,
    delete: 0,
    error: 1,
    date: "",
    text: "",
    modal: 0,
  });
  let [text, settext] = useState<string | undefined>("");
  let auth = JSON.parse(localStorage.getItem("me") || "{}").auth;
  const PUT = () => {
    fetch(`http://localhost:3300/users/update`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
      body: JSON.stringify({
        btext: text,
      }),
    })
      .then((res) => {
        if (!res.ok) setload((l) => ({ ...l, error: 0 }));
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          state.change(8);
          setTimeout(() => {
            setload((l) => ({ ...l, add: 1 }));
            settext("");
            setTimeout(() => {
              setload((l) => ({ ...l, add: 0 }));
            }, 300);
          });
        }
        setload((l) => ({ ...l, error: 1 }));
      })
      .catch((err) => {
        if (err) throw new Error(err);
        setload((l) => ({ ...l, error: 0 }));
      });
  };
  useEffect(() => {
    fetch(`http://localhost:3300/users`, {
      method: "GET",

      headers: {
        Authorization: "Bearer " + auth,
      },
    })
      .then((res) => {
        if (!res.ok) setload((l) => ({ ...l, error: 0 }));
        return res.json();
      })
      .then((data) => {
        if (data) {
          setb(
            data.business_todos.filter((item: any) => {
              return item.body !== "" && item.body;
            })
          );
        }
        setload((l) => ({ ...l, error: 1 }));
      })
      .catch((err) => {
        setload((l) => ({ ...l, error: 0 }));
        if (err) throw new Error(err);
      });
  }, [load.add, load.delete, load.error, auth]);
  const HandClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    setload((l) => ({ ...l, modal: 0 }));
    let target = e.target as HTMLDivElement;
    let ID = target.dataset.title;
    fetch(`http://localhost:3300/users/delete`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
      body: JSON.stringify({
        updateb: "",
        title: ID,
      }),
    })
      .then((res) => {
        if (!res.ok) setload((l) => ({ ...l, error: 0 }));
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setTimeout(() => {
            setload((load) => ({ ...load, delete: 1 }));
            setTimeout(() => {
              setload((load) => ({ ...load, delete: 0 }));
            }, 100);
          }, 0);
          setload((l) => ({ ...l, error: 1 }));
        }
      })
      .catch((err) => {
        if (err) {
          setload((l) => ({ ...l, error: 0 }));
          throw new Error(err);
        }
      });
  };
  let list = b.map((item: Item, index) => {
    return (
      <div
        className="w-full rounded-md h-150 p-4 flex flex-col items-center shadow-md self-center bg-white my-1"
        key={index}
        onClick={(e) => {
          let target = e.target as HTMLDivElement;
          if (target.id !== "span") {
            setload((l) => ({ ...l, modal: 1 }));
          }
          setload((l) => ({ ...l, text: item.body }));
          setload((l) => ({
            ...l,
            date: `
        ${new Date().getDate()}:${
              new Date().getMonth() + 1
            }:${new Date().getFullYear()}`,
          }));
        }}
      >
        <div className="text-xs text-left self-start my-1">
          <div
            className="text-xl text-black fa text-center cursor-pointer"
            onClick={(e) => HandClick(e)}
            id={"span"}
            data-title={item._id}
            data-text={item.body}
          >
            &#xf1f8;
          </div>
        </div>
        <p className="font-pop text-lg text-center my-10">
          {item.body.trim().substring(0, 50) + "..."}
        </p>
      </div>
    );
  });

  return load.error ? (
    <>
      <div>{load.modal === 1 ? <div id="bg"></div> : <></>}</div>
      <div className="flex flex-col items-center w-full">
        <div className="flex sm:flex-row items-center w-full mx-auto bg-white rounded shadow px-7 py-4">
          <input
            type={"text"}
            className="p-3 outline-none
                     font-pop text-base w-full bg-slate-50"
            value={text}
            onChange={(e) => settext(e.target.value)}
            id="ip"
            placeholder="add todo"
          />
          <i
            className="fa text-2xl text-slate-400 cursor-pointer px-7"
            onClick={() => PUT()}
          >
            &#xf067;
          </i>
        </div>
        {load.modal === 1 ? (
          <div
            className="fixed sm:w-1/2 w-nine mx-auto h-auto flex flex-col items-center p-2
           bg-white shadow rounded justify-between min-h-250 z-50"
            id="sd modal"
          >
            <div className="flex flex-row items-center justify-between w-full border-b border-gray-200 p-4">
              <p className="font-pop text-lg text-left self-start">Business</p>
              <i
                className="fa text-xl cursor-pointer"
                onClick={() => setload((l) => ({ ...l, modal: 0 }))}
              >
                &#xf1f8;
              </i>
            </div>
            <p className="text-base text-justify w-full font-pop p-4 max-h-500 inline-block overflow-y-scroll h-auto">
              {load.text}
            </p>
            <small className="text-sm font-pop font-semibold text-left self-start p-4 border-t border-gray-200 w-full">
              {load.date}
            </small>
          </div>
        ) : (
          <div></div>
        )}
        <div className="grid sm:grid-cols-4 grid-cols-2 w-full gap-3 mt-5 overflow-y-scroll p-2">
          {list}
        </div>
      </div>
    </>
  ) : (
    <ErrorComponent />
  );
};

export default BusinessComponent;
