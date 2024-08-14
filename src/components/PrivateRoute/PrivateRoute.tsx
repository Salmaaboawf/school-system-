import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = ({
  element: Element,
  ...rest
}: {
  element: React.ElementType;
}) => {
  const userLogged = useAuth();

  return userLogged.toString().includes("admin") ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
