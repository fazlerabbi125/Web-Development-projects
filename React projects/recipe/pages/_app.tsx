import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "../components/templates/Layout";
import RenderGate from "@/components/templates/RenderGate";
import SEOTags from "@/seo-tags";
import "../styles/globals.scss";
import "video.js/dist/video-js.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/videoJS-player.scss"; //custom styles to alter default from "video.js/dist/video-js.css"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <SEOTags pageProps={pageProps} pathname={router.pathname} />
      <RenderGate>
        <Layout>{<Component {...pageProps} />}</Layout>
      </RenderGate>
    </>
  );
}
