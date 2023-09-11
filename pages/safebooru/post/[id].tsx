import { fetchSafeList } from "@/pages/api";
import { GetStaticPaths, GetStaticProps } from "next"

export const getStaticPaths: GetStaticPaths<any> = async () => {
    const data = await fetchSafeList();
    const paths = data.map((each: any) => {
        return {
            params: {
                id: each.id.toString()
            }
        }
    });

    return {
        paths, 
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
    console.log(params);
    return {
        props: {
            data: await fetchSafeList()
        },
        revalidate: 1
    }
}

const Page: React.FC<any> = (props, context) => {
    const thisPost = props.data.filter((each: any) => each.id === context);
    return (
        <p>{thisPost.tags}</p>
    )
}

export default Page;