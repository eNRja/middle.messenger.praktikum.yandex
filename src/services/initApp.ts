import { AuthAPI } from "../api/authApi";
import { router } from "../core/router";
import { AppState } from "../core/store/";
import { Dispatch } from "../core/store/Store";
import { UserDTO } from "../types";

import { apiHasError } from "../utils";

export async function initApp(dispatch: Dispatch<AppState>) {
  const authAPI = new AuthAPI();
  // // Ручкая задержка для демонстрации загрузочного экрана
  // await new Promise(r => setTimeout(r, 700));

  try {
    const res = await authAPI.getUserInfo();
    const response = res.response;

    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: response as UserDTO });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
