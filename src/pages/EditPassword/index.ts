import { Button } from "../../components/Button";
import Input from "../../components/Input";
import Link from "../../components/Link";
import Image from "../../components/Image";
import Block from "../../core/Block";
import { focusin, focusout, submit } from "../../utils/validation";
import template from "./edit-password.hbs";
import imgAvatar from "../../asserts/avatar_default.svg";
import { API_RESOURCES_PATH, ROUTES } from "../../utils/constants";
import Title from "../../components/Title";
import { UserController } from "../../api/controllers/userController";
import { store } from "../../core/store";
import { router } from "../../core/router";
import { withStore } from "../../hocs/withStore";
import { withRouter } from "../../hocs/withRouter";

interface IEditPasswordPage {}

export class EditPasswordPage extends Block {
  constructor(props: IEditPasswordPage) {
    super(props);
  }

  protected init(): void {
    const value = store.state.user;
    const srcImage = value && value.avatar ? API_RESOURCES_PATH + value.avatar : imgAvatar;

    this.children.title = new Title({
      titleName: value?.first_name,
    });
    this.children.backButton = new Link({
      label: "",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/messenger");
        },
      },
    });
    this.children.imageAvatar = new Image({
      srcImg: srcImage,
      alt: "avatar",
      class: "profile_avatar",
    });
    this.children.inputOldPassword = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "oldPassword",
      type: "password",
      label: "Old password",
      placeholder: "example",
      error: "",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputNewPassword = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "newPassword",
      type: "password",
      label: "New password",
      placeholder: "example",
      error: "",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputNewPasswordAgain = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "newPassword",
      type: "password",
      label: "New password again",
      placeholder: "example",
      error: "",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.saveButton = new Button({
      label: "Save",
      classButton: "save-button",
      typeButton: "submit",
      events: {
        click: (event) => {
          submit({
            event,
            handler: UserController.changeUserPassword,
            action: () => router.go(ROUTES.profile.path),
          });
        },
      },
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({
  ...state.user,
  profileError: state.profileError,
}));

export default withUser(withRouter(EditPasswordPage));
