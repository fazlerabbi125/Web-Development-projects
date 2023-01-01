import { ReactNode } from "react";
import { Button as MButton, ButtonProps } from "@mantine/core";
import { useRouter } from "next/router";
import { UrlObject } from "url";

interface NavButtonProps extends ButtonProps {
    url: string | UrlObject;
    handleClick?: () => void;
    children?: ReactNode;
}

export default function NavButton({
    url,
    children,
    handleClick,
    ...rest
}: NavButtonProps) {
    const router = useRouter();

    const redirectTo = () => {
        if (handleClick) handleClick();
        router.push(url);
    }

    return <MButton {...rest} onClick={redirectTo}>{children}</MButton>;
}
