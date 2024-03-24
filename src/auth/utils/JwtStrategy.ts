import { Injectable, Inject, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { DatabaseService } from "src/database/database.service"

export type JwtPayload = {
    id: string
    email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(@Inject("DATABASE_SERVICE") private databaseService: DatabaseService) {
        const extractJwtFromCookie = (req) => {
            let token = null
            if (req && req.authorization) {
                token = req.cookies["access_token"]
            }

            return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req)
        }

        super({
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: extractJwtFromCookie,
        })
    }

    async validate(payload: JwtPayload) {
        const user = await this.databaseService.user.findUnique({ where: { id: payload.id } })

        if (!user) throw new UnauthorizedException("Please log in to continue")

        return {
            id: payload.id,
            email: payload.email,
        }
    }
}
