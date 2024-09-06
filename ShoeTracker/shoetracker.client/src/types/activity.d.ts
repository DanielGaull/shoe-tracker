import { DateModel } from "./shoes";

export type DistanceUnit = 'Miles' | 'Meters' | 'Kilometers';

export interface Time {
    hours: number;
    minutes: number;
    seconds: number;
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
}
