import React from "react";
import {
    FileButton,
    Text,
    ButtonProps,
    Button as MButton,
} from "@mantine/core";
import { IconFile, IconFiles, IconUpload } from "@tabler/icons";
import styles from "./FileInput.module.scss";

export type SingleFile = File | null;
export type MultiFile = File[] | null;

export interface FileInputProps {
    buttonClassName?: string;
    labelClassName?: string;
    accept?: string;
    multiple?: boolean;
    onChange?: (value: SingleFile | MultiFile) => void;
    required?: {
        value: boolean;
        err?: string;
    };
    inputLabel: string;
    buttonLabel?: string;
    btnColor?: ButtonProps["color"];
    limit?: {
        value: number;
        err?: string;
    };
}

export default function FileInput(props: FileInputProps) {
    const [fileInputError, setFileInputError] = React.useState<{
        required?: string;
        limit?: string;
    }>({});

    function handleSingleFileChange(payload: SingleFile) {
        props.onChange && props.onChange(payload);
    }
    function handleMultiFileChange(payload: MultiFile) {
        props.onChange && props.onChange(payload);
    }

    return (
        <div className={styles["file-input__group"]}>
            <Text fw={500} className={props.labelClassName}>
                {props.inputLabel}
            </Text>
            <FileButton
                accept={props.accept}
                multiple={props.multiple}
                onChange={
                    props.multiple ? handleMultiFileChange : handleSingleFileChange
                }
            >
                {(btnProps) => (
                    <MButton
                        {...btnProps}
                        color={!props.buttonClassName ? props.btnColor : ""}
                        className={props.buttonClassName}
                    >
                        {props.buttonLabel || "Upload image"}
                        <IconUpload
                            style={{
                                marginLeft: "0.25rem",
                                maxWidth: "1rem",
                            }}
                        />
                    </MButton>
                )}
            </FileButton>
        </div>
    );
}
