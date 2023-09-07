export async function getTaxiData() {
    const data = await fetch("https://api.data.gov.sg/v1/transport/taxi-availability").then((res: Response) => res.json());

    // console.log(data.features[0].properties.timestamp, data.features[0].properties.taxi_count);

    return {
        data: {
            timestamp: data.features[0].properties.timestamp,
            count: data.features[0].properties.taxi_count
        }
    }
}