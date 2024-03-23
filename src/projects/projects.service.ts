import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { DatabaseService } from "src/database/database.service"

@Injectable()
export class ProjectsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(project: Prisma.ProjectCreateInput) {
        return await this.databaseService.project.create({ data: project })
    }

    async remove(id: number) {
        const projectExists = await this.databaseService.project.findUnique({ where: { id } })

        if (!projectExists) throw { message: "Project not found", code: 400 }

        return await this.databaseService.project.delete({ where: { id } })
    }

    async addUser(data: Prisma.ProjectUserCreateManyInput) {
        return await this.databaseService.projectUser.create({ data })
    }

    // findAll() {
    //   return `This action returns all projects`;
    // }

    // findOne(id: number) {
    //   return `This action returns a #${id} project`;
    // }

    // update(id: number, updateProjectDto: UpdateProjectDto) {
    //   return `This action updates a #${id} project`;
    // }
}
