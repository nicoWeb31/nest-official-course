import { IsString } from 'class-validator';

export class CreateCoffeeDto {
    @IsString()//if serv receive bad data, it return bad request
    readonly name: string;
    @IsString()
    readonly brand: string;
    @IsString({ each: true })
    readonly flavors: string[];
}
