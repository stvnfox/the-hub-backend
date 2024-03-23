import { Body, Controller, Get } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { UserService } from "./user.service"
import { GetUserDto } from "src/projects/dto/user.dto"

@Controller("user")
@ApiTags("User")
export class UserController {
    constructor(private readonly userService: UserService) {}

    //api/user/get/
    @Get("get")
    async getByEmail(@Body() params: GetUserDto) {
        return this.userService.getByEmail(params.email)
    }
}
