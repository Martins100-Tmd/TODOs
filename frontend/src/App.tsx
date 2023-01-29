import SignupComponent from "./Auth/Signup";
import MainComponent from "./Main/Main";
import LoginComponent from "./Auth/Login";
import { Route, Routes } from "react-router-dom";
import "./style/style.css";
import { UserProvider } from "./context/context";
const App = (): JSX.Element => {
  const HTML = document.querySelector("body") as HTMLHtmlElement | null;
  window.onclose = () => {
    localStorage.removeItem("me");
  };
  HTML!.style.position = "relative";
  HTML!.className = "bg-slate-50";
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignupComponent />}>
            Signup
          </Route>
          <Route path="/Login" element={<LoginComponent />}>
            Login
          </Route>
          <Route path="/welcome" element={<MainComponent />}></Route>
        </Routes>
      </UserProvider>
    </>
  );
};
export default App;
