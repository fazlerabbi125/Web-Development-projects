import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/templates/Layout';
import { useState } from 'react';
import RouterStateContext from '../contexts/RouterStateContext';

export default function App({ Component, pageProps }: AppProps) {
  const [routerState, setRouterState] = useState<Record<string, any>>({});

  return (
    <RouterStateContext.Provider value={{ routerState, setRouterState }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RouterStateContext.Provider>
  )
}
