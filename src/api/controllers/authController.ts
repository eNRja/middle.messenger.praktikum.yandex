import { router } from "../../core/router";
import { store } from "../../core/store";
import { TSignUpData } from "../../types";
import { ROUTES } from "../../utils/constants";
import { AuthAPI } from "../authApi";

const authAPI = new AuthAPI();

export class AuthController {
  static async signUp(data: TSignUpData) {
    try {
      const result = await authAPI.signUp(data);
      if (result.status === 200) {
        AuthController.getInfo();
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  static async checkUser() {
    return authAPI
      .getUserInfo()
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  }

  static async signIn(data: TSignUpData) {
    try {
      const result = await authAPI.signIn(data);
      if (result.status === 200) {
        AuthController.getInfo();
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  static async getInfo() {
    try {
      const result = await authAPI.getUserInfo();
      if (result.status === 200) {
        store.dispatch({
          user: result.response,
          authError: null,
        });
        return;
      }
    } catch (error) {
      return error;
    }
  }

  static async logout() {
    return authAPI
      .logout()
      .then(() => {
        router.go(ROUTES.login.path);
        const { user } = store.getState();
        if (user) {
          store.clear();
        }
      })
      .catch((error) => {
        return error;
      });
  }
}
