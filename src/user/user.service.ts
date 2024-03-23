import { Injectable } from "@nestjs/common"
import { DatabaseService } from "src/database/database.service"

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    //TODO: Refactor this to seperate user data from user projects and later todo's
    async getByEmail(email: string) {
        const user = await this.databaseService.user.findUnique({
            where: { email },
            include: { projects: { include: { project: true } } },
        })

        const result = {
            id: user.id,
            email: user.email,
            name: user.name,
            projects: user.projects.map((project) => {
                return {
                    id: project.project.id,
                    title: project.project.title,
                    description: project.project.description,
                    published: project.project.published,
                }
            }),
        }

        return result
    }
}
