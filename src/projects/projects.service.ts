import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { todo } from "node:test"
import { DatabaseService } from "src/database/database.service"

@Injectable()
export class ProjectsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(data: Prisma.ProjectCreateInput) {
        return await this.databaseService.project.create({ data })
    }

    async getById(id: number) {
        const projectExists = await this.databaseService.project.findUnique({
            where: { id },
        })

        if (!projectExists) throw { message: "Project not found", code: 400 }

        const project = await this.databaseService.project.findUnique({
            where: { id },
            include: { members: true, todos: true },
        })

        const result = {
            id: project.id,
            title: project.title,
            description: project.description,
            published: project.published,
            members: project.members.map((member) => member.userId),
            todos: project.todos.map((todo) => {
                return {
                    id: todo.id,
                    title: todo.title,
                    description: todo.content,
                    status: todo.status,
                    assignedTo: todo.authorId,
                }
            }),
        }

        return result
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
