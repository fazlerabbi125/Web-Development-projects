import { Text, Flex } from "@mantine/core";
import Head from "next/head";

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
                    style={{height:"22rem"}}
                />
                <Text
                    color={"#334155"}
                    weight={700}
                    className="absolute top-4 font-serif text-4xl break-all	"
                >
                    Oops!
                </Text>
                <Text weight={700} className="font-sans text-3xl">
                    404 - Page Not Found
                </Text>
            </Flex>
        </>
    );
}
