import { DateModel, Shoe } from "./shoes";

export type DistanceUnit = 'Miles' | 'Meters' | 'Kilometers';

export interface Time {
    hours: number;
    minutes: number;
    seconds: number;
}

export interface SubRun {
    shoeId: string;
    shoe?: Shoe;
    time: Time;
    distance: number;
    distanceUnits: DistanceUnit;
}

export interface Activity {
    id: string;
    userId: string;
    shoeId: string;
    distance: number;
    distanceUnits: DistanceUnit;
    time: Time;
    name: string;
    description?: string;
    date: DateModel;
    ordinal: number;
    shoe?: Shoe;
    warmup?: SubRun;
    cooldown?: SubRun;
    strides?: SubRun;
}

export interface EditActivityDto {
    shoeId: string;
    distance: number;
    distanceUnits: DistanceUnit;
    time: Time;
    name: string;
    description?: string;
    date: DateModel;
    ordinal: number;
    warmup?: SubRun;
    cooldown?: SubRun;
    strides?: SubRun;
}
