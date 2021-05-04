import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
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
    ) {}

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
}
