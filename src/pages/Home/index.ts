import Block from "../../core/Block";
import template from "./home.hbs";
import ListColumn from "../../partials/list-column";
import { withStore } from "../../hocs/withStore";
import { withRouter } from "../../hocs/withRouter";
import { AuthController } from "../../api/controllers/authController";
import { ChatController } from "../../api/controllers/chatController";
import UserChat from "../../partials/user-chat";

interface HomePageProps {}

class HomePage extends Block {
  constructor(props: HomePageProps) {
    super(props);
  }

  init() {
    this.children.listColumn = new ListColumn({});
    this.children.userChat = new UserChat({});
  }

  protected async componentDidMount() {
    await this.updateChats();
  }

  private async updateChats() {
    await AuthController.getInfo();
    await ChatController.getChats();
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    const shouldUpdate = super.componentDidUpdate(oldProps, newProps);

    if (shouldUpdate) {
      this.children.listColumn = new ListColumn({});
      this.children.userChat = new UserChat({});
    }

    return shouldUpdate;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
  chatsError: state.chatsError,
  userLogin: state.user?.login,
  activeChat: state.activeChat,
  messages: state.messages,
}));

export default withChats(withRouter(HomePage));
