import axios from 'axios';
import useSWR from 'swr';
import dump from '../dump.json';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { fetchCurrentTaxis } from './api/index';

export const getStaticProps: GetStaticProps<any> = async () => {
    return {
        props: {
            data: await fetchCurrentTaxis()
        },
        revalidate: 1
    }
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const App: React.FC<any> = (props) => {
    const [cnt, setCnt] = useState<number>(0);
    const { data, error } = useSWR<any>('/api', fetcher, {fallbackData: props.data, refreshInterval: 100});
    
    const { ts, count } = data.features[0].properties.timestamp;
    const coordinates = data.features[0].geometry.coordinates;
    
    useEffect(() => {
        setCnt(cnt + 1);
    }, [data]);

    console.log('from browser', data.features[0].properties.timestamp, data.features[0].properties.taxi_count);
    
    return (
        <>
            <div>As of 
                <p>{moment.tz(ts, 'Asia/Singapore').toString()}</p>
                there are {count} taxis available in Singapore<br/>
                component re-rendered {cnt} times
            </div>
            <br/>
            {
                coordinates.map((each: any, index: number) => {
                    return (
                        <div key={index}>
                            [ <span>{each[0]}</span>, &emsp;&emsp; <span>{each[1]}</span> ]
                            <br/>
                        </div>
                    )
                })
            }
        </>
    )
}

export default App;