import { Route, Redirect } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import PropTypes from "prop-types";
// ---------- TYPES ----------
import { RootState } from "../../redux/types/index";
import { FC } from "react";

interface IProtectedRoute {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const { user } = useSelector((store: RootState) => store.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
