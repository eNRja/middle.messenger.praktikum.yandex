import { AuthController } from "../../api/controllers/authController";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input/input";
import { Link } from "../../components/Link/link";
import Block from "../../core/Block";
import { ROUTES } from "../../utils/constants";
import { focusin, focusout, submit } from "../../utils/validation";
import { withRouter } from "../../hocs/withRouter";
import template from "./login.hbs";
import { router } from "../../core/router";
import { withStore } from "../../hocs/withStore";

interface ILogin {}

class LoginPage extends Block {
  constructor(props: ILogin) {
    super(props);
  }

  protected init(): void {
    this.children.inputLogin = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "login",
      type: "text",
      label: "login",
      placeholder: "example",
      error: "",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputPassword = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "password",
      label: "password",
      error: "",
      placeholder: "example",
      type: "password",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.loginButton = new Button({
      label: "Sign in",
      classButton: "submit__button",
      typeButton: "submit",
      events: {
        click: (event) => {
          submit({
            event,
            handler: AuthController.signIn,
            action: () => router.go(ROUTES.home.path),
          });
        },
      },
    });
    this.children.registrationLink = new Link({
      href: "./registration",
      label: "Have no account?",
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withAuthError = withStore((state) => ({
  user: state.user,
  authError: state.authError,
}));

export default withAuthError(withRouter(LoginPage));
