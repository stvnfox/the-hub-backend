import { Controller, Get, HttpException, HttpStatus, Query, UseGuards } from "@nestjs/common"
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger"
import { UserService } from "./user.service"
import { JwtAuthGuard } from "src/auth/utils/Guards"

@Controller("user")
@ApiTags("User")
export class UserController {
    constructor(private readonly userService: UserService) {}

    //api/user/get/id
    @Get("get/id")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    async getUserId(@Query("email") email: string) {
        try {
            return await this.userService.getUserId(email)
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: "User not found",
                },
                HttpStatus.NOT_FOUND,
                {
                    cause: error,
                }
            )
        }
    }

    //api/user/get/projects
    @Get("get/projects")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    async getUserProjects(@Query("email") email: string) {
        try {
            return await this.userService.getUserProjects(email)
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: "User not found",
                },
                HttpStatus.NOT_FOUND,
                {
                    cause: error,
                }
            )
        }
    }

    //api/user/get/tasks
    @Get("get/tasks")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    async getUserTasks(@Query("email") email: string) {
        try {
            return await this.userService.getUserTasks(email)
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: "User not found",
                },
                HttpStatus.NOT_FOUND,
                {
                    cause: error,
                }
            )
        }
    }
}
