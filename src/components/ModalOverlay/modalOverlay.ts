import { Block } from "../../core";
import template from "./modalOverlay.hbs";

interface IModalOverlay {
  events: Record<string, (e: InputEvent) => void>;
}

export class ModalOverlay extends Block {
  constructor(props: IModalOverlay) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
