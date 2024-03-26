import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PassportModule } from "@nestjs/passport"
import { DatabaseModule } from "./database/database.module"
import { AuthModule } from "./auth/auth.module"
import { ProjectsModule } from "./projects/projects.module"
import { UserModule } from "./user/user.module"
import { TasksModule } from "./tasks/tasks.module"

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        ProjectsModule,
        TasksModule,
        UserModule,
        ConfigModule.forRoot(),
        PassportModule.register({ session: true }),
    ],
})
export class AppModule {}
