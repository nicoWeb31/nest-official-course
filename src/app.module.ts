import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from 'config/app.config';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { CoffeesModule } from './coffees/coffees.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';

@Module({
    imports: [
        CommonModule,
        ConfigModule.forRoot({
            load: [appConfig],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_BASE,
            autoLoadEntities: true,
            synchronize: true,
        }),
        CoffeeRatingModule,
        CoffeesModule,
    ],
    exports:[],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
