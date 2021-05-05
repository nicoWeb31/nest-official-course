import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { CoffeesModule } from './coffees/coffees.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres', // type of our database
            host: process.env.DB_HOST, // database host
            port: Number(process.env.DB_PORT), // database host
            username: process.env.DB_USER, // username
            password: process.env.DB_PASS, // user password
            database: process.env.DB_BASE, // name of our database,
            autoLoadEntities: true, // models will be loaded automatically
            synchronize: true,
        }),
        CoffeeRatingModule,
        DatabaseModule,
        CoffeesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
