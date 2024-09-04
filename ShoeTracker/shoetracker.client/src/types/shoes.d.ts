export interface Color {
    r: number;
    g: number;
    b: number;
}

export interface GradientSection {
    color: Color;
    points: number;
}

export type TextColor = "Light" | "Dark";

export interface DateModel {
    month: number;
    day: number;
    year: number;
}

export interface Shoe {
    id: string;
    brand: string;
    model: string;
    modelVersion: number;
    shoeName: string;
    description: string?;
    miles: number;
    textColor: TextColor;
    gradient: GradientSection[];
    startDate: DateModel;
    warnAtMileage: number;
    startingMileage: number;
}

export interface EditShoeDto {
    brand: string;
    model: string;
    modelVersion: number;
    shoeName: string;
    description: string?;
    textColor: TextColor;
    gradient: GradientSection[];
    startDate: DateModel;
    warnAtMileage: number;
    startingMileage: number;
}
