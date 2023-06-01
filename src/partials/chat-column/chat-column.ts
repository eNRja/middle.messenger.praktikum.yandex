import Block from "../../utils/Block";
import template from "./chat-column.hbs";
import Image from "../../components/Image";
import imgEllipse from "../../asserts/Ellipse.png"

export interface ChatColumnProps {}

export class ChatColumn extends Block {
  constructor(props: ChatColumnProps) {
    super(props);
  }

  init() {
    this.children.imageAvatar = new Image({
      class: "chat-column__image",
      srcImg: imgEllipse,
      alt: "default",
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
