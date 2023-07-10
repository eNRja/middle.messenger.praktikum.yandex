import { Input } from "../../components/Input/input";
import Link from "../../components/Link";
import Image from "../../components/Image";
import Block from "../../core/Block";
import { focusin, focusout } from "../../utils/validation";
import template from "./profile.hbs";
import imgAvatar from "../../asserts/avatar_default.svg";
import { Button } from "../../components/Button";
import { AuthController } from "../../api/controllers/authController";
import { API_RESOURCES_PATH, ROUTES } from "../../utils/constants";
import Title from "../../components/Title";
import Modal from "../../components/Modal";
import { renderDOM } from "../../core";
import ImageOverlay from "../../components/ImageOverlay";
import { store } from "../../core/store";
import { withStore } from "../../hocs/withStore";
import { withRouter } from "../../hocs/withRouter";

interface IProfilePagePage {
  name: string;
}

const changeAvatar = () => {
  const modal = new Modal({
    title: "Add File",
    changeAvatarBool: true,
  });

  renderDOM(modal, "#modal");
  modal.show();
};

class ProfilePage extends Block {
  constructor(props: IProfilePagePage) {
    super(props);
  }

  protected init(): void {
    this.children.backButton = new Link({
      href: ROUTES.home.path,
      label: "",
    });
    const value = store.state.user;
    const srcImage = value && value.avatar ? value.avatar : imgAvatar;

    this.children.title = new Title({
      titleName: value?.first_name,
    });
    this.children.backButton = new Link({
      href: ROUTES.home.path,
      label: "",
    });
    this.children.imageAvatar = new Image({
      srcImg: API_RESOURCES_PATH + srcImage,
      alt: "avatar",
      class: "profile_avatar",
    });
    this.children.imageOverlay = new ImageOverlay({
      title: "change avaatar",
      class: "profile__avatar-overlay",
      events: {
        click: changeAvatar,
      },
    });
    this.children.inputEmail = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "email",
      type: "email",
      label: "Email",
      disabled: true,
      error: "",
      placeholder: "example",
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
      disabled: true,
      error: "",
      placeholder: "example",
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
      disabled: true,
      error: "",
      placeholder: "example",
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
      disabled: true,
      error: "",
      placeholder: "example",
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
      disabled: true,
      error: "",
      placeholder: "example",
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
      label: "Phone",
      disabled: true,
      error: "",
      placeholder: "example",
      value: value?.phone,
      events: {
        focusin,
        focusout,
      },
    });

    this.children.editDetailsLink = new Link({
      href: "./edit-details",
      label: "Edit details",
      className: "profile__button",
    });
    this.children.editPasswordLink = new Link({
      href: "./edit-password",
      label: "Edit password",
      className: "profile__button",
    });
    this.children.logOutLink = new Button({
      label: "Log out",
      classButton: "profile__button_log-out",
      events: {
        click: (event) => {
          event.preventDefault();
          AuthController.logout();
        },
      },
    });
  }

  protected async componentDidMount() {
    await this.updateProfile();
  }

  private async updateProfile() {
    await AuthController.getInfo();
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
    if (shouldUpdate) {
      const value = store.state.user;
      const srcImage = value && value.avatar ? value.avatar : imgAvatar;

      this.children.imageAvatar = new Image({
        srcImg: API_RESOURCES_PATH + srcImage,
        alt: "avatar",
        class: "profile_avatar",
      });
      this.children.imageOverlay = new ImageOverlay({
        title: "change avaatar",
        class: "profile__avatar-overlay",
        events: {
          click: changeAvatar,
        },
      });
    }
    return shouldUpdate;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({
  ...state.user,
  profileError: state.profileError,
}));

export default withUser(withRouter(ProfilePage));
