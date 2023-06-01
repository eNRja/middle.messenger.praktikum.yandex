import Input from "../../components/Input";
import Block from "../../utils/Block";
import template from "./user-chat.hbs";
import Image from "../../components/Image";
import imgEllipse from "../../asserts/Ellipse.png";
import imgAdd from "../../asserts/add.svg";
import imgDelete from "../../asserts/delete.svg";
import imgTest from "../../asserts/test_picture.png";
import imgDeliveryMessage from "../../asserts/delivery_message.png";
import imgVideo from "../../asserts/photo_video.svg";
import imgFile from "../../asserts/file.svg";
import imgLocation from "../../asserts/location.svg";
import { Button } from "../../components/Button";
import { focusin, focusout, submit } from "../../utils/validation";

interface UserChatProps {}

export class UserChat extends Block {
  constructor(props: UserChatProps) {
    super(props);
  }

  init() {
    //Images
    this.children.imageAvatar = new Image({
      class: "user-chat__header_avatar",
      srcImg: imgEllipse,
      alt: "avatar",
      name: "avatar",
    });
    this.children.imageAdd = new Image({
      srcImg: imgAdd,
      alt: "add",
    });
    this.children.imageDelete = new Image({
      srcImg: imgDelete,
      alt: "delete",
    });
    this.children.imageTest = new Image({
      srcImg: imgTest,
      alt: "test",
    });
    this.children.imageDeliveryMessage = new Image({
      srcImg: imgDeliveryMessage,
      alt: "delivery_message",
    });
    this.children.imageVideo = new Image({
      srcImg: imgVideo,
      alt: "video",
    });
    this.children.imageFile = new Image({
      srcImg: imgFile,
      alt: "file",
    });
    this.children.imageLocation = new Image({
      srcImg: imgLocation,
      alt: "location",
    });

    this.children.inputMessage = new Input({
      classInput: "user-chat__footer_input",
      classLabel: "user-chat__footer_label",
      name: "message",
      label: "",
      value: "",
      error: "",
      type: "text",
      placeholder: "Write a message...",
      events: {
        focusin,
        focusout,
      },
    });
    // this.children.inputMessage = new Input({
    //   classInput: "input",
    //   classLabel: "form_text",
    //   name: "login",
    //   type: "text",
    //   label: "login",
    //   placeholder: "example",
    //   error: "",
    //   value: this.props.message,
    //   events: {
    //     focusin,
    //     focusout,
    //   },
    // });
    this.children.sendButton = new Button({
      label: "",
      classButton: "user-chat__footer_send-button",
      typeButton: "submit",
      events: { click: submit },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
