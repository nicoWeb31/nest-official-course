import { Inject } from '@nestjs/common';
import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import coffeesConfig from 'config/coffees.config';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { COFFEE_BRANDS } from './coffee.constant';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entiy';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepo: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepo: Repository<Flavor>,
        private readonly connection: Connection,
        // @Inject(COFFEE_BRANDS) coffeeStrProTest: string[],
        // private readonly configServ: ConfigService,
        @Inject(coffeesConfig.KEY)
        private readonly coffeeConf : ConfigType<typeof coffeesConfig>
    ) {
        // console.log(coffeeStrProTest);
        /* Accessing process.env variables from ConfigService */
        // const databaseHost = this.configServ.get('coffees');
        console.log(coffeeConf.foo);
    }

    async findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.coffeeRepo.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: string) {
        const coffe = await this.coffeeRepo.findOne(id, {
            relations: ['flavors'],
        });

        if (!coffe) {
            throw new NotFoundException(`Coffe #${id} not found`);
        }

        return coffe;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map((name) =>
                this.preloadFlavorByName(name),
            ),
        );

        const newCoffer = this.coffeeRepo.create({
            ...createCoffeeDto,
            flavors,
        });
        return this.coffeeRepo.save(newCoffer);
    }

    async update(id: string, updateCoffDto: UpdateCoffeeDto) {
        const flavors =
            updateCoffDto.flavors &&
            (await Promise.all(
                updateCoffDto.flavors.map((name) =>
                    this.preloadFlavorByName(name),
                ),
            ));
        const coffee = await this.coffeeRepo.preload({
            id: +id,
            ...updateCoffDto,
            flavors,
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepo.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        this.coffeeRepo.remove(coffee);
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepo.findOne({ name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepo.create({ name });
    }

    async recommendCoffee(coffee: Coffee) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            coffee.recommendations++;

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
