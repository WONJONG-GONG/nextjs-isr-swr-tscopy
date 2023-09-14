import { NextApiRequest, NextApiResponse } from "next";
import { BASEURL, REQUEST_HEADER } from '../constants';

export async function fetchCurrentTaxis() {
    return fetch('https://api.data.gov.sg/v1/transport/taxi-availability').then(res => res.json());

    // 共通定数の使用
    {
        REQUEST_HEADER['Content-Type'] = 'fjkdsjf'; // 既存 header の修正
        REQUEST_HEADER['New-Property'] = 'fjdksjf'; // 既存 header に追加
        return fetch(`${BASEURL}/somePath`, { headers: REQUEST_HEADER }).then(res => res.json());
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const data = await fetchCurrentTaxis();
    console.log(`from getTaxis handler`, data.features[0].properties.timestamp, data.features[0].properties.taxi_count);
    return res.status(200).json(data);
}