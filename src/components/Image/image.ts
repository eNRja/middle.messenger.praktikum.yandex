import Block from "../../utils/Block";
import template from "./image.hbs";

interface ImageProps {
  srcImg: string;
  class?: string;
  alt: string;
  name?: string;
  width?: string;
  height?: string;
  events?: Record<string, (e: MouseEvent) => void>;
}

export class Image extends Block {
  constructor(props: ImageProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
