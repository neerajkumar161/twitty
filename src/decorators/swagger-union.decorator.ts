import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export function SwaggerApiUnion(desc: string, ...args: any[]) {
  const oneOfArr = args.map((arg) => ({ $ref: getSchemaPath(arg) }));
  return applyDecorators(
    ApiOkResponse({
      description: desc,
      schema: {
        type: 'array',
        items: { oneOf: oneOfArr },
      },
    }),
  );
}
