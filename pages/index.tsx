import { NextPage, GetStaticPaths, GetStaticProps } from "../data";
// import Head from 'next/head'
// import Image from 'next/image'
import { AppLoader } from "../components";
// import classes from '../assets/scss/home.module.scss'

// ENV FILE TYPES
// * .env.local - database passwords

// these files as templates
// * .env.development (STIRPE CLIENT KEY)
// * .env.production

// this code runs in server(SSR) + client(hydration)
const Home: NextPage = () => {
  console.log("SPECIFITY_CHECK = ", process.env.SPECIFITY_CHECK); // this value is not accessible in the browser (for safety)
  return (
    <div>
      index page
      <AppLoader />
    </div>
  );
};

// runs for every request

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.log(process.env.SPECIFITY_CHECK);
//   return {
//     props: {},
//     redirect: {
//       destination: "https://google.com",
//       permanent: false, // 308 307
//       // permanent: true --> the page is redirected and cached. Any changes will not be affected until "Empty cache and hard reload"
//     },
//     // notFound: true,
//   };
// };

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
  console.log(context);
  return { props: {}, revalidate: 1 };
};

// export const getStaicPaths: GetStaticPaths = () => {
//   return {
//     paths: [{ params: { id: 'product-1' } }],
//     fallback: false
//   }
// }

export default Home;
