import { GetStaticProps } from "next";
import { fetchJsonDB } from "@/pages/api";
import Link from "next/link";

interface IndexProps {
    name: string;
    registered: string;
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            data: await fetchJsonDB('index')
        },
        revalidate: 1
    }
}

const Page: React.FC<{ data: IndexProps[] }> = (props) => {
    return (
        props.data.map((each: IndexProps, index: number) => {
            return (
                <Link key={index} href={`/jsonDB/post/${index}`}>
                    <>
                        <h4>{each.name}</h4>
                        <h5>{each.registered}</h5>
                    </>
                    <br/>
                </Link>
            )
        })
    );
}

export default Page;