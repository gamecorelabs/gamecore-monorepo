import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from "@nestjs/common";

export const CurrentQueryRunner = createParamDecorator(
  (data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    if (!req.queryRunner) {
      throw new InternalServerErrorException(
        `QueryRunner 데코레이터는 TransactionInterceptor와 함께 사용해야 합니다.`
      );
    }

    return req.queryRunner;
  }
);
