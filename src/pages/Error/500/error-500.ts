import Link from "../../../components/Link";
import Block from "../../../utils/Block";
import template from "./error-500.hbs";

interface IError {}

export class Error500Page extends Block {
  constructor(props: IError) {
    super(props);
  }

  protected init(): void {
    this.children.homeLink = new Link({
      href: "./",
      label: "Home",
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
