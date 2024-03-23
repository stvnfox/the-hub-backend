import { ApiProperty } from "@nestjs/swagger"
import { IsEmail } from "class-validator"

export class AddUserDto {
    @ApiProperty({ description: "The id of the user that needs access to a project" })
    userId: string

    @ApiProperty({ description: "The id of the project" })
    projectId: number
}

export class GetUserDto {
    @IsEmail()
    @ApiProperty({ description: "The user's emailaddress" })
    email: string
}
