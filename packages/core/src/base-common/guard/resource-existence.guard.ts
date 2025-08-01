import { ResourceType } from "@base-common/enum/common.enum";
import { BoardExistsGuard } from "@base-board/guard/board-exists.guard";
import { PostInBoardGuard } from "@base-post/board/guard/post-in-board.guard";
import { CommentInPostGuard } from "@base-comment/guard/comment-in-post.guard";
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

/**
 * ResourceExistenceGuard
 * resourceType을 구분하는 api 처리시,
 * resourceType에 따라 해당 리소스 존재 여부를 확인하는 guard로 분기한다.
 */
@Injectable()
export class ResourceExistenceGuard implements CanActivate {
  constructor(
    private readonly boardExistsGuard: BoardExistsGuard,
    private readonly postInBoardGuard: PostInBoardGuard,
    private readonly commentInPostGuard: CommentInPostGuard
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const fullPath = request.route.path;

    const apiResourceType =
      fullPath.split("/").filter(Boolean)[0] || request.params.resourceType;

    if (
      !apiResourceType ||
      !Object.values(ResourceType).includes(apiResourceType)
    ) {
      throw new BadRequestException("유효하지 않은 resourceType입니다.");
    }

    request.resourceInfo = {
      resourceType: apiResourceType,
      resourceId: request.params.id,
    };

    // resourceType에 따라 다른 가드 적용
    switch (apiResourceType) {
      case "board":
        return this.boardExistsGuard.canActivate(context);
      case "board-post":
        return this.postInBoardGuard.canActivate(context);
      // case "news-post":
      // case "guide-post":
      case "comment":
        return this.commentInPostGuard.canActivate(context);
      default:
        throw new BadRequestException(
          `지원하지 않는 resourceType: ${apiResourceType}`
        );
    }
  }
}
