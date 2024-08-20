export type dilu = {
    dilu_id: string,
    name: string,
    created: string
}

export type diluForm = {
    name: string,
    participants: string[],
    isValid: (form: diluForm) => boolean
}

export type diluListResponse = {
    count: number,
    results: dilu[]
}