import { Link } from "react-router-dom";
import User from "../../Assets/User.png";
interface Iprop {
  name: string;
  img: string;
}
const SideBarComponent = ({ name }: Iprop): JSX.Element => {
  return (
    <div
      className="flex flex-col seven:items-start h-screen px-3 mt-5 w-full items-center"
      id="SB"
    >
      <div className="flex flex-row items-center seven:self-start gap-5 border-b border-gray-200  pb-5 self-center">
        <img
          alt="user"
          src={User}
          id="img"
          className="w-Ten inline rounded-full object-cover bg-white border-2 border-slate-300"
        />
        <p className="font-pop font-semibold text-lg ">{name}</p>
        <i className="fa text-2xl text-black ">&#xf0f3;</i>
      </div>
      <Link
        to={"/welcome"}
        className="flex seven:flex-row seven:items-center flex-col w-full mt-10 hover:bg-blue_hover-0
         hover:rounded-md cursor-pointer seven:self-start self-center p-2"
      >
        <i className="material-icons text-gray-500 text-3xl self-center ">
          &#xe88a;
        </i>
        <p className="font-pop text-xl seven:ml-7 text-gray-500 self-center ">
          Overview
        </p>
      </Link>
      <div
        className="flex seven:flex-row flex-col items-center w-full mt-10 hover:bg-blue_hover-0 hover:rounded-md border-black cursor-pointer p-3"
        data-title="stat"
        id="page"
      >
        <i
          className="fa text-gray-500 text-2xl self-center "
          data-title="stat"
          id="page"
        >
          &#xf080;
        </i>
        <p
          className="font-pop  text-xl seven:ml-7 text-gray-500 self-center "
          data-title="stat"
          id="page"
        >
          Stat
        </p>
      </div>
      <div
        className="flex seven:flex-row flex-col items-center w-full mt-10 hover:bg-blue_hover-0 hover:rounded-md cursor-pointer p-3"
        data-title="business"
        id="page"
      >
        <i
          className="fa text-gray-500 text-2xl self-center "
          data-title="business"
          id="page"
        >
          &#xf187;
        </i>
        <p
          className="font-pop text-xl seven:ml-7 text-gray-500 self-center "
          data-title="business"
          id="page"
        >
          Business
        </p>
      </div>
      <div
        className="flex seven:flex-row items-center w-full mt-10 hover:bg-blue_hover-0 hover:rounded-md flex-col cursor-pointer p-3"
        data-title="personal"
        id="page"
      >
        <i
          className="fa text-gray-500 text-2xl self-center "
          data-title="personal"
          id="page"
        >
          &#xf1b2;
        </i>
        <p
          className="font-pop text-xl seven:ml-7 self-center text-gray-500 "
          data-title="personal"
          id="page"
        >
          Personal
        </p>
      </div>
      <div
        className="flex seven:flex-row items-center flex-col w-full mt-10 hover:bg-blue_hover-0 hover:rounded-md cursor-pointer p-3"
        data-title="lifestyle"
        id="page"
      >
        <i
          className="fa text-2xl text-gray-500 self-center "
          data-title="lifestyle"
          id="page"
        >
          &#xf108;
        </i>
        <p
          className="font-pop  text-xl seven:ml-7 text-gray-500 self-center "
          data-title="lifestyle"
          id="page"
        >
          Lifestyle
        </p>
      </div>
      <div className="mt-20 w-full flex flex-col items-start">
        <div
          className="flex seven:flex-row flex-col items-center w-full mt-10 hover:bg-blue_hover-0 hover:rounded-md cursor-pointer p-3"
          data-title="setting"
          id="page"
        >
          <i
            className="fa fa-gear fa-spin text-gray-500 text-2xl self-center "
            data-title="setting"
            id="page"
          ></i>
          <p
            className="font-pop text-xl seven:ml-7 text-gray-500 self-center "
            data-title="setting"
            id="page"
          >
            Settings
          </p>
        </div>
        <Link
          to={"/"}
          className="flex flex-row items-start w-full mt-10 hover:bg-blue_hover-0 hover:rounded-md cursor-pointer p-3"
          data-title="Log"
          title="Logout"
          id="page"
        >
          <i className="fa text-gray-500 text-2xl ">&#xf08b;</i>
          <p className="font-pop text-xl ml-7 text-gray-500 ">Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default SideBarComponent;
