import { IsEmail, IsString, Length } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "@gamecoregg/nestjs-core/base-common/entity/base.entity";
import { BoardPost } from "@gamecoregg/nestjs-core/base-post/board/entity/board-post.entity";
import { stringValidationMessage } from "@gamecoregg/nestjs-core/base-common/validation/string-validation-mesage";
import { emailValidationMessage } from "@gamecoregg/nestjs-core/base-common/validation/email-validation.message";
import { lengthValidationMessage } from "@gamecoregg/nestjs-core/base-common/validation/length-validation.message";
import { UserGrade, UserRoles } from "../enum/user.enum";
import { Exclude } from "class-transformer";
import { Comment } from "@gamecoregg/nestjs-core/base-comment/entity/comment.entity";

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
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @IsEmail(undefined, {
    message: emailValidationMessage,
  })
  email: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  @Length(3, 16, {
    message: lengthValidationMessage,
  })
  @Exclude({
    toPlainOnly: true, // 응답에서만 제외
  })
  password: string;

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

  // @Expose()
  // get nicknameAndEmail() {
  //   return this.nickname + '/' + this.email;
  // }

  @OneToMany(() => BoardPost, (boardPost) => boardPost.author)
  posts: BoardPost[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
