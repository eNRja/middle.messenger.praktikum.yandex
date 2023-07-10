import Block from "../../core/Block";
import template from "./imageOverlay.hbs";

interface ImageOverlayProps {
  title: string;
  class: string;
  events?: Record<string, (e: MouseEvent) => void>;
}

export class ImageOverlay extends Block {
  constructor(props: ImageOverlayProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
