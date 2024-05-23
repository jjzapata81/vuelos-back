import { IsNumber, IsString } from "class-validator";

export class CreateFlightDto {

    @IsString()
    code:string;

    @IsString()
    from:string;

    @IsString()
    to:string;

    @IsString()
    departureDate:string;

    @IsString()
    departureTime:string;

    @IsString()
    arriveDate:string;

    @IsString()
    arriveTime:string;

    @IsNumber({maxDecimalPlaces: 2})
    priceBase: number;

}
