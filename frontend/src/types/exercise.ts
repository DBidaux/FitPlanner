interface Exercise {
    id: number;
    name: string;
    description: string;
    image: string
}
interface Image {
    id:number;
    image:string;
}

interface Group {
    id: number;
    name: string;
}

export type {Image, Exercise, Group};