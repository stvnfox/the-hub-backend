import { Injectable } from "@nestjs/common"
import { v4 as uuidv4 } from "uuid"
import { DatabaseService } from "src/database/database.service"
import { JwtService } from "@nestjs/jwt"

interface UserDetails {
    email: string
    displayName: string
}

@Injectable()
export class AuthService {
    constructor(
        private databaseService: DatabaseService,
        private jwtService: JwtService
    ) {}

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

    async createJwtToken(details: UserDetails) {
        const user = await this.databaseService.user.findUnique({ where: { email: details.email } })

        if (user) {
            const payload = { sub: user.name, email: user.email, id: user.id }

            return await this.jwtService.signAsync(payload)
        }

        const newUser = details

        await this.databaseService.user.create({
            data: {
                id: uuidv4(),
                email: newUser.email,
                name: newUser.displayName,
            },
        })

        const payload = { sub: newUser.displayName, email: newUser.email }
        return await this.jwtService.signAsync(payload)
    }

    async findUser(id: string) {
        const user = await this.databaseService.user.findUnique({ where: { id } })

        return user
    }
}
