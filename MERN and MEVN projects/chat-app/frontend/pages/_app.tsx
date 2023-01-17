import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import store, { persistor } from '../store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
