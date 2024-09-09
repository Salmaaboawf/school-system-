import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  element: Element,
  role,
  ...rest
}: {
  element: React.ElementType;
  role: string;
}) => {
  const userLogged = localStorage.getItem("userId");

  return userLogged?.toString().includes(role) ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
