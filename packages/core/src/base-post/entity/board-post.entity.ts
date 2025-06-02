import { BaseModel } from "@_core/base-common/entity/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BoardConfig } from "@_core/base-board/entity/board-config";
import { IsNumber, IsString } from "class-validator";
import { BoardComment } from "@_core/base-comment/entity/board-comment.entity";

@Entity()
export class BoardPost extends BaseModel {
  // 작성자 ID
  // TODO: 인증 작업 완료시 유저 ID 추가

  // (비회원) 작성자 닉네임
  @IsString()
  @Column({ type: "varchar", length: 20, nullable: true })
  guest_author_id?: string;

  // (비회원) 작성자 패스워드
  // FIXME: 일단 비암호화 상태로 작업, 추후 변경
  @IsString()
  @Column({ type: "varchar", length: 20, nullable: true })
  guest_author_password?: string;

  // 제목
  @IsString()
  @Column({ type: "varchar", length: 50 })
  title: string;

  // 내용
  @IsString()
  @Column({ type: "text" })
  content: string;

  // 조회수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  view_count: number = 0;

  // 댓글 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  comment_count: number;

  // 좋아요 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  like_count: number;

  @ManyToOne(() => BoardConfig, (boardConfig) => boardConfig.boardPosts)
  @JoinColumn({ name: "board_id" })
  boardConfig: BoardConfig;

  @OneToMany(() => BoardComment, (BoardComment) => BoardComment.boardPost)
  comments: BoardComment[];
}
