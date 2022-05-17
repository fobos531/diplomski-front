import React from 'react';
import { QueryClientProvider } from 'react-query';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { queryClient } from 'app/misc/queryClient';

import '../../styles/globals.css';
import DefaultLayout from '@common/layouts/DefaultLayout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>BOSS</title>
        <meta name="description" content="BOSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default App;
