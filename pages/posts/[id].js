//imports all of the important stuff
import Layout from '../../components/layout';
import { getSortedList, getPostData } from '../../lib/posts-json';
import Head from 'next/head';

//function that renders a post page
export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

//returns a list of possible values for 'id'
export async function getStaticPaths() {
    const paths = getSortedList();
    return {
        paths, 
        fallback: false,
    };
}

//fetches necessary data for blog posts with a given id
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}