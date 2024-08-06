import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { UserEntity } from '../entities/user.entity'
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Usuario')
@Controller('/usuarios')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<UserEntity[]> {
        return this.userService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return this.userService.findById(id)
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() user: UserEntity): Promise<UserEntity> {
        return this.userService.create(user)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() user: UserEntity): Promise<UserEntity> {
        return this.userService.update(user)
    }
}
