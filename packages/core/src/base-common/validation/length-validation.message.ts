import { ValidationArguments } from "class-validator";

export const lengthValidationMessage = (args: ValidationArguments) => {
  if (args.constraints.length === 2) {
    return `${args.property}은 ${args.constraints[0]}자 이상 ${args.constraints[1]}자 이하로 입력해주세요.`;
  } else {
    return `${args.property}은 ${args.constraints[0]}자 이상으로 입력해주세요.`;
  }
};
