// import { Input } from "../../components/Input/input";
import Block from "../../utils/Block";
import template from "./list-column.hbs";
import Image from "../../components/Image";
import imgPlus from "../../asserts/Polygon_1.png";
import Input from "../../components/Input";
import ChatColumn from "../chat-column";
import { focusin, focusout } from "../../utils/validation";

interface ListColumnProps {
  title: string;
}

export class ListColumn extends Block {
  constructor(props: ListColumnProps) {
    super(props);
  }

  init() {
    this.children.imageNext = new Image({
      srcImg: imgPlus,
      alt: "next",
    });

    this.children.inputSearch = new Input({
      classInput: "list-column__input",
      name: "message",
      label: "",
      value: "",
      error: "",
      type: "text",
      placeholder: "search",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.chatColumn_1 = new ChatColumn({});
    this.children.chatColumn_2 = new ChatColumn({});
    this.children.chatColumn_3 = new ChatColumn({});
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
