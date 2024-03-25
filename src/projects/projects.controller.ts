import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
    Req,
    UseGuards,
} from "@nestjs/common"
import { ApiBody, ApiCookieAuth, ApiTags } from "@nestjs/swagger"
import { Prisma } from "@prisma/client"
import { ProjectsService } from "./projects.service"
import { CreateProjectDto } from "./dto/create.dto"
import { AddUserDto } from "./dto/user.dto"
import { JwtAuthGuard } from "src/auth/utils/Guards"

@Controller("projects")
@ApiTags("Projects")
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    //api/projects/create
    @Post("create")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CreateProjectDto, description: "The data of the project to create." })
    async create(@Body() data: Prisma.ProjectCreateInput, @Body() user: { id: string }) {
        const projectResponse = await this.projectsService.create(data)

        if (!projectResponse)
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    message: "Creating project failed",
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: "Creating project failed",
                }
            )

        try {
            this.projectsService.addUser({
                projectId: projectResponse.id,
                userId: user.id,
            })
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    message: "Creating project failed",
                },
                HttpStatus.BAD_REQUEST,
                {
                    cause: error,
                }
            )
        }
    }

    //api/projects/add-user
    @Post("add-user")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: AddUserDto, description: "The data needed to add somebody to a project." })
    async addUser(@Body() data: AddUserDto) {
        try {
            await this.projectsService.addUser(data)
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

    //api/projects/get/:id
    @Get("get/:id")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    async getById(@Param("id") id: string) {
        try {
            return await this.projectsService.getById(+id)
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: "Project not found",
                },
                HttpStatus.NOT_FOUND,
                {
                    cause: error,
                }
            )
        }
    }

    //api/projects/update/:id
    @Patch("update/:id")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CreateProjectDto, description: "The data of the project to update." })
    async update(@Param("id") id: string, @Body() data: Prisma.ProjectCreateInput) {
        try {
            await this.projectsService.update(+id, data)
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: "Updating project failed",
                },
                HttpStatus.NOT_FOUND,
                {
                    cause: error,
                }
            )
        }
    }

    //api/projects/remove/:id
    @Delete("remove/:id")
    @ApiCookieAuth()
    @UseGuards(JwtAuthGuard)
    async remove(@Param("id") id: number) {
        try {
            await this.projectsService.remove(+id)
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    message: "Project not found",
                },
                HttpStatus.NOT_FOUND,
                {
                    cause: error,
                }
            )
        }
    }
}
