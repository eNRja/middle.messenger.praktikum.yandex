import { Button } from "../../components/Button";
import { Link } from "../../components/Link/link";
import Block from "../../utils/Block";
import { submit } from "../../utils/validation";
import template from "./load-file.hbs";

interface ILoadFile {}

export class LoadFilePage extends Block {
  constructor(props: ILoadFile) {
    super(props);
  }

  protected init(): void {
    this.children.selectFileLink = new Link({
      href: "./",
      label: "Select file on computer",
      className: "popup__secondary-button",
    });
    this.children.changeButton = new Button({
      label: "Change",
      classButton: "submit__button",
      typeButton: "submit",
      events: { click: submit },
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
