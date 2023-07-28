import Link from "../../../components/Link";
import Block from "../../../core/Block";
import { router } from "../../../core/router";
import { withRouter } from "../../../hocs/withRouter";
import template from "./error-404.hbs";

interface IError {}

export class Error404Page extends Block {
  constructor(props: IError) {
    super(props);
  }

  protected init(): void {
    this.children.homeLink = new Link({
      label: "Home",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/messenger");
        },
      },
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withRouter(Error404Page);
