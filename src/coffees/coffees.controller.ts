import { Delete, Res } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Response } from 'express';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    findAll(@Query() paginationQuery : PaginationQueryDto) {
        // const { limit, offset } = paginationQuery;
        // return `this is all coffees, paginationQuery limit:${limit}, offset:${offset}, name:${name}`;

        return this.coffeesService.findAll(paginationQuery)

    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // return `this req return ${id}`;
        return this.coffeesService.findOne(id)
    }

    @Post()
    create(@Body() coffees : CreateCoffeeDto) {
        // return coffees;
        return this.coffeesService.create(coffees)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        // return `object with id ${id} is update with this body : ${JSON.stringify(
        //     coffees,
        // )}`;

        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        // return 'delete ok ';
        return this.coffeesService.remove(id);
    }
}
