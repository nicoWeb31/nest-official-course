import { Delete, Res } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Response } from 'express';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    findAll(@Query() paginationQuery) {
        // const { limit, offset, name } = paginationQuery;
        // return `this is all coffees, paginationQuery limit:${limit}, offset:${offset}, name:${name}`;

        return this.coffeesService.findAll()

    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // return `this req return ${id}`;
        return this.coffeesService.findOne(id)
    }

    @Post()
    create(@Body() coffees) {
        // return coffees;
        return this.coffeesService.create(coffees)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() coffees) {
        // return `object with id ${id} is update with this body : ${JSON.stringify(
        //     coffees,
        // )}`;

        return this.coffeesService.update(id, coffees);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        // return 'delete ok ';
        return this.coffeesService.remove(id);
    }
}
