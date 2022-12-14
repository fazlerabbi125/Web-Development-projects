import { Container } from "@mantine/core";
import Head from "next/head";
import React from "react";

export default function Tags() {
  return (
    <Container size="md" className="mt-20">
      <Head>
        <title>Recipe Tags</title>
      </Head>
      <div>Tags</div>
    </Container>
  );
}
