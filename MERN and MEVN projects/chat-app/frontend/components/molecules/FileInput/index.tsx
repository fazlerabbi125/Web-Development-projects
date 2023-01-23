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

interface FileErrMsg {
    required?: string;
    limit?: string;
}

export interface FileInputProps {
    buttonClassName?: string;
    labelClassName?: string;
    accept?: string;
    multiple?: boolean;
    onChange?: (value: SingleFile | MultiFile) => void;
    required?: boolean;
    inputLabel: string;
    buttonLabel?: string;
    btnColor?: ButtonProps["color"];
    limit?: number;
    errMsg?: FileErrMsg;
}

export default function FileInput(props: FileInputProps) {
    const [fileInput, setFileInput] = React.useState<SingleFile | MultiFile>(
        null
    );
    // console.log(fileInput);
    const [fileInputError, setFileInputError] = React.useState<FileErrMsg | null>(
        null
    );

    function handleSingleFileChange(payload: SingleFile) {
        props.onChange && props.onChange(payload);
    }
    function handleMultiFileChange(payload: MultiFile) {
        props.onChange && props.onChange(payload);
    }

    function renderFileInput() {
        if (!fileInput) return null;
        else if (props.multiple && fileInput?.length) {
            const fileArray = fileInput as File[];
            return fileArray.map((file: File) => (
                <div className={styles["file-input__upload"]}>
                    <IconFile size={20} />
                    {file.name}
                </div>
            ));
        }
        const file = fileInput as File;
        return (
            <div className={styles["file-input__upload"]}>
                <IconFile size={20} />
                {file.name}
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
        <div className={styles["file-input"]}>
            <div
                className={[
                    styles["file-input__group"],
                    props.multiple
                        ? styles["file-input__group--multiple"]
                        : styles["file-input__group--single"],
                ].join(" ")}
            >
                <Text
                    fw={500}
                    className={[styles.input__label, props.labelClassName].join(" ")}
                >
                    {props.inputLabel}
                    {props.required && <span style={{ color: "#fa5252" }}>*</span>}:
                </Text>
                <FileButton
                    accept={props.accept}
                    multiple={props.multiple}
                    onChange={handleFileChange}
                >
                    {(btnProps) => (
                        <MButton
                            {...btnProps}
                            color={!props.buttonClassName ? props.btnColor : ""}
                            className={[styles.input__btn, props.buttonClassName].join(" ")}
                        >
                            {props.buttonLabel || "Upload file"}
                            <IconUpload size={16} className="ml-1" />
                        </MButton>
                    )}
                </FileButton>
                <div className={styles.input__upload}>{renderFileInput()}</div>
            </div>
            {fileInputError && (
                <Text color="red" size="sm">
                    {fileInputError.required || fileInputError.limit}
                </Text>
            )}
        </div>
    );
}
