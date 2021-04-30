import { Injectable } from '@nestjs/common';
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
        return this.coffees.find((cof) => cof.id === +id);
    }

    create(createCoffer: any) {
        this.coffees.push(createCoffer);
    }

    update(id : string, updateCoffDto: any) {
        const existingCoffe = this.findOne(id)
        if(existingCoffe) {
            //
        }
    }

    remove(id : string) {
        const findIndex = this.coffees.findIndex(c => c.id === +id);
        if(findIndex >= 0) {
            this.coffees.splice(findIndex, 1);
        }
    }
}
