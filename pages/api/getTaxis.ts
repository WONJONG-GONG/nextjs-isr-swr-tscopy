import { NextApiRequest, NextApiResponse } from "next";

export async function fetchCurrentTaxis() {
    return fetch('https://api.data.gov.sg/v1/transport/taxi-availability').then(res => res.json());
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const data = await fetchCurrentTaxis();
    console.log(`from getTaxis handler`, data.features[0].properties.timestamp, data.features[0].properties.taxi_count);
    return res.status(200).json(data);
}