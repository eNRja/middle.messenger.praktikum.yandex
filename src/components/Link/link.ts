import Block from "../../core/Block";
import template from "./link.hbs";
import Image from "../../components/Image";
import imgPlus from "../../asserts/Polygon_1.png";

import "./link.pcss";

interface LinkProps {
  label: string;
  className?: string;
  isProfileImg?: boolean;
  events?: Record<string, (e: InputEvent) => void>;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

  init() {
    this.children.imageNext = new Image({
      srcImg: imgPlus,
      class: "image-next",
      alt: "next",
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
