import useSWR from 'swr';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { fetchCurrentTaxis } from '../api';

export const getStaticProps: GetStaticProps<any> = async () => {
    console.log(`It is currently --------------- ${new Date().toString()}`);
    return {
        props: {
            data: await fetchCurrentTaxis()
        },
        revalidate: 30
    }
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Page: React.FC<any> = (props) => {
    const [cnt, setCnt] = useState<number>(0);
    const { data, error } = useSWR<any>('/api/currentTaxi/getTaxis', fetcher, {fallbackData: props.data, refreshInterval: 1000});
    
    const { timestamp, taxi_count } = data.features[0].properties;
    const coordinates = data.features[0].geometry.coordinates;

    useEffect(() => {
        setCnt(cnt + 1);
    }, [data]);

    return (
        <>
            <div>As of 
                <p>{moment.tz(timestamp, 'Asia/Singapore').toString()}</p>
                there are {taxi_count} taxis available in Singapore<br/>
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
    );
}

export default Page;