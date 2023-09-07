import { getTaxiData } from '../../lib/helpers'

export default async function handler(req, res){
    const data = await fetch("https://api.data.gov.sg/v1/transport/taxi-availability").then(res => res.json());

    console.log('from handler', data.features[0].properties.timestamp, data.features[0].properties.taxi_count);

	res.status(200).json(data);
}
