import { IsString } from "class-validator";
import { Exclude } from "class-transformer";
import { Column } from "typeorm";

/**
 * 같은 기능에 resource가 구분되는 경우에 사용되는 공용 embeddable 클래스
 * 댓글, 좋아요 (게시판, 댓글 등)
 */
export class GuestAccount {
  // (비회원) 작성자 닉네임
  @IsString()
  @Column({ type: "varchar", length: 20, nullable: true })
  guestAuthorId?: string;

  // (비회원) 작성자 패스워드
  @IsString()
  @Exclude({
    toPlainOnly: true, // 응답에서만 제외
  })
  @Column({ type: "varchar", length: 200, nullable: true })
  guestAuthorPassword?: string;
}
