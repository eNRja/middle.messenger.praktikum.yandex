import Block from "../../utils/Block";
import template from "./button.hbs";

interface ButtonProps {
  label: string;
  classButton: string;
  typeButton?: string;
  events?: Record<string, (e: InputEvent) => void>;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
