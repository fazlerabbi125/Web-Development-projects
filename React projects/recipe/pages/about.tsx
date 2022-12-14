import { Container } from '@mantine/core';
import Head from "next/head";

export default function About() {
  return (
    <Container size="md" className='mt-20'>
      <Head>
        <title>About</title>
      </Head>
      <div>About</div>
    </Container>
  )
}
