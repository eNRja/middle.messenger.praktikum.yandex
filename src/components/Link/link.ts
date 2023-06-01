import Block from "../../utils/Block";
import template from "./link.hbs";

import "./link.pcss";

interface LinkProps {
  href: string;
  label: string;
  className?: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
