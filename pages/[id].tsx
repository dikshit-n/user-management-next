import { NextPage, GetStaticPaths, GetStaticProps } from "../data";
import { useRouter } from "next/dist/client/router";
const Home: NextPage = () => {
  const router = useRouter();
  if (router.isFallback) {
    // right now, Next.js's getStaticProps is eecuting
    return <p>Loading now ...</p>;
  }
  return <div>Loaded</div>;
};

// GET_STATIC_PROPS
// * A. You are trying to build pages on build time
// * Increamentally / Lazily build website

// 35M dynamic routes (/store/[id]) -> ahead of time = 0 pages
// /store/1 -> getStaticProps (like getServerSideProps)
// /store/999 -> getStatisProps -> saved for other people

// visiting again
// /store/999 -> served immediatly as static page

// On build time -> STATIC HTML + JSON

// * live: 100K/second -> getServerSideProps -> 100K requests/database [BAD]
// * live: 100K/second -> getStaticProps (with 1 second revalidate) -> 1 request/second on the DB [SUPER AWESOME]

export const getStaticProps: GetStaticProps = (context) => {
  console.log(context.params);
  return { props: {}, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: "product-1" } }],
    fallback: "blocking",
    // fallback: true,
  };
};

export default Home;
