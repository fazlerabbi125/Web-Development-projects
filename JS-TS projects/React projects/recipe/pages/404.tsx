import { Title, Text, Flex } from "@mantine/core";
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
                className="relative mb-12"
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
                    className="absolute top-2 text-4xl"
                >
                    404
                </Text>
                <div className="text-center">
                    <Title className="font-sans text-zinc-50 mb-1">
                        Page Not Found
                    </Title>
                    <Text weight={700} size={20}>
                        Sorry, we couldn't find the page you were looking for
                    </Text>
                </div>
            </Flex>
        </>
    );
}
