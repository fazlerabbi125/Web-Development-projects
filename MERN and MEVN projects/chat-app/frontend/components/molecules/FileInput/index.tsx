import React from "react";
import {
    FileButton,
    Text,
    ButtonProps,
    Button as MButton,
} from "@mantine/core";
import { IconFile, IconUpload } from "@tabler/icons";
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
    const [fileInput, setFileInput] = React.useState<SingleFile | MultiFile>(
        null
    );
    console.log(fileInput);
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

    function renderFileInput() {
        if (!fileInput) return null;
        else if (props.multiple) {
            const fileArray = fileInput as File[];
            return fileArray.map((file: File) => <div>{file.name}</div>);
        }
        const file = fileInput as File;
        return (
            <div className={styles["file-input__upload__file--single"]}>
                <IconFile size={20} />{file.name}
            </div>
        );
    }

    const handleFileChange = React.useCallback(
        (payload: SingleFile | MultiFile) => {
            setFileInput(payload);
            props.multiple
                ? handleMultiFileChange(payload as MultiFile)
                : handleSingleFileChange(payload as SingleFile);
        },
        [props.multiple, props.required]
    );

    React.useEffect(() => {
        setFileInput(null);
    }, [props.multiple]);

    return (
        <div className={styles["file-input__group"]}>
            <Text fw={500} className={props.labelClassName}>
                {props.inputLabel}
            </Text>
            <div className={styles["file-input__upload"]}>
                <FileButton
                    accept={props.accept}
                    multiple={props.multiple}
                    onChange={handleFileChange}
                >
                    {(btnProps) => (
                        <MButton
                            {...btnProps}
                            color={!props.buttonClassName ? props.btnColor : ""}
                            className={props.buttonClassName}
                        >
                            {props.buttonLabel || "Upload image"}
                            <IconUpload size={16} className="ml-1" />
                        </MButton>
                    )}
                </FileButton>
                {renderFileInput()}
            </div>
        </div>
    );
}
