import { Controller, Get, HttpStatus, Inject, Req, Res, UseGuards } from "@nestjs/common"
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger"
import { Response, Request } from "express"
import { GoogleAuthGuard, JwtAuthGuard } from "./utils/Guards"
import { AuthService } from "./auth.service"

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
    constructor(@Inject("AUTH_SERVICE") private authService: AuthService) {}
    //api/auth/google/login
    @Get("google/login")
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return "This route is used to login with google"
    }

    //api/auth/google/redirect
    @Get("google/redirect")
    @UseGuards(GoogleAuthGuard)
    async handleRedirect(@Req() request, @Res() response: Response) {
        const token = await this.authService.createJwtToken({
            email: request.user.email,
            displayName: request.user.name,
        })

        response.cookie("access_token", token, {
            maxAge: 2592000000,
            sameSite: true,
            secure: false,
        })

        return response.status(HttpStatus.OK).json(token)
    }

    //api/auth/status
    @Get("status")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    user() {
        return { msg: "Authenticated" }
    }
}
