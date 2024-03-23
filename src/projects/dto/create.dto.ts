import { ApiProperty } from "@nestjs/swagger"

export class CreateProjectDto {
    @ApiProperty({ description: "The title of the project" })
    title: string

    @ApiProperty({ required: false, description: "The description of the project" })
    description?: string

    @ApiProperty({ required: false, default: false, description: "Is this project published" })
    published: boolean
}
