import { Module } from "@nestjs/common";
import { BaseBoardService } from "./board.service";
import { BaseBoardController } from "./board.controller";

@Module({
  controllers: [BaseBoardController],
  exports: [BaseBoardService],
  providers: [BaseBoardService],
})
export class BaseBoardModule {}
