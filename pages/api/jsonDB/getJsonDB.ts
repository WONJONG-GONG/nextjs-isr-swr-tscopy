import { NextApiRequest, NextApiResponse } from "next";

type FetchType = 'index' | 'each';

export interface IndexProps {
    name: string;
    registered: string;
}

export interface EachProps {
    id: number;
    guid: string;
    isActive: boolean;
    name: string;
    gender: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    about: string;
    registered: string;
    latitude: number;
    longitude: number;
    tags: string[];
}

export async function fetchJsonDB(type: FetchType): Promise<IndexProps[] | EachProps[]> {
    return fetch(`http://localhost:8080/${type}`).then(res => res.json());
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IndexProps[] | EachProps>) {
    const type = req.query.type as FetchType;

    const data = await fetchJsonDB(type);
    if (type === 'each') {
        const idx = Number(req.query.index);
        res.status(200).json((data as EachProps[])[idx]);
    }

    res.status(200).json(data as IndexProps[]);
}