import { fetchJsonDB } from "@/pages/api";
import { GetStaticPaths, GetStaticProps } from "next"
import axios from "axios";
import useSWR from "swr";

interface ItemProps {
    id: number;
    guid: string;
    isActive: boolean;
    name: string;
    gender: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    about: string;
    registered: string;
    latitude: number;
    longitude: number;
    tags: string[];
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await fetchJsonDB('index');
    const paths = data.map((each: any, index: number) => {
        return {
            params: {
                id: index.toString()
            }
        }
    });

    return {
        paths, 
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const index = params ? Number(params.id) : 0;
    return {
        props: {
            data: (await fetchJsonDB('each'))[index],
            index
        },
        revalidate: 1
    }
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Page: React.FC<{ data: ItemProps, index: number }> = (props) => {
    const { data, error } = useSWR<ItemProps>(`/api/getJsonDB?type=each&index=${props.index}`, fetcher, {fallbackData: props.data});

    return (
        data ? <p>{data.about}</p> : <></>
    )
}

export default Page;