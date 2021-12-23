import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation, useHistory} from 'react-router-dom';
// ---------- LOCAL ----------
import MainPage from "../../pages/main/main";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import ProtectedRoute from "../protected-route/protected-route";
import Layout from "../layout/layout";
import Modal from '../modal/modal'
import IngredientsDetails from '../ingredient-details/ingredient-details'
import { DELETE_INGREDIENT_MODAL_DATA } from '../../services/actions/ingredients';
import { getIngredients } from '../../services/actions/ingredients';
import { getUser } from '../../services/actions/auth';

const App = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth)

  useEffect(() => {
    dispatch(getIngredients())
    if (!user && !!localStorage.getItem('accessToken')) {
      dispatch(getUser())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    let background = location.state && location.state.background;

    const handleModalClose = () => {
      dispatch({type: DELETE_INGREDIENT_MODAL_DATA})
      history.goBack();
    };

    return (
      <>
      <Switch location={background || location}>
        <Route path="/" exact>
          <Layout>
            <MainPage />
          </Layout>
        </Route>

        <Route path="/ingredients/:ingredientId" exact>
          <Layout>
            <IngredientsDetails type="single" />
          </Layout>
        </Route>

        <Route path="/login" exact>
          <Layout>
            <LoginPage />
          </Layout>
        </Route>

        <Route path="/register" exact>
          <Layout>
            <RegisterPage />
          </Layout>
        </Route>

        <Route path="/forgot-password" exact>
          <Layout>
            <ForgotPasswordPage />
          </Layout>
        </Route>

        <Route path="/reset-password" exact>
          <Layout>
            <ResetPasswordPage />
          </Layout>
        </Route>

        <ProtectedRoute path="/profile" exact>
          <Layout>
            <ProfilePage type="profile" />
          </Layout>
        </ProtectedRoute>

        <ProtectedRoute path="/profile/orders" exact>
          <Layout>
            <ProfilePage type="history" />
          </Layout>
        </ProtectedRoute>
      </Switch>

      {background && (
        <Route
          path='/ingredients/:ingredientId'
          children={
            <Modal onClick={handleModalClose}>
              <IngredientsDetails />
            </Modal>
          }
        />
      )}

      </>
    )
  }

  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
};

export default App;
