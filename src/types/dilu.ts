export type dilu = {
    dilu_id: string,
    name: string,
    created: string
}

export type diluForm = {
    name: string,
    participants: string[]
}

export type diluListResponse = {
    count: number,
    results: dilu[]
}