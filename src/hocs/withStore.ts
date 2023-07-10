import Block from "../core/Block";
import { AppState, store } from "../core/store";
import { StoreEvents } from "../core/store/Store";

export function withStore<SP>(mapStateToProps: (state: AppState) => SP) {
  return function wrap<P>(Component: typeof Block<any>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());
        super({ ...(props as P), ...previousState });
        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          previousState = stateProps;
          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
