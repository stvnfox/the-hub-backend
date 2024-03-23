import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { Request } from "express"
import { GoogleAuthGuard } from "./utils/Guards"

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
    //api/auth/google/login
    @Get("google/login")
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return "This route is used to login with google"
    }

    //api/auth/google/redirect
    @Get("google/redirect")
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        return "This route is used to redirect after google login"
    }

    //api/auth/status
    @Get("status")
    user(@Req() request: Request) {
        if (request.user) {
            console.log(request.user)
            return { msg: "Authenticated" }
        } else {
            return { msg: "Not Authenticated" }
        }
    }
}
