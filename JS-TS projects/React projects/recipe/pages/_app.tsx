import 'bootstrap/dist/css/bootstrap.min.css';
import 'video.js/dist/video-js.css';
import "../styles/videoJS.scss"; //styles from "video.js/dist/video-js.css"
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/templates/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
