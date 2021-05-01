import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
    imports:[],
    controllers:[CoffeesController],
    providers:[CoffeesService],
    exports:[]
})
export class CoffeesModule {}
