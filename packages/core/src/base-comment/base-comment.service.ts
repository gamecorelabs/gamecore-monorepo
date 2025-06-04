import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entity/base-comment-model.entity";

import {
  ResourceType,
  CommentStatus,
} from "@_core/base-comment/enum/comment.enum";

@Injectable()
export class BaseCommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async saveComment(dto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(dto);
    return this.commentRepository.save(comment);
  }

  // 특정 리소스의 댓글 조회
  async getCommentsByResource(
    resource_type: ResourceType,
    resource_id: number
  ): Promise<Comment[]> {
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
  async getCommentById(id: number): Promise<Comment> {
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
  async updateComment(id: number, dto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepository.update(id, dto);
    return this.getCommentById(id);
  }

  // 댓글 삭제 (논리적 삭제)
  async deleteComment(id: number): Promise<void> {
    await this.commentRepository.update(id, { status: CommentStatus.DELETED });
  }

  // 대댓글 생성
  async createReply(parentId: number, dto: CreateCommentDto): Promise<Comment> {
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
