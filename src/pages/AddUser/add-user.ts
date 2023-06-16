import { Button } from "../../components/Button";
import { Input, InputProps } from "../../components/Input/input";
import Block from "../../utils/Block";
import { focusin, focusout, submit } from "../../utils/validation";
import template from "./add-user.hbs";

interface IAddUserPage {}

export class AddUserPage extends Block {
  constructor(props: IAddUserPage) {
    super(props);
  }

  protected init(): void {
    this.children.fields = this.props.inputs.map(
      (props: InputProps) => new Input(props)
    );

    this.children.inputLogin = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "login",
      type: "text",
      label: "login",
      error: "",
      value: this.props.login,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.addButton = new Button({
      label: "Add",
      classButton: "submit__button",
      typeButton: "submit",
      events: { click: submit },
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
