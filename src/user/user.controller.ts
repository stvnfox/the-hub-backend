import { Body, Controller, Get, UseGuards } from "@nestjs/common"
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger"
import { UserService } from "./user.service"
import { JwtAuthGuard } from "src/auth/utils/Guards"
import { GetUserDto } from "src/projects/dto/user.dto"

@Controller("user")
@ApiTags("User")
export class UserController {
    constructor(private readonly userService: UserService) {}

    //api/user/get/
    @Get("get")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    async getByEmail(@Body() params: GetUserDto) {
        return this.userService.getByEmail(params.email)
    }
}
