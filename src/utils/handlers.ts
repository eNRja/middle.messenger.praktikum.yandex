import Modal from "../components/Modal";
import { renderDOM } from "../core";
import { IModal } from "../types";

export const closeModalHandler = () => {
  const modalRoot = document.getElementById("modal");
  if (modalRoot) {
    modalRoot.textContent = "";
  }
};

export const openModal = (props: IModal) => {
  const modal = new Modal(props);
  renderDOM(modal, "#modal");
  modal.show();
};

export const findModalInputHandler = () => {
  const modalinput: any = document.querySelector("#modal__action_input");
  if (modalinput) {
    return modalinput.value;
  }
};

export const getTime = (data: string): string => {
  const date = new Date(data);
  const minutes = date.getMinutes();
  const hours = date.getHours();
  return (
    data &&
    `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`
  );
};

export function prettyDate(time: string) {
  const date = new Date(
      (time.split("+")[0] || "").replace(/-/g, "/").replace(/[TZ]/g, " ")
    ),
    diff = (new Date().getTime() - date.getTime()) / 1000,
    day_diff = Math.floor(diff / 86400);

  let month;

  if (date.getMonth() === 0) {
    month = "January";
  } else if (date.getMonth() === 1) {
    month = "February";
  } else if (date.getMonth() === 2) {
    month = "March";
  } else if (date.getMonth() === 3) {
    month = "April";
  } else if (date.getMonth() === 4) {
    month = "May";
  } else if (date.getMonth() === 5) {
    month = "June";
  } else if (date.getMonth() === 6) {
    month = "July";
  } else if (date.getMonth() === 7) {
    month = "August";
  } else if (date.getMonth() === 8) {
    month = "September";
  } else if (date.getMonth() === 9) {
    month = "October";
  } else if (date.getMonth() === 10) {
    month = "November";
  } else if (date.getMonth() === 11) {
    month = "December";
  }

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  return (
    (day_diff == 0 && "Today") ||
    (day_diff == 1 && "Yesterday") ||
    `${month} ${date.getDate()}`
  );
}

export const isEmpty = (obj: Object) => {
  for (var key in obj) {
    console.log(key);
    return false;
  }
  return true;
};
