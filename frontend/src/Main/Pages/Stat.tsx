import "../../style/style.css";
import { useContext, useMemo } from "react";
import User, { percentage } from "../../context/context";
import { Calculate } from "../../context/context";
import LineComponent from "../../Charts/Line";
const StatComponent = (): JSX.Element => {
  let { state } = useContext(User);
  let State = useMemo(() => {
    return state;
  }, [state]);
  let Total = Calculate(State.Todos);
  let todos = {
    a: State.Todos.lifestyle_todos.length - 1,
    b: State.Todos.business_todos.length - 1,
    c: State.Todos.personal_todos.length - 1,
  };
  return (
    <div className="overflow-y-scroll">
      <div className="bg-white w-full p-3 text-white shadow">.</div>
      <div className="p-5 gap-6 flex flex-col">
        <div>
          <div className="grid sm:grid-cols-4 grid-cols-2 w-full pb-0 gap-5">
            <div className="h-40 rounded p-1 shadow bg-black hover:scale-105 duration-700 grid grid-cols-1 gap-3">
              <div className="flex flex-row items-center  justify-between w-nine mx-auto">
                <p className="font-pop font-semibold text-2xl items-start text-white">
                  Total
                </p>
                <p className="font-pop text-sm text-green-500">
                  <span className="text-xl mr-1 font-black">&#8593;</span>100%
                </p>
              </div>
              <p className="font-pop text-2xl items-start w-nine mx-auto text-white">
                {JSON.stringify(Total)}{" "}
                <span className="text-base text-white">Todos</span>
              </p>
            </div>
            <div className="h-40 rounded p-3 shadow bg-white hover:scale-105 duration-700 grid grid-cols-1 gap-3">
              <div className="flex flex-row items-center  justify-between w-nine mx-auto">
                <p className="font-pop text-xl items-start uppercase">
                  Lifestyle
                </p>
                <p className="font-pop text-sm text-green-500">
                  <span className="text-xl mr-1 font-black">&#8593;</span>
                  {percentage(todos).a}%
                </p>
              </div>
              <p className="font-pop text-2xl items-start w-nine mx-auto">
                {JSON.stringify(todos.a)}{" "}
                <span className="text-base">Todos</span>
              </p>
            </div>
            <div className="h-40 rounded p-3 shadow bg-white hover:scale-105 duration-700 grid grid-cols-1 gap-3">
              <div className="flex flex-row items-center  justify-between w-nine mx-auto">
                <p className="font-pop text-xl uppercase items-start">
                  Business
                </p>
                <p className="font-pop text-sm text-green-500">
                  <span className="text-xl mr-1 font-black">&#8593;</span>
                  {percentage(todos).b}%
                </p>
              </div>
              <p className="font-pop text-2xl items-start w-nine mx-auto">
                {JSON.stringify(todos.b)}{" "}
                <span className="text-base">Todos</span>
              </p>
            </div>
            <div className="h-40 rounded p-3 shadow bg-white hover:scale-105 duration-700 grid grid-cols-1 gap-3">
              <div className="flex flex-row items-center  justify-between w-nine mx-auto">
                <p className="font-pop text-xl uppercase items-start">
                  Personal
                </p>
                <p className="font-pop text-sm text-green-500">
                  <span className="text-xl mr-1 font-black">&#8593;</span>
                  {percentage(todos).c}%
                </p>
              </div>
              <p className="font-pop text-2xl items-start w-nine mx-auto">
                {JSON.stringify(todos.c)}{" "}
                <span className="text-base">Todos</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col items-center sm:items-stretch w-full gap-5 ">
          <div className="sm:w-4/6 w-full">
            <LineComponent />
          </div>
          <div className="sm:w-2/6 w-full  bg-white rounded-xl shadow grid grid-cols-1 items-start gap-3 p-5">
            <div className="flex flex-row items-start mt-3 gap-5">
              <div className="bg-black rounded-full w-14 h-14 shadow-lg relative p-3 border border-green-300">
                <i className="fa text-green-500 absolute top-1/3 left-1/3">
                  &#xf073;
                </i>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-pop text-xl">Account created</p>
                <small className="font-pop font-semibold text-gray-700 items-start">
                  {State.Todos.date}
                </small>
              </div>
            </div>
            <div className="flex flex-row items-start mt-3 gap-5">
              <div className="bg-black rounded-full w-14 h-14 shadow-lg relative p-3 border border-green-300">
                <i className="fa text-green-500 absolute top-1/3 left-1/3">
                  &#xf073;
                </i>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-pop text-xl">Account updated</p>
                <small className="font-pop font-semibold text-gray-700 items-start">
                  {State.Todos.update}
                </small>
              </div>
            </div>
            <div className="flex flex-row items-start mt-3 gap-5">
              <div className="bg-black rounded-full w-14 h-14 shadow-lg relative p-3 border border-green-300">
                <i className="fa text-green-500 absolute top-1/3 left-1/3">
                  &#xf073;
                </i>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-pop text-xl">Last Activity</p>
                <small className="font-pop font-semibold text-gray-700 items-start">
                  {State.Todos.updatedClock}
                </small>
              </div>
            </div>
            <div className="flex flex-row items-start mt-3 gap-5">
              <div className="bg-black rounded-full w-14 h-14 shadow-lg relative p-3 border border-green-300">
                <i className="fa text-green-500 absolute top-1/3 left-1/3">
                  &#xf073;
                </i>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-pop text-xl">Active on</p>
                <small className="font-pop font-semibold text-gray-700 items-start">
                  {State.Todos.clock}
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="p-14 rounded shadow w-full bg-white"></div>
      </div>
    </div>
  );
};
export default StatComponent;
