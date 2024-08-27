import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = ({
  element: Element,
  role,
  ...rest
}: {
  element: React.ElementType;
  role: string;
}) => {
  const userLogged = useAuth();

  return userLogged.toString().includes(role) ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
