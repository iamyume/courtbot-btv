import 'tailwindcss/tailwind.css';
import Head from "next/head";

function App({ Component, pageProps }) {
    return (
        <>
            {/* Add the favicon */}
            <Head>
                <link rel="icon" href="/imgs/courtbot-btv-32x32.png" sizes="32x32" />
                <link rel="icon" href="/imgs/courtbot-btv-192x192.png" sizes="192x192" />
            </Head>

            <Component {...pageProps} />
        </>
    );
}

export default App