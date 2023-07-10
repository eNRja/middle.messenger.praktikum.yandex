import Block from "../../core/Block";
import Image from "../../components/Image";
import imgTest from "../../asserts/test_picture.png";
import imgDeliveryMessage from "../../asserts/delivery_message.png";
import template from "./messages.hbs";
import { store } from "../../core/store";

interface MessageProps {
  chatId: number;
  content: string;
  file: {
    id: number;
    userId: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  } | null;
  id: number;
  isRead: boolean;
  time: string;
  date?: string | false;
  type: string;
  userId: number;
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  init() {
    this.props.user =
      this.props.userId === (store.state.user && store.state.user.id);
    this.children.imageTest = new Image({
      srcImg: imgTest,
      alt: "test",
    });
    this.children.imageDeliveryMessage = new Image({
      srcImg: imgDeliveryMessage,
      alt: "delivery_message",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
