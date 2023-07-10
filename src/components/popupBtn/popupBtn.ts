import { Block } from "../../core";
import Image from "../Image";
import template from "./popupBtn.hbs";

interface IPopupBtn {
  src: string;
  alt: string;
  title?: string;
  divClass?: string;
  class?: string;
  events: Record<string, (e: InputEvent) => void>;
}

export class PopupBtn extends Block {
  constructor(props: IPopupBtn) {
    super(props);
  }

  protected init(): void {
    this.children.image = new Image({
      srcImg: this.props.src,
      alt: this.props.alt,
      class: this.props.class,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
