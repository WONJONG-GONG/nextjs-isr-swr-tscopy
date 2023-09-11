import { GetStaticProps } from "next";
import { fetchSafeList } from "../api";
import Link from "next/link";

export const getStaticProps: GetStaticProps<any> = async () => {
    return {
        props: {
            data: await fetchSafeList()
        },
        revalidate: 1
    }
}

const Page: React.FC<any> = (props) => {
    return (
        props.data.map((each: any) => {
            // 4327/sample_2259365041004b5bd833256ee51bb5fa261b56c4.jpg?4515965
            return (
                <Link href={`/post/${each.id}`}>
                    <img src={`https://safebooru.org//samples/${each.directory}/sample_${each.image}?${each.id}`} alt='' />
                </Link>
            )
        })
    );
}

export default Page;