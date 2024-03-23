import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Req } from "@nestjs/common"
import { ProjectsService } from "./projects.service"
import { ApiBody, ApiTags } from "@nestjs/swagger"
import { Prisma } from "@prisma/client"
import { CreateProjectDto } from "./dto/create.dto"
import { AddUserDto } from "./dto/user.dto"

@Controller("projects")
@ApiTags("Projects")
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    //api/projects/create
    @Post("create")
    @ApiBody({ type: CreateProjectDto, description: "The data of the project to create." })
    async create(@Body() project: Prisma.ProjectCreateInput, @Body() user: { id: string }) {
        const projectResponse = await this.projectsService.create(project)

        if (!projectResponse) return null

        const response = await this.projectsService.addUser({
            projectId: projectResponse.id,
            userId: user.id,
        })
        return response || null
    }

    //api/projects/add-user
    @Post("add-user")
    @ApiBody({ type: AddUserDto, description: "The data needed to add somebody to a project." })
    async addUser(@Body() data: AddUserDto) {
        const response = await this.projectsService.addUser(data)

        return response || null
    }
    // @Get("get/:id")
    // findOne(@Param("id") id: string) {
    //     return this.projectsService.findOne(+id)
    // }

    // @Patch("update/:id")
    // update(@Param("id") id: string, @Body() project: Prisma.ProjectCreateInput) {
    //     return this.projectsService.update(+id, project)
    // }

    //api/projects/remove/:id
    @Delete("remove/:id")
    async remove(@Param("id") id: string) {
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
