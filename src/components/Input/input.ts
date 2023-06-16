import Block from "../../utils/Block";
import template from "./input.hbs";
import "./input.pcss";

export interface InputProps {
  label?: string;
  type: string;
  value?: string;
  classInput?: string;
  classLabel?: string;
  classError?: string;
  placeholder?: string;
  error?: string;
  name?: string;
  disabled?: boolean;
  events?: Record<string, (e: InputEvent) => void>;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
