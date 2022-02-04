import { Route, Redirect } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import PropTypes from "prop-types";
import Preloader from "../preloader/preloader";
// ---------- TYPES ----------
import { FC } from "react";

interface IProtectedRoute {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const { user, isLoading } = useSelector((store) => store.auth);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <Route
          {...rest}
          render={({ location }) =>
            user ? (
              children
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: location } }}
              />
            )
          }
        />
      )}
    </>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
