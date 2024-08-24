import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export function SwaggerApi(apiTag: string) {
  return applyDecorators(ApiTags(apiTag), ApiBearerAuth('auth'));
}
