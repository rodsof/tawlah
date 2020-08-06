import React from 'react';
import Header from './Header';
import Head from 'next/head';
import Footer from './Footer';

const Layout = props => {
    return ( 
        <>
           <Head>
        <title>Tawlah</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="TAWLAH: This site allows you to publish your menu and to manage table booking. "
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </>
     );
}
 
export default Layout;