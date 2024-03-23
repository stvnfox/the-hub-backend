import { Injectable } from "@nestjs/common"
import { v4 as uuidv4 } from "uuid"
import { DatabaseService } from "src/database/database.service"

interface UserDetails {
    email: string
    displayName: string
}

@Injectable()
export class AuthService {
    constructor(private databaseService: DatabaseService) {}

    async validateUser(details: UserDetails) {
        const user = await this.databaseService.user.findUnique({ where: { email: details.email } })

        if (user) {
            return user
        }

        const newUser = details

        return this.databaseService.user.create({
            data: {
                id: uuidv4(),
                email: newUser.email,
                name: newUser.displayName,
            },
        })
    }

    async findUser(id: string) {
        const user = await this.databaseService.user.findUnique({ where: { id } })

        return user
    }
}
