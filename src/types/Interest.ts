export type Interest = {
    id: number;
    title: string;
}

export type InterestState = {
    interests: Interest[];
    interestsFiltered: Interest[];
    interestsSelected: number[];
    interestsUserSelected: number[];
    initLoaded: boolean;
    btnVisible: boolean;
}