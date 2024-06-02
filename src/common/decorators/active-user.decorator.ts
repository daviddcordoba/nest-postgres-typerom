import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ActiveUser = createParamDecorator(
    (data:unknown, cxt:ExecutionContext) => {
        const request = cxt.switchToHttp().getRequest();
        return request.user
    }
)