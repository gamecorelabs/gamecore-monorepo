import { Injectable } from "@nestjs/common";
import { BaseModel } from "../entity/base.entity";
import { QueryRunner, Repository } from "typeorm";

@Injectable()
export class CommonTransactionService {
  getManagerRepository<T extends BaseModel>(
    entity: new () => T,
    repository: Repository<T>,
    qr?: QueryRunner
  ): Repository<T> {
    return qr ? qr.manager.getRepository<T>(entity) : repository;
  }
}
