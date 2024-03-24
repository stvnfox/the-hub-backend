import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { GoogleStrategy } from "./utils/GoogleStrategy"
import { SessionSerializer } from "./utils/Serializer"
import { JwtModule } from "@nestjs/jwt"
import { DatabaseService } from "src/database/database.service"

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1h" },
        }),
    ],
    controllers: [AuthController],
    providers: [
        GoogleStrategy,
        SessionSerializer,
        {
            provide: "AUTH_SERVICE",
            useClass: AuthService,
        },
        {
            provide: "DATABASE_SERVICE",
            useClass: DatabaseService,
        },
    ],
})
export class AuthModule {}
