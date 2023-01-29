import User from "../../Assets/User.png";
const ErrorComponent = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-1/3 mx-auto mt-1/5 shadow">
      <img src={User} alt="not found" className="w-full mx-auto" />
      <p className="font-pop font-semibold text-sm text-center">
        Oops!, An Error Occurred!
      </p>
    </div>
  );
};
export default ErrorComponent;
