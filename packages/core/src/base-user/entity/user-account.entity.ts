import { IsEmail, IsString, Length } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "@base-common/entity/base.entity";
import { BoardPost } from "@base-post/board/entity/board-post.entity";
import { stringValidationMessage } from "@base-common/validation/string-validation-mesage";
import { emailValidationMessage } from "@base-common/validation/email-validation.message";
import { lengthValidationMessage } from "@base-common/validation/length-validation.message";
import { ProviderType, UserGrade, UserRoles } from "../enum/user.enum";
import { Exclude } from "class-transformer";
import { Comment } from "@base-comment/entity/comment.entity";

@Entity()
export class UserAccount extends BaseModel {
  @Column({
    length: 20,
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @Length(2, 20, {
    message: lengthValidationMessage,
  })
  nickname: string;

  @Column({
    type: "enum",
    enum: ProviderType,
    default: null,
  })
  providerType?: ProviderType; // 소셜 로그인 제공자 타입 (예: GOOGLE, KAKAO 등)

  @Column({ nullable: true })
  providerId?: string; // 소셜 로그인 시 사용되는 ID

  @Column({
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @IsEmail(undefined, {
    message: emailValidationMessage,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @Length(3, 16, {
    message: lengthValidationMessage,
  })
  @Exclude({
    toPlainOnly: true, // 응답에서만 제외
  })
  password?: string;

  @Column({
    type: "enum",
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Column({
    type: "enum",
    enum: UserGrade,
    default: UserGrade.BASIC,
  })
  grade: UserGrade;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  @IsString()
  profileImage?: string;

  @OneToMany(() => BoardPost, (boardPost) => boardPost.author)
  posts: BoardPost[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
