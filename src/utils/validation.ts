import { router } from "../core/router";
import { ROUTES } from "./constants";
import { closeModalHandler } from "./handlers";
import WebSocketController from "../api/controllers/webSocketController";
import { ChatController } from "../api/controllers/chatController";

interface Patterns {
  regExp: RegExp;
  errorMessage: string;
}

const validationInputs: Record<string, Patterns> = {
  first_name: {
    regExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
    errorMessage: "First capital letter, no gaps and numbers",
  },

  second_name: {
    regExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
    errorMessage: "First capital letter, no gaps and numbers",
  },

  email: {
    regExp: /^[A-Za-z0-9-]+@[A-Za-z]+(\.[A-Za-z]+)+$/,
    errorMessage: "Put correct email",
  },

  login: {
    regExp: /^(?!^\d+)[a-zA-Z0-9-_]{3,20}$/,
    errorMessage: "Login should be 3-20 symbols",
  },

  phone: {
    regExp: /^((8|\+7)[ -]?)?(\(?\d{3}\)?[ -]?)?[\d -]{10,15}$/,
    errorMessage: "Number should be 10-15 symbols",
  },

  password: {
    regExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage: "Password should be 8-40 symbols, capital letter and number",
  },

  chatId: {
    regExp: /^\d+$/,
    errorMessage: "Only symbols",
  },

  oldPassword: {
    regExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage: "Password should be 8-40 symbols, capital letter and number",
  },

  newPassword: {
    regExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage: "Password should be 8-40 symbols, capital letter and number",
  },

  NewPasswordAgain: {
    regExp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage: "Password should be 8-40 symbols, capital letter and number",
  },

  message: {
    regExp: /^.+$/,
    errorMessage: "Shouldn't be empty",
  },

  title: {
    regExp: /^.+$/,
    errorMessage: "Shouldn't be empty",
  },

  avatar: {
    regExp: /^.+$/,
    errorMessage: "Shouldn't be empty",
  },

  id: {
    regExp: /^.+$/,
    errorMessage: "Shouldn't be empty",
  },

  display_name: {
    regExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
    errorMessage: "First capital letter, no gaps and numbers",
  },
};

export const validationCheck = (event: InputEvent): void => {
  const targetInput = event.target as HTMLInputElement;
  const parent = targetInput.parentElement;
  const error = parent?.querySelector(".input_error");
  const nameInput = validationInputs[targetInput.name];
  const isValid = nameInput.regExp.test(targetInput.value);

  if (!isValid) {
    error!.textContent = nameInput.errorMessage;
  } else {
    error!.textContent = "";
  }
};

export const focusin = (event: InputEvent): void => {
  validationCheck(event);
};

export const focusout = (event: InputEvent): void => {
  validationCheck(event);
};

export const submit = async (params: {
  event: Event;
  handler: any;
  action?: () => void;
}) => {
  const { event, handler, action } = params;
  event.preventDefault();
  const formInputs = document.querySelectorAll<HTMLInputElement>("input");
  const data: Record<string, string> = {};

  formInputs.forEach((input: HTMLInputElement) => {
    const error = input.parentElement?.querySelector(".input_error");
    const currentValidationInput = validationInputs[input.name];
    const { regExp } = currentValidationInput;

    if (input.value === "" || !regExp.test(input.value)) {
      error!.textContent = currentValidationInput.errorMessage;
    } else {
      error!.textContent = "";
      data[input.name] = input.value;
    }
  });
  const result = await handler(data);
  if (result.status === 200) {
    if (action) {
      console.log("GO?", action);
      action();
    }
  } else if (result.status > 404) {
    router.go(ROUTES.error_500.path);
  } else {
    console.log(`Something wrong, error:`, result.status);
  }
};

export const submitFile = async (params: {
  event: Event;
  handler: any;
  action?: () => void;
}) => {
  const { event, handler, action } = params;
  event.preventDefault();
  const formInput = document.querySelector<HTMLInputElement>(".file-input");
  const file = new FormData();

  if (formInput && formInput.files) {
    file.append("avatar", formInput.files[0]);

    const result = await handler(file);
    if (result.status === 200) {
      if (action) {
        closeModalHandler();
        action();
      }
    } else if (result.status > 404) {
      router.go(ROUTES.error_500.path);
    } else {
      console.log(`Something wrong, error:`, result.status);
    }
  }
};

export const submitPopup = async (params: {
  event: Event;
  handler: any;
  action?: () => void;
}) => {
  const { event, handler, action } = params;
  event.preventDefault();
  const formInput = document.querySelector<HTMLInputElement>(".input");
  if (formInput) {
    const data: Record<string, string> = {};
    const error = formInput.parentElement?.querySelector(".input_error");
    const currentValidationInput = validationInputs[formInput.name];
    const { regExp } = currentValidationInput;

    if (formInput.value === "" || !regExp.test(formInput.value)) {
      error!.textContent = currentValidationInput.errorMessage;
    } else {
      error!.textContent = "";
      data[formInput.name] = formInput.value;
    }
    const result = await handler(data);
    if (result.status === 200) {
      if (action) {
        action();
      }
    } else if (result.status > 404) {
      router.go(ROUTES.error_500.path);
    } else {
      console.log(`Something wrong, error:`, result.status);
    }
  }
};

export const sendMessage = async (params: { event: Event; chatId: number }) => {
  const { event, chatId } = params;
  event.preventDefault();
  const data: Record<string, string> = {};
  const formInput = document.querySelector<HTMLInputElement>(
    ".user-chat__footer_input"
  );
  if (formInput) {
    if (formInput.value === "") {
      formInput.placeholder = "..oops!!";
    } else {
      data[formInput.name] = formInput.value;
    }
  }

  if (data.message) {
    await WebSocketController.send(data.message as string);

    ChatController.getChats();
    ChatController.getChatById(chatId);
  }
};
