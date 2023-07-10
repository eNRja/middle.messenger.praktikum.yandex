import { Button } from "../../components/Button";
import { Input } from "../../components/Input/input";
import Block from "../../core/Block";
import { focusin, focusout } from "../../utils/validation";
import { withRouter } from "../../hocs/withRouter";
import template from "./add-user.hbs";

interface IAddUserPage {}

export class AddUserPage extends Block {
  constructor(props: IAddUserPage) {
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
    this.children.addButton = new Button({
      label: "Add",
      classButton: "submit__button",
      typeButton: "submit",
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withRouter(AddUserPage);
