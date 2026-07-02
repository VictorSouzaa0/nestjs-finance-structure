import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma/client';
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService,){}
    async createUser(data: Prisma.UserCreateInput): Promise<User>{
        const saltOrRounds = 10;
        const password = data.password
        const hash = await bcrypt.hash(password, saltOrRounds)
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                lastname: data.lastname,
                password: hash
            }
        })

    }
}