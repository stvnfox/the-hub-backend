import { ExecutionContext, Injectable, UnauthorizedException, CanActivate } from "@nestjs/common"
import { Request } from "express"
import { AuthGuard } from "@nestjs/passport"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
    async canActivate(context: ExecutionContext) {
        const activate = (await super.canActivate(context)) as boolean
        const request = context.switchToHttp().getRequest()
        await super.logIn(request)
        return activate
    }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException()
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            })

            request["user"] = payload
        } catch {
            throw new UnauthorizedException()
        }
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const hasAccessToken = request.headers.cookie?.includes("access_token")

        if (hasAccessToken) {
            const [token] = request.headers.cookie?.split("access_token=")[1].split(";")

            return token
        }

        return undefined
    }
}
