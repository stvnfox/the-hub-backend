import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBody, ApiCookieAuth, ApiTags } from "@nestjs/swagger"
import { CreateTaskDto } from "./dto/create.dto"
import { ChangeAssigneeDto } from "./dto/changeAssignee.dto"
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

    //api/tasks/get/id
    @Get("get/:id")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    async getTaskById(@Param("id") id: number) {
        try {
            return await this.tasksService.getTaskById(+id)
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: "Task not found",
                },
                HttpStatus.NOT_FOUND,
                {
                    cause: error,
                }
            )
        }
    }

    //api/tasks/change-assignee
    @Patch("change-assignee")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: ChangeAssigneeDto, description: "The data needed to change task assignee." })
    async changeAssignee(@Body() data: ChangeAssigneeDto) {
        try {
            await this.tasksService.changeAssignee(data)
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    message: "Changing assignee failed",
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: error,
                }
            )
        }
    }
}
