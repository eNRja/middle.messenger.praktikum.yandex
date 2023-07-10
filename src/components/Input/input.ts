import Block from "../../core/Block";
import template from "./input.hbs";
import "./input.pcss";

export interface InputProps {
  label?: string;
  type: string;
  value?: string | number;
  classInput?: string;
  classLabel?: string;
  classError?: string;
  placeholder?: string;
  error?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  events?: Record<string, (e: InputEvent) => void>;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  protected init(): void {
    this.props.file = this.props.type === "file" ? false : true;
    this.props.fileLabel = "Choose file on your computer";
  }

  render() {
    return this.compile(template, this.props);
  }
}
