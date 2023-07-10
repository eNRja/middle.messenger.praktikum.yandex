import { Button } from "../../components/Button";
import { Input } from "../../components/Input/input";
import Block from "../../core/Block";
import { focusin, focusout } from "../../utils/validation";
import { withRouter } from "../../hocs/withRouter";
import template from "./delete-user.hbs";

interface IDeleteUser {}

export class DeleteUserPage extends Block {
  constructor(props: IDeleteUser) {
    super(props);
  }

  protected init(): void {
    this.children.inputLogin = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "login",
      type: "text",
      label: "login",
      error: "",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.deleteButton = new Button({
      label: "Delete",
      classButton: "submit__button",
      typeButton: "submit",
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withRouter(DeleteUserPage);
