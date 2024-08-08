import { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  element: Element,
  ...rest
}: {
  element: React.ElementType;
}) => {
  const [userLogged] = useState(true);

  return userLogged ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
