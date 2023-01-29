import { createContext, ReactNode, useState, useEffect } from "react";
export type stateType = {
  Todos: object;
  error: boolean;
  success: boolean;
};
const initialState = {
  Todos: {},
  error: false,
  success: true,
};
const User = createContext(undefined as any);
interface child {
  children: ReactNode;
}
const auth = JSON.parse(localStorage.getItem("me") || "{}").auth;
type objt = {
  lifestyle_todos: Array<object>;
  business_todos: Array<object>;
  personal_todos: Array<object>;
};
type objT = {
  a: number;
  b: number;
  c: number;
};
export const Calculate = (obj: objt) => {
  let res =
    obj.business_todos.length +
    obj.lifestyle_todos.length +
    obj.personal_todos.length;
  return res - 3;
};
export const percentage = (obj: objT) => {
  let a,
    b,
    c,
    sum = obj.a + obj.b + obj.c;
  a = Math.floor((obj.a / sum) * 100);
  b = Math.floor((obj.b / sum) * 100);
  c = Math.floor((obj.c / sum) * 100);
  return sum > 0 ? { a, b, c } : { a: 0, b: 0, c: 0 };
};
export const UserProvider = ({ children }: child) => {
  let [state, setstate] = useState<stateType>(initialState);
  let [count, setcount] = useState<number>(0);
  const change = (mole: number) => {
    setcount(mole);
  };
  useEffect(() => {
    fetch(`http://localhost:5500/users`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
      },
    })
      .then((res) => {
        if (!res.ok)
          setstate((prev) => ({ ...prev, error: true, success: false }));
        return res.json();
      })
      .then((data) => {
        if (data) {
          setstate((prev) => ({
            ...prev,
            success: true,
            Todos: data,
            error: false,
            change,
          }));
        } else {
          setstate((prev) => ({ ...prev, error: true, success: false }));
        }
      })
      .catch((err) => {
        if (err) setstate((prev) => ({ ...prev, error: true, success: false }));
      });
  }, [count]);
  return <User.Provider value={{ state, setstate }}>{children}</User.Provider>;
};

export default User;
