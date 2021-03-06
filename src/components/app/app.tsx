import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "../../redux/hooks";
import { FC, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
// ---------- LOCAL ----------
import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main/main";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import FeedPage from "../../pages/feed/feed";
import ProtectedRoute from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientsDetails from "../ingredient-details/ingredient-details";
import { DELETE_INGREDIENT_MODAL_DATA } from "../../redux/actions/ingredients";
import { getIngredients } from "../../redux/actions/ingredients";
import { getUser } from "../../redux/actions/auth";
import NotFoundPage from "../../pages/not-found/not-found";
import OrderInformation from "../order-information/order-information";
import { Sockets } from "../../redux/actions/wsActions";
interface LocationElement {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: any;
}

interface LocationState {
  background?: undefined | LocationElement;
  location?: undefined | LocationElement;
}

const App: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getIngredients());
    if (!user && !!localStorage.getItem("accessToken")) {
      dispatch(getUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ModalSwitch = () => {
    const location = useLocation<LocationState>();
    const history = useHistory();
    const dispatch = useDispatch();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
      dispatch({ type: DELETE_INGREDIENT_MODAL_DATA });
      history.goBack();
    };

    return (
      <>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact>
            <MainPage />
          </Route>

          <Route path="/ingredients/:ingredientId" exact>
            <IngredientsDetails type="single" />
          </Route>

          <Route path="/login" exact>
            <LoginPage />
          </Route>

          <Route path="/register" exact>
            <RegisterPage />
          </Route>

          <Route path="/forgot-password" exact>
            <ForgotPasswordPage />
          </Route>

          <Route path="/reset-password" exact>
            <ResetPasswordPage />
          </Route>

          <ProtectedRoute path="/profile" exact>
            <ProfilePage type="profile" />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders" exact>
            <ProfilePage type="history" />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:orderId" exact>
            <OrderInformation type="single" wsType={Sockets.UserOrders} />
          </ProtectedRoute>

          <Route path="/feed" exact>
            <FeedPage />
          </Route>

          <Route path="/feed/:orderId" exact>
            <OrderInformation type="single" wsType={Sockets.AllOrders} />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>

        {background && (
          <Route
            path="/ingredients/:ingredientId"
            children={
              <Modal onClick={handleModalClose}>
                <IngredientsDetails />
              </Modal>
            }
          />
        )}

        {background && background.pathname.includes("feed") && (
          <Route
            path="/feed/:orderId"
            children={
              <Modal onClick={handleModalClose}>
                <OrderInformation />
              </Modal>
            }
          />
        )}

        {background && background.pathname.includes("profile/orders") && (
          <Route
            path="/profile/orders/:orderId"
            children={
              <Modal onClick={handleModalClose}>
                <OrderInformation />
              </Modal>
            }
          />
        )}
      </>
    );
  };

  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
};

export default App;
