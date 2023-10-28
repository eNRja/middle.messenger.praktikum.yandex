import Handlebars from "handlebars";

interface Props {
  events?: Record<string, (e: Event) => void>;
}

import { expect } from "chai";
import { Router } from "./Router";
import Block from "../Block";
import sinon from "sinon";

describe("Проверяем роутер", () => {
  let FirstPage: typeof Block<Props>;
  let SecondPage: typeof Block<Props>;
  let router: Router;

  before(() => {
    class ComponentClass extends Block {
      public static Name = "TestComponent";
      constructor(props: Props) {
        super(props);
      }
      protected render() {
        const source = `<div>Test</div>`;
        const template = Handlebars.compile(source);
        return this.compile(template, this.props);
      }
    }
    FirstPage = ComponentClass;
    SecondPage = ComponentClass;

    router = new Router("#test");
  });

  it("Должна быть возможность установить роуты в роутер", () => {
    const useSpy = sinon.spy(router, "use");
    router
      .use({
        pathname: "/",
        block: FirstPage,
        redirectPath: "",
      })
      .use({
        pathname: "/second",
        block: SecondPage,
        redirectPath: "",
      });
    expect(useSpy.called).to.be.true;
  });

  it("Должна быть возможность получать установленные роуты", () => {
    const route = router.getRoute("/second");
    expect(route).to.not.undefined;
  });

  it("Роутер должен успешно запускаться", () => {
    const onrouteStub = sinon.stub();
    router._onRoute = onrouteStub;
    router.start();
    expect(onrouteStub.calledOnce).to.be.true;
  });

  it("Роутер должен переходить по заданному URL", () => {
    const windowPushStateSpy = sinon.spy(window.history, "pushState");

    router.go("/second");

    expect(windowPushStateSpy.calledOnce).to.be.eq(true);
    expect(window.location.href).to.eq("http://jsdom/second");
  });

  it("Роутер должен уметь переходить назад", () => {
    const backSpy = sinon.spy(window.history, "back");

    router.back();

    expect(backSpy.calledOnce).to.be.true;
  });

  it("Роутер должен уметь переходить вперед", () => {
    const forwardSpy = sinon.spy(window.history, "forward");
    router.forward();
    expect(forwardSpy.called).to.be.true;
  });
});
