import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import {
  BaseCommentModel,
  CommentStatus,
  ResourceType,
} from "./entity/base-comment-model.entity";

@Injectable()
export class BaseCommentService {
  constructor(
    @InjectRepository(BaseCommentModel)
    private readonly commentRepository: Repository<BaseCommentModel>
  ) {}

  async saveComment(dto: CreateCommentDto): Promise<BaseCommentModel> {
    const comment = this.commentRepository.create(dto);
    return this.commentRepository.save(comment);
  }

  // 특정 리소스의 댓글 조회
  async getCommentsByResource(
    resource_type: ResourceType,
    resource_id: number
  ): Promise<BaseCommentModel[]> {
    return this.commentRepository.find({
      where: {
        resource_type,
        resource_id,
      },
      relations: ["parent", "children"],
      order: { created_at: "DESC" },
    });
  }

  // 댓글 단일 조회
  async getCommentById(id: number): Promise<BaseCommentModel> {
    const data = await this.commentRepository.findOne({
      where: { id },
      relations: ["parent", "children"],
    });

    if (!data) {
      throw new ConflictException("Comment not found");
    }

    return data;
  }

  // 댓글 수정
  async updateComment(
    id: number,
    dto: UpdateCommentDto
  ): Promise<BaseCommentModel> {
    await this.commentRepository.update(id, dto);
    return this.getCommentById(id);
  }

  // 댓글 삭제 (논리적 삭제)
  async deleteComment(id: number): Promise<void> {
    await this.commentRepository.update(id, { status: CommentStatus.DELETED });
  }

  // 대댓글 생성
  async createReply(
    parentId: number,
    dto: CreateCommentDto
  ): Promise<BaseCommentModel> {
    const parent = await this.getCommentById(parentId);
    if (!parent) {
      throw new Error("Parent comment not found");
    }

    const reply = this.commentRepository.create({
      ...dto,
      parent,
    });

    return this.commentRepository.save(reply);
  }
}
