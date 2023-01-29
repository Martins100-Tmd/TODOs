import SideBarComponent from "./navbar/sidebar";
import { useState, useEffect } from "react";
import "../style/style.css";
import BusinessComponent from "./Pages/B_todos";
import LifestyleComponent from "./Pages/L_todos";
import PersonalComponent from "./Pages/P_todos";
import SettingComponent from "./Pages/Setting";
import StatComponent from "./Pages/Stat";
import SideBarComponentII from "./navbar/sidebar2";
type STATE = {
  name: string;
  pn: string | undefined;
  sd: string;
  sdb: boolean;
  image: string;
};
const MainComponent = (): JSX.Element => {
  let [all, setall] = useState<STATE>({
    name: "",
    pn: "",
    sd: "-100%",
    sdb: false,
    image: "",
  });
  useEffect(() => {
    if (localStorage.length !== 0) {
      var Name = localStorage.getItem("me") || "{}";
      setall((a) => ({ ...a, name: JSON.parse(Name).name }));
      setall((a) => ({ ...a, image: JSON.parse(Name).image }));
    }
    let IN =
      "w-3/4 shadow-xl inline sm:hidden border-r border-gray-300 pl-5 absolute bg-white -left-full";
    let OUT =
      "w-3/4 shadow-xl inline sm:hidden border-r border-gray-300 pl-5 fixed bg-white left-0 z-50";
    all.sdb
      ? setall((a) => ({ ...a, sd: OUT }))
      : setall((a) => ({ ...a, sd: IN }));
  }, [all.sdb]);
  let HashPage: any = {
    personal: <PersonalComponent />,
    business: <BusinessComponent />,
    setting: <SettingComponent />,
    lifestyle: <LifestyleComponent />,
    stat: <StatComponent />,
  };
  const FormatPage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setTimeout(() => {
      setall((a) => ({ ...a, sdb: false }));
    }, 500);
    if (e.target instanceof Element) {
      let target = e.target as HTMLDivElement;
      if (target.id === "page") {
        if (target.dataset.title) {
          setall((a) => ({ ...a, pn: target.dataset.title }));
          return target.dataset.title;
        }
      }
    } else {
      return "Error";
    }
  };
  return (
    <div className="flex flex-row items-stretch w-full relative">
      <div
        className="seven:w-30 sm:inline hidden border-r border-gray-300 eight:pl-5 w-1/6 items-center bg-white"
        onClick={(e) => {
          FormatPage(e);
        }}
      >
        <SideBarComponent name={all.name} img={all.image} />
      </div>
      <div className={all.sd} onClick={(e) => FormatPage(e)} id="sd">
        <SideBarComponentII name={all.name} img={all.image} />
      </div>
      <div className="flex flex-col items-stretch w-full">
        <nav
          className="sm:flex sm:flex-row justify-between w-full
        items-stretch pt-10 px-5 grid grid-cols-2 sticky top-0 bg-white"
        >
          <p className="font-pop sm:text-2xl text-xl text-black items-start font-black w-full mx-3 place-self-start">
            My Dashboard
          </p>
          <i
            className="text-4xl fa sm:hidden inline place-self-end text-black"
            onClick={() => {
              all.sdb
                ? setall((a) => ({ ...a, sdb: false }))
                : setall((a) => ({ ...a, sdb: true }));
            }}
          >
            &#xf0c9;
          </i>
          <i className="fa text-2xl text-black sm:inline hidden">&#xf059;</i>
        </nav>
        <div className="w-full">
          {all.pn ? HashPage[all.pn] : <LifestyleComponent />}
        </div>
      </div>
    </div>
  );
};
export default MainComponent;
