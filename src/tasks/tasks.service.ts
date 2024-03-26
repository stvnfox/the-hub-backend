import { Injectable } from "@nestjs/common"
import { DatabaseService } from "src/database/database.service"
import { CreateTaskDto } from "./dto/create.dto"

@Injectable()
export class TasksService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(data: CreateTaskDto) {
        return await this.databaseService.task.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
                project: {
                    connect: {
                        id: data.projectId,
                    },
                },
                assignee: {
                    connect: {
                        email: data.assignee,
                    },
                },
            },
        })
    }
}
