import { Store } from "./store/Store";
import { Router } from "./router/Router";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import { AppState } from "./store/";
import RegistrationPage from "../pages/Registration";
import ProfilePage from "../pages/Profile";
import EditDetailsPage from "../pages/EditDetails";
import EditPasswordPage from "../pages/EditPassword";
import AddUserPage from "../pages/AddUser";
import DeleteUserPage from "../pages/DeleteUser";
import LoadFilePage from "../pages/LoadFile";
import Error404Page from "../pages/Error/404";
import Error500Page from "../pages/Error/500";

export const router = new Router("#app");

export function initRouter(store: Store<AppState>) {
  router
    .use({
      pathname: "/",
      block: LoginPage,
      redirectPath: "/messenger",
      onUnautorized: () => Boolean(store.getState().user),
      isSecure: true,
    })
    .use({
      pathname: "/sign-up",
      block: RegistrationPage,
      redirectPath: "",
    })
    .use({
      pathname: "/messenger",
      block: HomePage,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: "/settings",
      block: ProfilePage,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: "/settings/edit",
      block: EditDetailsPage,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: "/settings/password",
      block: EditPasswordPage,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: "/add-user",
      block: AddUserPage,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: "/delete-user",
      block: DeleteUserPage,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: "/load-file",
      block: LoadFilePage,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: "/error-404",
      block: Error404Page,
      redirectPath: "",
    })
    .use({
      pathname: "/error-500",
      block: Error500Page,
      redirectPath: "",
    })
    .start();
}
