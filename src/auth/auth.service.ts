import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from   'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuthService {
    constructor(
        private prsima: PrismaService,
        private jwtService: JwtService
    ){}

    async validateUser(
        email: string,
        pass: string
    ): Promise<any>{
        const user = await this.prsima.user.findUnique({
            where : {email: email}
        });

        //Check if the pass are the same
        if(user && await bcrypt.compare(pass, user.password)){
            const {password, ...result} = user;
            return result
        }

        return null
    }
    
    // Generate token such as email and pass
    async login(user: any){
        const payload = {email: user.email, sub:user.id};

        return{
            access_token: this.jwtService.sign(payload)
        }
    }

}
