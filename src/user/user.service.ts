import { Injectable } from "@nestjs/common"
import { DatabaseService } from "src/database/database.service"

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getUserId(email: string) {
        const user = await this.databaseService.user.findUnique({
            where: { email },
        })

        return user.id
    }

    async getUserProjects(email: string) {
        const user = await this.databaseService.user.findUnique({
            where: { email },
            include: { projects: { include: { project: true } } },
        })

        return user.projects.map((project) => {
            return {
                id: project.project.id,
                title: project.project.title,
                description: project.project.description,
                published: project.project.published,
            }
        })
    }

    //TODO: get user todos
}
