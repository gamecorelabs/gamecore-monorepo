import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class SearchSecurityGuard implements CanActivate {
  private readonly logger = new Logger(SearchSecurityGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const searchKeyword = this.extractSearchKeyword(request);

    if (!searchKeyword) {
      return true;
    }

    // 추가 보안 검증
    if (!this.isSafeKeyword(searchKeyword)) {
      this.logger.warn(`Unsafe search keyword detected: ${searchKeyword}`, {
        ip: request.ip,
        userAgent: request.headers["user-agent"],
        timestamp: new Date().toISOString(),
      });

      throw new BadRequestException("안전하지 않은 검색어입니다.");
    }

    return true;
  }

  private extractSearchKeyword(request: Request): string | undefined {
    // URL 파라미터에서 추출
    return request.params?.search;
  }

  private isSafeKeyword(keyword: string): boolean {
    // 의심스러운 패턴들 - 프론트엔드와 동일한 로직
    const suspiciousPatterns = [
      /\.\.\//g, // Directory traversal
      /\0/g, // Null byte
      /[\x00-\x1f\x7f]/g, // Control characters
      /%00/gi, // Encoded null byte
      /%2e%2e%2f/gi, // Encoded directory traversal
      /\$\{.*\}/g, // Template injection
      /\{\{.*\}\}/g, // Template injection
      // 추가 보안 패턴
      /eval\s*\(/gi, // eval 함수 호출
      /function\s*\(/gi, // 함수 선언
      /constructor/gi, // constructor 접근
      /prototype/gi, // prototype 조작
      /require\s*\(/gi, // require 호출 (Node.js)
      /import\s*\(/gi, // dynamic import
    ];

    return !suspiciousPatterns.some((pattern) => pattern.test(keyword));
  }
}
