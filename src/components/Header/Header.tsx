import { useAppSelector } from "../../hooks/reduxHooks";
import "./header.css";

function Header() {
  const userInfo = useAppSelector((state) => state.user.user);
  return (
    <div className="all">
      <div className="content">
        <h1>Hello, {userInfo.name}</h1>
        <p>Have a Nice Day!</p>
      </div>
      <div className="image"></div>
    </div>
  );
}

export default Header;
