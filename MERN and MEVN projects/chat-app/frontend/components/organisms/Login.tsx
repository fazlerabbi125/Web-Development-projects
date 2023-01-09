import React from 'react'
import { useRouter } from 'next/router';
import { Stack, TextInput, PasswordInput, Button as MButton } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';

export default function Login() {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length < 6 ? "Password must at least have 6 characters" : null,
        },
    });
    return (
        <Stack spacing="lg" w={"80%"} mx={"auto"} mb="xl">
            <TextInput
                label="Email"
                {...form.getInputProps('email')}
            />
            <PasswordInput
                label="Password"
                {...form.getInputProps('password')}
            />
            <MButton className='btn--primary' mt="1rem">
                Login
            </MButton>
        </Stack>
    )
}
