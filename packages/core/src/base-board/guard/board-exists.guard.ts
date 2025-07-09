// packages/core/src/base-post/board/guard/post-in-board.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardConfig } from "@gamecoregg/nestjs-core/base-board/entity/board-config.entity";
import { BoardStatus } from "@gamecoregg/nestjs-core/base-board/enum/board-config.enum";

@Injectable()
export class BoardExistsGuard implements CanActivate {
  constructor(
    @InjectRepository(BoardConfig)
    private readonly boardConfigRepository: Repository<BoardConfig>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const boardId = request.params.id;

    if (!boardId) {
      throw new BadRequestException("알 수 없는 게시판 번호입니다.");
    }

    // 게시판에 속한 게시물인지 확인
    const boardConfig = await this.boardConfigRepository.findOne({
      where: {
        id: boardId,
      },
    });

    if (!boardConfig) {
      throw new NotFoundException(`존재하지 않는 게시판입니다.`);
    }

    if (boardConfig.status !== BoardStatus.ACTIVE) {
      throw new NotFoundException(`더이상 이용할 수 없는 게시판입니다.`);
    }

    request.boardConfig = boardConfig;
    return true;
  }
}
