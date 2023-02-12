import User from "../../Assets/User.png";
const ErrorComponent = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-1/3 mx-auto mt-10 shadow bg-white p-5 rounded-lg border-b-4 border-black">
      <img src={User} alt="not found" className="w-5/6 mx-auto" />
      <p className="font-pop font-semibold text-sm text-center">
        Oops!, an Error Occurred!
      </p>
    </div>
  );
};
export default ErrorComponent;
