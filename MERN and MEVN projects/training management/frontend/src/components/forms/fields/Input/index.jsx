import React from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";

export default function Input({
    name,
    label,
    type,
    required,
    vertical,
    description,
    register,
    validationSchema,
    formError,
}) {
    return (
        <div
            className={classNames(
                styles["input-field"],
                vertical
                    ? styles["input-field--vertical"]
                    : styles["input-field--horizontal"]
            )}
        >
            {label && (
                <label htmlFor={name} className={styles["input-field__label"]}>
                    {label}
                    {required && (
                        <span className={styles["input-field__label--required"]}>*</span>
                    )}
                </label>
            )}
            <input
                type={type}
                name={name}
                {...register(name, validationSchema)}
                className={classNames(
                    styles["input-field__form-field"],
                    formError && styles["input-field__form-field--error"]
                )}
            />
            {description && (
                <div className={styles["input-field__description"]}>{description}</div>
            )}
            {formError && (
                <div className={classNames("form-error", styles["input-field__err"])}>
                    {formError.message}
                </div>
            )}
        </div>
    );
}
