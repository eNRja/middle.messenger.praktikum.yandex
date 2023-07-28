import Block from "../../core/Block";
import template from "./title.hbs";

import "./title.pcss";

interface TitleProps {
  titleName?: string;
}

export class Title extends Block {
  constructor(props: TitleProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
