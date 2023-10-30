import { expect } from "chai";
import Block from "../Block";
import * as sinon from "sinon";
const Handlebars = require("handlebars");

interface Props {
  text?: string;
  events?: Record<string, () => void>;
}

describe("Block", () => {
  let PageClass: typeof Block<Props>;

  before(() => {
    class Page extends Block<Props> {
      constructor(props: Props) {
        super(props);
      }

      protected render() {
        const source = `<div>
        <span id="test-text">{{text}}</span>
        <button>{{text-button}}</button>
      </div>`;
        const template = Handlebars.compile(source);
        return this.compile(template, this.props);
      }
    }
    PageClass = Page;
  });

  // тест на создание компонента с переданными пропсами
  it("Должен создать компонент с состоянием из конструктора", () => {
    const text = "Hello";
    const pageComponent = new PageClass({ text: text });
    const spanText =
      pageComponent.element?.querySelector("#test-text")?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  // проверка реактивности компонента
  it("Компонент должен иметь реактивное поведение", () => {
    const text = "new value";
    const pageComponent = new PageClass({ text: "Hello" });
    pageComponent.setProps({ text });
    const spanText =
      pageComponent.element?.querySelector("#test-text")?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  // проверка на навешивание события
  it("Компонент должен установить события на элемент", () => {
    const handlerStub = sinon.stub();
    const pageComponent = new PageClass({ events: { click: handlerStub } });

    const event = new MouseEvent("click");
    pageComponent.element?.dispatchEvent(event);

    expect(handlerStub.calledOnce).to.be.true;
  });

  it("Компонент должен вызвать метод componentWillUnmount после вызова dispatchComponentWillUnmount", () => {
    const pageComponent = new PageClass({});
    const spyCDM = sinon.spy(pageComponent, "componentWillUnmount");

    pageComponent.componentWillUnmount();

    expect(spyCDM.calledOnce).to.be.true;
  });
});
