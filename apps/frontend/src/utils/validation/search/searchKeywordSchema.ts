import { z } from "zod";

// 검색 키워드 보안 검증 스키마
export const searchKeywordSchema = z
  .string()
  .min(1, "검색어는 최소 1자 이상이어야 합니다.")
  .max(100, "검색어는 100자를 초과할 수 없습니다.")
  .refine((value) => {
    // HTML/JS 태그 방지
    const htmlPattern = /<[^>]*>/g;
    return !htmlPattern.test(value);
  }, "HTML 태그는 사용할 수 없습니다.")
  .refine((value) => {
    // JavaScript 실행 시도 방지
    const jsPattern = /(javascript:|data:|vbscript:|on\w+\s*=)/i;
    return !jsPattern.test(value);
  }, "스크립트 코드는 사용할 수 없습니다.")
  .refine((value) => {
    // SQL Injection 기본 패턴 방지
    const sqlPattern = /(union|select|insert|update|delete|drop|create|alter|exec|execute)\s/gi;
    return !sqlPattern.test(value);
  }, "데이터베이스 명령어는 사용할 수 없습니다.")
  .refine((value) => {
    // 과도한 특수문자 방지 (연속 3개 이상)
    const specialPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}/;
    return !specialPattern.test(value);
  }, "특수문자를 과도하게 사용할 수 없습니다.")
  .refine((value) => {
    // 공백만 있는 문자열 방지
    return value.trim().length > 0;
  }, "공백만으로는 검색할 수 없습니다.")
  .transform((value) => {
    // 앞뒤 공백 제거 및 연속 공백을 단일 공백으로 변환
    return value.trim().replace(/\s+/g, ' ');
  });

// 검색 키워드 타입
export type SearchKeyword = z.infer<typeof searchKeywordSchema>;

// 키워드 검증 헬퍼 함수
export const validateSearchKeyword = (keyword: string) => {
  try {
    const validKeyword = searchKeywordSchema.parse(keyword);
    return { success: true, data: validKeyword, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        error: error.errors[0]?.message || "유효하지 않은 검색어입니다." 
      };
    }
    return { 
      success: false, 
      data: null, 
      error: "검색어 검증 중 오류가 발생했습니다." 
    };
  }
};

// 안전한 키워드인지 추가 검증
export const isSafeKeyword = (keyword: string): boolean => {
  // 의심스러운 패턴들
  const suspiciousPatterns = [
    /\.\.\//g,           // Directory traversal
    /\0/g,               // Null byte
    /[\x00-\x1f\x7f]/g,  // Control characters
    /%00/gi,             // Encoded null byte
    /%2e%2e%2f/gi,       // Encoded directory traversal
    /\$\{.*\}/g,         // Template injection
    /\{\{.*\}\}/g,       // Template injection
  ];
  
  return !suspiciousPatterns.some(pattern => pattern.test(keyword));
};