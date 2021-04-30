import { Delete, Res } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Response } from 'express';

@Controller('coffees')
export class CoffeesController {
    @Get('flavor')
    findAll() {
        return 'this is all coffees';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `this req return ${id}`;
    }

    @Post()
    create(@Body() coffees) {
        return coffees;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() coffees) {
        return `object with id ${id} is update with this body : ${JSON.stringify(
            coffees,
        )}`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return 'delete ok ';
    }
}
