import { Title, Text, Flex } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import notFoundImg from "@/public/assets/images/cross-cultery.jpg";

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
                mt="lg"
                className="relative mb-12"
            >
                <Image
                    src={notFoundImg}
                    alt="cross-cultery"
                    className="md:w-[30%] max-sm:w-8/12"
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
