import { NextApiRequest, NextApiResponse } from "next";

type FetchType = 'index' | 'each';

export async function fetchJsonDB(type: FetchType) {
    return fetch(`http://localhost:8080/${type}`).then(res => res.json());
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const type = req.query.type as FetchType;

    const data = await fetchJsonDB(type);
    if (type === 'each') {
        return res.status(200).json(data[Number(req.query.index)]);
    }

    return res.status(200).json(data);
}