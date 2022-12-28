import { Text, Flex } from "@mantine/core";
import Head from "next/head";
//https://tailwindui.com/components/marketing/feedback/404-pages

export default function Custom404() {
    return (
        <>
            <Head>
                <title>Page not found</title>
            </Head>
            <Flex
                direction="column"
                align="center"
                justify="center"
                gap="xl"
                className="relative mb-8"
            >
                <img
                    src="/images/cross-cultery.jpg"
                    alt="cross-cultery"
                    className="w-4/12 h-80"
                    style={{ height: "22rem" }}
                />
                <Text
                    color={"#334155"}
                    weight={700}
                    className="absolute top-2 text-4xl break-all"
                >
                    404 Error
                </Text>
                <Text weight={700} className="font-sans text-3xl">
                    Page Not Found
                </Text>
            </Flex>
        </>
    );
}
