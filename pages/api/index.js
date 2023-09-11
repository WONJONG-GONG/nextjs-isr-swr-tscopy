export async function fetchCurrentTaxis() {
    return fetch('https://api.data.gov.sg/v1/transport/taxi-availability').then(res => res.json());
}

export async function fetchSafeList() {
    return fetch('https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1').then(res => res.json());
}

export async function fetchDB(arg) {
    return fetch(`http://localhost:8080/${arg}`).then(rse => res.json());
}

export default async function handler(req, res){
    const type = req.query.type;

    if (type === 'taxi') {
        const data = await fetchCurrentTaxis();
        console.log(`from ${type} handler`, data.features[0].properties.timestamp, data.features[0].properties.taxi_count);
        return res.status(200).json(data);
    }

    const data = await fetchSafeList();
    console.log(`from ${type} handler`, data);
    return res.status(200).json(data);
}