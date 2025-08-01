import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardConfig } from "./entity/board-config.entity";
import { QueryRunner, Repository } from "typeorm";
import { BoardStatus } from "./enum/board-config.enum";
import { CreateBoardConfigDto } from "./dto/create-board-config.dto";
import { ChannelConfig } from "@base-channel/entity/channel-config.entity";
import { CommonTransactionService } from "@base-common/service/common-transaction.service";
import { BoardCategory } from "./entity/board-category.entity";
import { BoardCategoryStatus } from "./enum/board-category.enum";

@Injectable()
export class BaseBoardService {
  constructor(
    @InjectRepository(BoardConfig)
    private readonly boardConfigRepository: Repository<BoardConfig>,
    @InjectRepository(ChannelConfig)
    private readonly channelConfigRepository: Repository<ChannelConfig>,
    @InjectRepository(BoardCategory)
    private readonly boardCategoryRepository: Repository<BoardCategory>,
    private readonly commonTransactionService: CommonTransactionService
  ) {}

  async getBoardConfig() {
    try {
      return await this.boardConfigRepository.find({
        where: { status: BoardStatus.ACTIVE },
        relations: ["channel", "categories"],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        "게시판 설정을 불러오는 중 오류가 발생했습니다."
      );
    }
  }

  async saveBoardConfig(
    channel_id: number,
    dto: CreateBoardConfigDto,
    qr?: QueryRunner
  ) {
    const channel = await this.channelConfigRepository.findOne({
      where: { id: channel_id },
    });

    if (!channel) {
      throw new ConflictException(
        "해당 채널이 존재하지 않으므로 게시판을 생성할 수 없습니다."
      );
    }

    const boardConfig = this.boardConfigRepository.create(dto);
    boardConfig.channel = channel;

    try {
      const manager =
        this.commonTransactionService.getManagerRepository<BoardConfig>(
          BoardConfig,
          this.boardConfigRepository,
          qr
        );
      const result = await manager.save(boardConfig);

      // 카테고리 배열을 한번에 저장
      const categoryManager =
        this.commonTransactionService.getManagerRepository<BoardCategory>(
          BoardCategory,
          this.boardCategoryRepository,
          qr
        );

      const categories = [
        {
          name: "잡담",
          order: 1,
          status: BoardCategoryStatus.ACTIVE,
          boardConfig: { id: result.id },
        },
        {
          name: "질문",
          order: 2,
          status: BoardCategoryStatus.ACTIVE,
          boardConfig: { id: result.id },
        },
        {
          name: "기타",
          order: 3,
          status: BoardCategoryStatus.ACTIVE,
          boardConfig: { id: result.id },
        },
      ].map((data) => this.boardCategoryRepository.create(data));

      await categoryManager.save(categories);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
