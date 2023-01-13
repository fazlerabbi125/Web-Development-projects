import React from "react";
import {
    Stack,
    TextInput,
    PasswordInput,
    FileInput,
    Button as MButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

const Register = () => {
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },

        validate: {
            name: (value) => value.length < 2 ? "Name must at least have 2 characters" : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            password: (value) => value.length < 6 ? "Password must at least have 6 characters" : null,
            confirmPassword: (value, values) => value === values.password ? "Password must at least have 6 characters" : null,
        },
    });
    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Stack spacing="lg" w={"80%"} mx={"auto"} mb="xl">
                <TextInput label="Name" withAsterisk {...form.getInputProps("name")} />
                <TextInput
                    label="Email"
                    withAsterisk
                    {...form.getInputProps("email")}
                />
                <PasswordInput
                    label="Password"
                    withAsterisk
                    {...form.getInputProps("password")}
                />
                <PasswordInput
                    label="Confirm password"
                    withAsterisk
                    {...form.getInputProps("confirmPassword")}
                />
                <MButton className="btn--primary" mt="1rem" type="submit">
                    Register
                </MButton>
            </Stack>
        </form>
    );
};

export default Register;