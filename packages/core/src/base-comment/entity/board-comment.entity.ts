import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from "typeorm";
// Update the import path below to the correct location of base.entity.ts
import { BaseCommentModel } from "./base-comment-model.entity";
import { BoardPost } from "@_core/base-post/entity/board-post.entity";

@Entity()
export class BoardComment extends BaseCommentModel {
  //TODO: 댓글 이미지 첨부

  @ManyToOne(() => BoardPost, (boardPost) => boardPost.comments)
  @JoinColumn({ name: "post_id" })
  boardPost: BoardPost;
}
