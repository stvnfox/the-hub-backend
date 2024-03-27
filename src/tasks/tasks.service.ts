import { Injectable } from "@nestjs/common"
import { DatabaseService } from "src/database/database.service"
import { CreateTaskDto } from "./dto/create.dto"
import { ChangeAssigneeDto } from "./dto/changeAssignee.dto"

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

    async changeAssignee(data: ChangeAssigneeDto) {
        return await this.databaseService.task.update({
            where: {
                id: data.taskId,
            },
            data: {
                assignee: {
                    connect: {
                        email: data.email,
                    },
                },
            },
        })
    }
}
