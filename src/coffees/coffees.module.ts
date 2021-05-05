import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import coffesConfig from 'config/coffees.config';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constant';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entiy';
import { Flavor } from './entities/flavor.entity';

class MocKCoffeServ {}

@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavor, Event]),
        ConfigModule.forFeature(coffesConfig),
    ], //partial registration
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        { provide: COFFEE_BRANDS, useValue: ['starbuck', 'nescafe'] },
    ],
    // providers: [
    //     {
    //         provide: CoffeesService,
    //         useValue: new MocKCoffeServ(),
    //     },
    // ],

    exports: [CoffeesService],
})
export class CoffeesModule {}
