export interface ItemSearch {
    name: string,
    selectors: {
        armor: boolean,
        item: boolean,
        shield: boolean,
        spell: boolean,
        weapon: boolean
    }
}
