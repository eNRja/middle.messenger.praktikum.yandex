import { BlockClass } from "../core/Block";
import { router } from "../core/router";
import { Router } from "../core/router/Router";

type WithRouterProps = { router: Router };

export function withRouter<P extends WithRouterProps>(
  WrappedBlock: BlockClass<P>
) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName =
      WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router: router });
    }
  } as BlockClass<Omit<P, "router">>;
}
