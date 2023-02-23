import React from "react";
import {
    Text,
    ButtonProps,
    Button as MButton,
} from "@mantine/core";
import { IconFile, IconUpload, IconX } from "@tabler/icons";
import styles from "./FileInput.module.scss";

export type SingleFile = File | null;
export type MultiFile = File[] | null;

interface FileErrMsg {
    required?: string;
    limit?: string;
}

enum defaultErrorMsg {
    REQUIRED = 'This field is required',
    LIMIT = 'File limit has been exceeded'
}

export interface FileInputProps {
    buttonClassName?: string;
    labelClassName?: string;
    accept?: HTMLInputElement["accept"];
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
    const fileRef = React.useRef<HTMLInputElement | null>(null);
    const [fileInputError, setFileInputError] = React.useState<FileErrMsg>({});
    console.log(fileInput, fileInputError);

    function handleSingleFileChange(payload: SingleFile) {
        setFileInput(payload);
        props.onChange && props.onChange(payload);
    }

    function handleMultiFileChange(payload: MultiFile) {
        if (props.limit && payload && payload?.length > props.limit) {
            setFileInputError((prev) => prev && { ...prev, limit: props.errMsg?.limit || defaultErrorMsg.LIMIT });
            setFileInput(null);
        }
        else {
            setFileInputError((prev) => {
                delete prev.limit;
                return prev;
            })
            setFileInput(payload);
            props.onChange && props.onChange(payload);
        }
    }

    function removeFile(index?: number) {
        if (fileInput) {
            if (props.multiple && index !== undefined && fileInput?.length > 1) {
                const updateFiles = (fileInput as File[]).filter((_, idx) => idx !== index);
                setFileInput(updateFiles);
            }
            else setFileInput(null);
        }
    }

    function renderFileInput() {
        if (props.multiple && fileInput?.length) {
            const fileArray = fileInput as File[];
            return fileArray.map((file: File, idx: number) => (
                <div className={styles["file-input__upload"]} key={`${file.name}-${idx}`}>
                    <IconFile size={20} />
                    <span>{file.name}</span>
                    <IconX color="red" size={20} onClick={() => removeFile(idx)} className="hover:cursor-pointer" />
                </div>
            ));
        }
        else if (!props.multiple && fileInput) {
            const file = fileInput as File;
            return (
                <div className={styles["file-input__upload"]}>
                    <IconFile size={20} />
                    <span>{file.name}</span>
                    <IconX color="red" size={20} onClick={() => removeFile()} className="hover:cursor-pointer" />
                </div>
            );
        }
        return null;
    }

    const handleButtonClick = () => fileRef.current?.click();

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const fileValue = event.target.files;
        let payload: SingleFile | MultiFile;
        if (props.required && (!fileValue || fileValue.length === 0)) {
            setFileInputError((prev) => prev && { ...prev, required: props.errMsg?.required || defaultErrorMsg.REQUIRED })
        }
        else {
            setFileInputError((prev) => {
                delete prev.required;
                return prev;
            })
            if (props.multiple) {
                payload = fileValue ? Array.from(fileValue) : null
                handleMultiFileChange(payload);
            }
            else {
                payload = fileValue ? fileValue[0] : null;
                handleSingleFileChange(payload);
            }
        }
    }

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
                <MButton
                    color={!props.buttonClassName ? props.btnColor : ""}
                    className={[styles.input__btn, props.buttonClassName].join(" ")}
                    onClick={handleButtonClick}
                >
                    {props.buttonLabel || "Upload file"}
                    <IconUpload size={16} className="ml-1" />
                    <input type="file"
                        accept={props.accept}
                        multiple={props.multiple}
                        className="hidden"
                        ref={fileRef}
                        required={props.required}
                        onChange={handleFileChange}
                    />
                </MButton>
                {fileInput && <div className={styles.input__upload}>{renderFileInput()}</div>}
            </div>
            {Object.keys(fileInputError).length > 0 && (
                <Text color="red" size="sm">
                    {fileInputError.required || fileInputError.limit}
                </Text>
            )}
        </div>
    );
}
