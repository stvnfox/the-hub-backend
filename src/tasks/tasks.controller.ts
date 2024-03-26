import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common"
import { ApiBody, ApiCookieAuth, ApiTags } from "@nestjs/swagger"
import { CreateTaskDto } from "./dto/create.dto"
import { TasksService } from "./tasks.service"
import { JwtAuthGuard } from "src/auth/utils/Guards"

interface CreateTaskModel {
    title: string
    description?: string
    status: string
    projectId: number
    assigneeEmail: string
}

@Controller("tasks")
@ApiTags("Tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    //api/tasks/create
    @Post("create")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CreateTaskDto, description: "The data of the task to create." })
    async create(@Body() data: CreateTaskDto) {
        try {
            await this.tasksService.create(data)
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    message: "Adding user to the project failed",
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: error,
                }
            )
        }
    }
}
