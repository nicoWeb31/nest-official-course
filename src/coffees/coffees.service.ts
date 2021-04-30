import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entiy';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla'],
        },
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        const coffe = this.coffees.find((cof) => cof.id === +id);

        // if (!coffe) {
        //     throw new HttpException(
        //         `Coffe #${id} not found`,
        //         HttpStatus.NOT_FOUND,
        //     );
        // }

        if( !coffe ) {
            throw new NotFoundException(`Coffe #${id} not found`)
        }

        return coffe;
    }

    create(createCoffer: any) {
        this.coffees.push(createCoffer);
    }

    update(id: string, updateCoffDto: any) {
        const existingCoffe = this.findOne(id);
        if (existingCoffe) {
            //
        }
    }

    remove(id: string) {
        const findIndex = this.coffees.findIndex((c) => c.id === +id);
        if (findIndex >= 0) {
            this.coffees.splice(findIndex, 1);
        }
    }
}
