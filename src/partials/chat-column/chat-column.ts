import Block from "../../core/Block";
import template from "./chat-column.hbs";
import Image from "../../components/Image";
import imgEllipse from "../../asserts/Ellipse.png";
import { store } from "../../core/store";
import { API_RESOURCES_PATH } from "../../utils/constants";

export interface ChatColumnProps {
  avatar: null | string;
  created_by: number;
  id: number;
  // isYou: string;
  last_message: null | string;
  title: string;
  unread_count: number | null;
  time: string | null;
  events?: Record<string, (e: InputEvent) => void>;
}

export class ChatColumn extends Block {
  constructor(props: ChatColumnProps) {
    super(props);
  }

  init() {
    const srcImage = this.props.avatar
      ? API_RESOURCES_PATH + this.props.avatar
      : imgEllipse;


    // this.props.isYou = this.props.message_user === store.state.user ? "Вы: " : ""
    this.props.active = store.state.activeChat.id === this.props.id;
    this.children.imageAvatar = new Image({
      class: "chat-column__image",
      srcImg: srcImage,
      alt: "avatar",
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
