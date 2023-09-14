import { fetchJsonDB } from "@/pages/api";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { EachProps, IndexProps } from "@/pages/api/jsonDB/getJsonDB";

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await fetchJsonDB('index') as IndexProps[];
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
    console.log(`It is currently --------------- ${new Date().toString()}`);

    const arr = await fetchJsonDB('each') as EachProps[];
    const index = params ? Number(params.id) : 0;
    return {
        props: {
            data: arr[index],
            index
        },
        revalidate: 10
    }
}

const Page: React.FC<{ data: EachProps | undefined, index: number }> = (props) => {
    const { data } = props;

    return (
        data ? <p>{data.about}</p> : <>NO DATA</>
    )
}

export default Page;