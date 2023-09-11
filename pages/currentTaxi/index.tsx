"use client"

import axios from 'axios';
import useSWR from 'swr';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { fetchCurrentTaxis } from '../api';

export const getStaticProps: GetStaticProps<any> = async () => {
    return {
        props: {
            data: await fetchCurrentTaxis()
        },
        revalidate: 1
    }
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Page: React.FC<any> = (props) => {
    const [cnt, setCnt] = useState<number>(0);
    const { data, error } = useSWR<any>(`/api/getTaxis?test=dumy`, fetcher, {fallbackData: props.data, refreshInterval: 100});
    
    const { timestamp, taxi_count } = data.features[0].properties;
    const coordinates = data.features[0].geometry.coordinates;

    useEffect(() => {
        setCnt(cnt + 1);
    }, [data]);

    console.log('from browser', data.features[0].properties.timestamp, data.features[0].properties.taxi_count);
    
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