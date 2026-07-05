import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma/client';
import { listUserDto } from './dtos/list-user.dto';
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService,){}

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<any[]> {
        const { skip, take, cursor, where, orderBy} = params ;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
            }
        });     
    }
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