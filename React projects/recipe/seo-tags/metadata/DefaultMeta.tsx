export default function DefaultMeta() {
    const siteName = "Faiyaz's Recipes";
    return (
        <>
            <title>{siteName}</title>
            <meta property="og:title" content={siteName} />
            {/*Default og:type is website i.e. <meta property="og:type" content="website" /> */}
            <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
            {/* If next/image is not used, imported image source is found from IMG_IMPORT.src */}
            <meta property="og:image" content={process.env.NEXT_PUBLIC_HOST + "/assets/images/cutlery.svg"} />
            <meta property="og:site_name" content={siteName} />
        </>
    );
}
