import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            
        }),
        CoffeesModule,
        TypeOrmModule.forRoot({
            type: 'postgres', // type of our database
            host: process.env.DB_HOST, // database host
            port: Number(process.env.DB_PORT), // database host
            username: process.env.DB_USER, // username
            password: process.env.DB_PASS, // user password
            database: process.env.DB_BASE, // name of our database,
            autoLoadEntities: true, // models will be loaded automatically
            synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
        }),
        CoffeeRatingModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
