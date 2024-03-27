import { ApiProperty } from "@nestjs/swagger"

export class ChangeAssigneeDto {
    @ApiProperty({ description: "The email of the new assigned user" })
    email: string

    @ApiProperty({ description: "The id of the task" })
    taskId: number
}
