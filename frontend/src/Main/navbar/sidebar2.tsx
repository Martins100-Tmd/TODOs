import { Link } from "react-router-dom";
import User from "../../Assets/User.png";
interface Iprop {
  name: string;
  img: string;
}
const SideBarComponentII = ({ name }: Iprop): JSX.Element => {
  return (
    <div
      className="flex flex-col seven:items-start px-3 mt-5 w-full items-center min-h-screen overflow-y-scroll"
      id="SB"
    >
      <div className="flex flex-row items-center seven:self-start gap-5 border-b border-gray-200 pb-5 self-center">
        <img
          alt="user"
          src={User}
          id="img"
          className="w-Ten inline rounded-full border-2 border-black object-cover"
        />
        <div className="flex flex-col items-start ml-2">
          <p className="font-pop font-semibold text-lg ">{name}</p>
          <small className="text-xs font-semibold font-pop text-green-600">
            Active
          </small>
        </div>
      </div>
      <Link
        to={"/welcome"}
        className="flex flex-row seven:items-center w-full mt-10 hover:bg-blue_hover-0 rounded-md cursor-pointer self-start"
      >
        <i className="material-icons text-gray-500 text-3xl self-center ">
          &#xe88a;
        </i>
        <p className="font-pop font-semibold text-xl ml-7 text-gray-500 self-center ">
          Overview
        </p>
      </Link>
      <div
        className="flex flex-row  items-center w-full mt-10 hover:border-r-2 border-black cursor-pointer p-2"
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
          className="font-pop font-semibold text-xl ml-7 text-gray-500 self-center "
          data-title="stat"
          id="page"
        >
          Stat
        </p>
      </div>
      <div
        className="flex flex-row items-center w-full mt-10 hover:border-r-2 border-black cursor-pointer p-2"
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
          className="font-pop font-semibold text-xl ml-7 text-gray-500 self-center "
          data-title="business"
          id="page"
        >
          Business
        </p>
      </div>
      <div
        className="flex flex-row items-center w-full mt-10 hover:border-r-2 border-black cursor-pointer p-2"
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
          className="font-pop font-semibold text-xl ml-7 self-center text-gray-500 "
          data-title="personal"
          id="page"
        >
          Personal
        </p>
      </div>
      <div
        className="flex flex-row items-center w-full mt-10 hover:border-r-2 border-black cursor-pointer p-2"
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
          className="font-pop font-semibold text-xl ml-7 text-gray-500 self-center "
          data-title="lifestyle"
          id="page"
        >
          Lifestyle
        </p>
      </div>
      <div className="mt-16 w-full flex flex-col items-start overflow-y-scroll">
        <div
          className="flex flex-row items-center w-full mt-10 hover:border-r-2 border-black cursor-pointer p-2"
          data-title="setting"
          id="page"
        >
          <i
            className="fa fa-gear fa-spin text-gray-500 text-2xl self-center "
            data-title="setting"
            id="page"
          ></i>
          <p
            className="font-pop font-semibold text-xl ml-7 text-gray-500 self-center "
            data-title="setting"
            id="page"
          >
            Settings
          </p>
        </div>
        <Link
          to={"/"}
          className="flex flex-row items-start w-full mt-10 hover:border-r-2 border-black cursor-pointer p-2"
          data-title="Log"
          title="Logout"
          id="page"
        >
          <i className="fa text-gray-500 text-2xl ">&#xf08b;</i>
          <p className="font-pop font-semibold text-xl ml-7 text-gray-500 ">
            Logout
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SideBarComponentII;
