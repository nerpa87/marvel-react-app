export interface CustomizationType {
    id: number;
    name: string;
    imageUrl: string;
}

export interface CharacterType {
    id: number;
    name: string;
    thumbnail: {
        extension: string,
        path: string
    }
}