import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from 'src/dtos/signup.dto';
import { LoginDto } from 'src/dtos/login.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Post('login')
    async postLogin(@Body() body: LoginDto) {
        return this.userService.postLogin(body);
    }

    @Post('signup')
    async postSignup(@Body() body: SignupDto) {
        return this.userService.createUser(body);
    }
}
