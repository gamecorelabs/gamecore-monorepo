import { ResourceType } from "@_core/base-common/enum/common.enum";
import { PostInBoardGuard } from "@_core/base-post/board/guard/post-in-board.guard";
import { CommentInPostGuard } from "@_core/base-comment/guard/comment-in-post.guard";
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

/**
 * ResourceExistenceGuard
 * resource_type을 구분하는 api 처리시,
 * resource_type에 따라 해당 리소스 존재 여부를 확인하는 guard로 분기한다.
 */
@Injectable()
export class ResourceExistenceGuard implements CanActivate {
  constructor(
    private readonly postInBoardGuard: PostInBoardGuard,
    private readonly commentInPostGuard: CommentInPostGuard
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiResourceType = request.params.resource_type;

    if (
      !apiResourceType ||
      !Object.values(ResourceType).includes(apiResourceType)
    ) {
      throw new BadRequestException("유효하지 않은 resource_type입니다.");
    }

    request.resource_info = {
      resource_type: apiResourceType,
      resource_id: request.params.resource_id,
    };

    // resource_type에 따라 다른 가드 적용
    switch (apiResourceType) {
      case "board":
      case "post":
        return this.postInBoardGuard.canActivate(context);
      case "comment":
        return this.commentInPostGuard.canActivate(context);
      // case "guide": case "news":
      default:
        throw new BadRequestException(
          `지원하지 않는 resource_type: ${apiResourceType}`
        );
    }
  }
}
