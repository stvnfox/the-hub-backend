import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { DatabaseService } from "src/database/database.service"

@Injectable()
export class ProjectsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(data: Prisma.ProjectCreateInput) {
        return await this.databaseService.project.create({ data })
    }

    async getById(id: number) {
        const projectExists = await this.databaseService.project.findUnique({ where: { id } })

        if (!projectExists) throw { message: "Project not found", code: 400 }

        return projectExists
    }

    async update(id: number, data: Prisma.ProjectUpdateInput) {
        const projectExists = await this.databaseService.project.findUnique({ where: { id } })

        if (!projectExists) throw { message: "Project not found", code: 400 }

        return await this.databaseService.project.update({ where: { id }, data })
    }

    async remove(id: number) {
        const projectExists = await this.databaseService.project.findUnique({ where: { id } })

        if (!projectExists) throw { message: "Project not found", code: 400 }

        return await this.databaseService.project.delete({ where: { id } })
    }

    async addUser(data: Prisma.ProjectUserCreateManyInput) {
        return await this.databaseService.projectUser.create({ data })
    }
}
