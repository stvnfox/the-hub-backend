import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger"
import { UserService } from "./user.service"
import { JwtAuthGuard } from "src/auth/utils/Guards"
import { GetUserDto } from "src/projects/dto/user.dto"

@Controller("user")
@ApiTags("User")
export class UserController {
    constructor(private readonly userService: UserService) {}

    //api/user/get/id
    @Get("get/id")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    async getUserId(@Query("email") email: string) {
        return this.userService.getUserId(email)
    }

    //api/user/get/projects
    @Get("get/projects")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    async getUserProjects(@Query("email") email: string) {
        return this.userService.getUserProjects(email)
    }
}
