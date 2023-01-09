import React from "react";
import { Container, Stack, Card } from "@mantine/core";
import Head from "next/head";
import Header from "../components/organisms/Header";
import styles from "../styles/modules/SignIn.module.scss";
import Login from "../components/organisms/Login";
import Register from "../components/organisms/Register";

export default function SignIn() {
    const [selectedTab, setSelectedTab] = React.useState<"login" | "register">(
        "login"
    );
    return (
        <React.Fragment>
            <Head>
                <title>Sign-in</title>
            </Head>
            <Container size="sm" p="lg" mt={"3rem"}>
                <Stack spacing={20}>
                    <Header className={styles["sign-in__header"]}>Chat Nation</Header>
                    <Card p="md">
                        <div className={styles["sign-in__tabs"]}>
                            <button
                                className={[
                                    "btn",
                                    selectedTab === "login"
                                        ? styles["sign-in__tabs__item"]
                                        : styles["sign-in__tabs__item--inactive"],
                                ].join(" ")}
                                onClick={() => setSelectedTab("login")}
                            >
                                Login
                            </button>
                            <button
                                className={[
                                    "btn",
                                    selectedTab === "register"
                                        ? styles["sign-in__tabs__item"]
                                        : styles["sign-in__tabs__item--inactive"],
                                ].join(" ")}
                                onClick={() => setSelectedTab("register")}
                            >
                                Register
                            </button>
                        </div>
                        {selectedTab === "login" ? <Login /> : <Register />}
                    </Card>
                </Stack>
            </Container>
        </React.Fragment>
    );
}
