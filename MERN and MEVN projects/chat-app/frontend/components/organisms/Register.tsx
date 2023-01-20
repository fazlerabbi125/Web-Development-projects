import React from "react";
import {
    Stack,
    TextInput,
    PasswordInput,
    Button as MButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import FileInput, { SingleFile } from "../molecules/FileInput";

interface RegisterFormFields {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    photo: File | "";
}

const Register = () => {
    const form = useForm<RegisterFormFields>({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            photo: "", //NextJS retrieves file as string instead of File object
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
                <FileInput
                    inputLabel="Photo:"
                    buttonLabel="Upload photo"
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                    onChange={(value) =>
                        form.setFieldValue("photo", (value as SingleFile) || "")
                    }
                    btnColor="gray"
                />
                <MButton className="btn--primary" mt="1rem" type="submit">
                    Register
                </MButton>
            </Stack>
        </form>
    );
};

export default Register;
