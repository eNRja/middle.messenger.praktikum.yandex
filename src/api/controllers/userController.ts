import { store } from "../../core/store";
import { TUserProfileData, TUserPasswordData, UserDTO } from "../../types";
import { UserAPI } from "../userApi";

const userAPI = new UserAPI();

export class UserController {
  static async changeProfile(data: TUserProfileData) {
    return userAPI
      .changeProfile(data)
      .then((response) => {
        store.dispatch({ user: response.response as UserDTO });
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static async changeUserPassword(data: TUserPasswordData) {
    return userAPI
      .changePassword(data)
      .then((response) => response)
      .catch((error) => {
        return error;
      });
  }

  static async changeAvatar(data: FormData) {
    return userAPI
      .changeAvatar(data)
      .then((response) => {
        store.dispatch({ user: response.response as UserDTO });
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static async getUsersByLogin(login: string) {
    return userAPI
      .searchUserByLogin({ login })
      .then((response) => response)
      .catch((error) => {
        return error;
      });
  }
  
}
