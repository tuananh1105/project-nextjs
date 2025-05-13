type Size = {
    _id: string;
    name: string;
    minHeight: number;
    maxHeight: number;
    minWeight: number;
    maxWeight: number;
    createdAt: string;
}

type SizeParams = {
    page: number
    limit: number
}
