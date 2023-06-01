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

  chat_name: {
    regExp: /^[А-ЯA-Z]{1}[а-яa-z-]*$/,
    errorMessage: "First capital letter, no gaps and numbers",
  },
};

const validationCheck = (event: InputEvent): void => {
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

export const submit = (event: Event): void => {
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
};
