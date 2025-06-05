import { ValidationArguments } from "class-validator";

export const stringValidationMessage = (args: ValidationArguments) => {
  return `${args.property}는 String 타입으로 입력해주세요.`;
};
