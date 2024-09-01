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
    startDate: string;
    warnAtMileage: number;
}
