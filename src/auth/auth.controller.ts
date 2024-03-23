import { Controller, Get, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
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
}
