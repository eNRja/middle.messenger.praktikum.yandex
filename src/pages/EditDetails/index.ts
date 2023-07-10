import { Input } from "../../components/Input/input";
import Link from "../../components/Link";
import Image from "../../components/Image";
import Block from "../../core/Block";
import { focusin, focusout, submit } from "../../utils/validation";
import template from "./edit-details.hbs";
import imgAvatar from "../../asserts/avatar_default.svg";
import { Button } from "../../components/Button";
import { API_RESOURCES_PATH, ROUTES } from "../../utils/constants";
import Title from "../../components/Title";
import { UserController } from "../../api/controllers/userController";
import { store } from "../../core/store";
import { withStore } from "../../hocs/withStore";
import { withRouter } from "../../hocs/withRouter";
import { router } from "../../core/router";

interface IEditDetailsPagePage {}

export class EditDetailsPage extends Block {
  constructor(props: IEditDetailsPagePage) {
    super(props);
  }

  protected init(): void {
    const value = store.state.user;
    const srcImage = value && value.avatar ? value.avatar : imgAvatar;

    this.children.title = new Title({
      titleName: value?.first_name,
    });
    this.children.backButton = new Link({
      href: ROUTES.profile.path,
      label: "",
    });
    this.children.imageAvatar = new Image({
      srcImg: API_RESOURCES_PATH + srcImage,
      alt: "avatar",
      class: "profile_avatar",
    });
    this.children.inputEmail = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "example",
      error: "",
      value: value?.email,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputLogin = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "login",
      type: "text",
      label: "Login",
      placeholder: "example",
      error: "",
      value: value?.login,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputName = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "first_name",
      type: "text",
      label: "Name",
      error: "",
      value: value?.first_name,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputSurName = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "second_name",
      type: "text",
      label: "Second name",
      placeholder: "example",
      error: "",
      value: value?.second_name,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputNickName = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "display_name",
      type: "text",
      label: "Nick name",
      placeholder: "example",
      error: "",
      value: value?.display_name,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputTelephone = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "phone",
      type: "text",
      label: "Phone number",
      placeholder: "example",
      error: "",
      value: value?.phone,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.saveButton = new Button({
      label: "Save",
      classButton: "edit-details__save-button",
      typeButton: "submit",
      events: {
        click: (event) => {
          submit({
            event,
            handler: UserController.changeProfile,
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

export default withUser(withRouter(EditDetailsPage));
