import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma/client';
import { updateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService,){}

    async user(
        userWhereInput: Prisma.UserWhereUniqueInput
    ): Promise <User| null> {
        return this.prisma.user.findUnique({
            where: userWhereInput
        })
    }

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
                password: hash,

                account :{
                    create:{
                        balance: 0
                    }
                }
            }
        })
        
    }
    
    async updateUser(id: number, dto:updateUserDto){
        
        // Verify if user exists
        const userExistis = await this.prisma.user.findUnique({
            where : {id: id},
        });

        if(!userExistis){
            throw new NotFoundException('User not found')
        }
        const saltOrRounds = 10;
        const password = dto.password
        const hash = await bcrypt.hash(password, saltOrRounds)
        return this.prisma.user.update({
            where: {id: id},
            data: {
                email: dto.email,
                name: dto.name,
                lastname: dto.lastname,
                password: hash

            }
        })
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise <User>{
        return this.prisma.user.delete({
            where
        })
    }
}