import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
    return (
        <div>
            <Head>
                <title>Solscipiton</title>
                <meta
                    name="description"
                    content="Solscipiton"
                />
            </Head>
            <HomeView />
        </div>
    );
};

export default Home;
