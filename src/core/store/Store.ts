import { EventBus } from "../EventBus";

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any
) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: any
) => void;

export enum StoreEvents {
  Updated = "changed",
}

export class Store<State extends Record<string, any>> extends EventBus {
  clear() {
    throw new Error("Method not implemented.");
  }
  public state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit("changed", prevState, nextState);
  }

  public delete(value: string | string[]) {
    if (value instanceof Array) {
      value.forEach((item) => {
        if (item in this.state) {
          delete this.state[`${item}`];
        }
      });
    } else if (value in this.state) {
      delete this.state[`${value}`];
    }

    // метод EventBus
    this.emit("changed", { ...this.state });
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}
