import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, ...rest }) => {

  const { user } = useSelector(store => store.auth);

  return (
    <Route
      {...rest}
      render={({ location }) => (
          user ? (
            children
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          )
        )
      }
    />
  );
} 

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ProtectedRoute;