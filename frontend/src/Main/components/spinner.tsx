const SpinnerComponent = () => {
  return (
    <div className="flex flex-col items-center mt-40">
      <div className="animate-spin border-4 border-b-black border-t-black border-l-black h-16 w-16 rounded-full">
        .
      </div>
      <p className="font-pop text-xl text-center mt-3">...loading</p>
    </div>
  );
};

export default SpinnerComponent;
