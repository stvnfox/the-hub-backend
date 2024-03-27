import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import * as session from "express-session"
import * as passport from "passport"
import { AppModule } from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix("/api")
    app.use(
        // @ts-ignore
        session({
            secret: process.env.SESSION_SECRET,
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 60000 * 60,
            },
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())

    const config = new DocumentBuilder()
        .setTitle("The Hub")
        .setDescription("The Hub API description")
        .setVersion("0.1")
        .addCookieAuth("access_token")
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("docs", app, document)

    await app.listen(1605)
}
bootstrap()
