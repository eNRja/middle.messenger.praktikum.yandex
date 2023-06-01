import Block from "../../utils/Block";
import template from "./home.hbs";
import ListColumn from "../../partials/list-column";
import UserChat from "../../partials/user-chat";

interface HomePageProps {}

export class HomePage extends Block {
  constructor(props: HomePageProps) {
    super(props);
  }

  init() {
    this.children.listColumn = new ListColumn({
      title: "Hello!",
    });

    this.children.userChat = new UserChat({
      title: "Hello!",
    });
  }

  render() {
    return this.compile(template, {});
  }
}
