interface Color {
    r: number;
    g: number;
    b: number;
}

interface GradientSection {
    color: Color;
    points: number;
}

type TextColor = "Light" | "Dark";

interface Shoe {
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
