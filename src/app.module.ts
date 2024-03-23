import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PassportModule } from "@nestjs/passport"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DatabaseModule } from "./database/database.module"
import { AuthModule } from "./auth/auth.module"

@Module({
    imports: [DatabaseModule, AuthModule, ConfigModule.forRoot(), PassportModule.register({ session: true })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
