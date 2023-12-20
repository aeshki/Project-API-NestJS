import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dtos/login.dto';
import { SignupDto } from 'src/dtos/signup.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private users : SignupDto[] = []

    async findAll() {
        return this.users
    }

    async postLogin(body: LoginDto) {
        const { username, password } = body;
        const user = this.users.find(f => f.username == username);        

        if (!user) throw new NotFoundException('User Not Found');
        if (!await bcrypt.compare(password, user.password)) throw new UnauthorizedException('Password Incorrect');
        return user;
    }

    async createUser(body: SignupDto) {
        if (this.users.find(f => f.username == body.username )) throw new ConflictException('Already user has same username');
        else this.users.push({
            ...body,
            password: await bcrypt.hash(body.password, 10)
        });
    }
}
