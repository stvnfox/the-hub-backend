import { ApiProperty } from "@nestjs/swagger"
import { PriorityStatus, TaskStatus } from "@prisma/client"

export class UpdateTaskDto {
    @ApiProperty({ description: "The id of the task" })
    id: number

    @ApiProperty({ description: "The title of the task" })
    title: string

    @ApiProperty({ required: false, description: "The description of the task" })
    description?: string

    @ApiProperty({ default: TaskStatus.NEW, description: "What is the status of the task" })
    status: TaskStatus

    @ApiProperty({ default: PriorityStatus.NORMAL, description: "What is the priority of the task" })
    priority: PriorityStatus

    @ApiProperty({ required: false, description: "The email of the user assigned to the task" })
    assignee: string

    @ApiProperty({ description: "The data of the project the task belongs to" })
    projectId: number
}
