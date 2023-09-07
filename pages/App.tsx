import { GetStaticProps } from 'next';
import axios from 'axios';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import dump from '../dump.json';

// export const getStaticProps: GetStaticProps<any> = async () => {
//     const { getTaxiData } = require('../lib/helpers');
//     const data = await getTaxiData();

//     return {
//         props: {
//             data
//         },
//         revalidate: 1
//     }
// }

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const App: React.FC<any> = (props) => {
    const { data, error } = useSWR<any>('/api', fetcher, {fallbackData: dump, refreshInterval: 100});

    console.log('*** from browser', data.features[0].properties.timestamp, data.features[0].properties.taxi_count);

    const ts = data ? data.features[0].properties.timestamp : '';
    const count = data ? data.features[0].properties.taxi_count : '';
    const coordinates = data ? data.features[0].geometry.coordinates : [];

    const [cnt, setCnt] = useState<number>(0);

    function refresh() {
        setCnt(cnt + 1);
    }

    useEffect(() => {
        setCnt(cnt + 1);
    }, [data]);

    return (
        <>
            <div>As of 
                <p>{new Date(ts).toString()}</p>
                there are {count} taxis available in Singapore
            </div>
            <br/>
            {
                coordinates.map((each: any) => {
                    return (
                        <>
                            [ <span>{each[0]}</span>, &emsp;&emsp; <span>{each[1]}</span> ]
                            <br/>
                        </>
                    )
                })
            }
        </>
    )
}

export default App;