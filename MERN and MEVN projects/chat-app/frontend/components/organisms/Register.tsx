import React from "react";
import {
    Stack,
    Text,
    Group,
    TextInput,
    PasswordInput,
    FileButton,
    Button as MButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface RegisterFormFields {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    photo: File | null;
}

const Register = () => {
    const form = useForm<RegisterFormFields>({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            photo: null, //NextJS retrieves file as string instead of File object
        },
        validate: {
            name: (value) =>
                value.length < 2 ? "Name must at least have 2 characters" : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            password: (value) =>
                value.length < 6 ? "Password must at least have 6 characters" : null,
            confirmPassword: (value, values) =>
                value !== values.password ? "Passwords must match" : null,
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
                <Group spacing="md" align="baseline">
                    <Text fw={500}>Photo:</Text>
                    <FileButton
                        accept="image/png, image/jpeg, image/webp, image/jpg"
                        onChange={(value) => {
                            form.setFieldValue("photo", value);
                        }}
                    >
                        {(props) => (
                            <MButton {...props} color="gray">
                                Upload photo
                            </MButton>
                        )}
                    </FileButton>
                </Group>
                <MButton className="btn--primary" mt="1rem" type="submit">
                    Register
                </MButton>
            </Stack>
        </form>
    );
};

export default Register;
