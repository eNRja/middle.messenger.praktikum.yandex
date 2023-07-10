import { UserController } from "../../api/controllers/userController";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import Block from "../../core/Block";
import { ROUTES } from "../../utils/constants";
import { submitFile } from "../../utils/validation";
import { withRouter } from "../../hocs/withRouter";
import template from "./load-file.hbs";
import { router } from "../../core/router";

interface ILoadFile {}

export class LoadFilePage extends Block {
  constructor(props: ILoadFile) {
    super(props);
  }

  protected init(): void {
    this.children.selectFileInput = new Input({
      classInput: "file-input",
      name: "avatar",
      label: "avatar",
      type: "file",
      error: "",
    });

    this.children.changeButton = new Button({
      label: "Change",
      classButton: "submit__button",
      typeButton: "submit",
      events: {
        click: (event) => {
          submitFile({
            event,
            handler: UserController.changeAvatar,
            action: () => router.go(ROUTES.home.path),
          });
        },
      },
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withRouter(LoadFilePage);
