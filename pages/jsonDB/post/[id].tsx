import { fetchJsonDB } from "@/pages/api";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import axios from "axios";

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

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    const index = params ? Number(params.id) : 0;
    console.log(`It is currently --------------- ${new Date().toString()}`);
    return {
        props: {
            data: (await fetchJsonDB('each'))[index],
            index
        },
        revalidate: 10
    }
}

const Page: React.FC<{ data: ItemProps | undefined, index: number }> = (props) => {
    const { data } = props;

    return (
        data ? <p>{data.about}</p> : <>NO DATA</>
    )
}

export default Page;