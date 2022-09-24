export const maxLengthCreator = (maxLength) => (value) => {
  if (value && value.length > maxLength) {
    return `Поле должно содержать максимум ${maxLength} символов`;
  }
};
export const required = (value) => {
  if (!value) {
    return "Обязательное поле";
  }
};
