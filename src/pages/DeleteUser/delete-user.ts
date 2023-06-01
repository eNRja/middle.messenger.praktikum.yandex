import { Button } from "../../components/Button";
import { Input, InputProps } from "../../components/Input/input";
import Block from "../../utils/Block";
import { focusin, focusout, submit } from "../../utils/validation";
import template from "./delete-user.hbs";

interface IDeleteUser {}

export class DeleteUserPage extends Block {
  constructor(props: IDeleteUser) {
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
    this.children.deleteButton = new Button({
      label: "Delete",
      classButton: "submit__button",
      typeButton: "submit",
      events: { click: submit },
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
