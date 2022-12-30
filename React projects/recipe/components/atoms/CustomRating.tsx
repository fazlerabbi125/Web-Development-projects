import { Rating } from "@mantine/core";

interface CustomRatingProps {
    value?: number | null;
}

export default function CustomRating(props: CustomRatingProps) {
    return (
        <Rating value={props.value ? props.value * 5 : 0} fractions={2} readOnly />
    );
}
