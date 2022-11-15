import React from "react";
import Layout from "../../components/Layout";
import paginationButtons from "../../utils/paginationButtons";
import { useAxios } from "../../hooks/useAxios";
import useDebounce from "../../hooks/useDebounce";
import CourseList from "../../components/CourseList";

function TrainerCourseList() {
    const itemsPerPage = 2;
    const [page, setPage] = React.useState(1);
    const [courseList, setCourseList] = React.useState([]);
    const [total, setTotal] = React.useState(null);

    const [title, setTitle] = React.useState("");
    const debouncedTitle = useDebounce(title);

    const { data, error, isLoading } = useAxios(
        `/trainer/get-courses?page=${page}&itemsPerPage=${itemsPerPage}&title=${encodeURIComponent(
            debouncedTitle
        )}`
    );

    React.useEffect(() => {
        setCourseList(data?.courseList);
        setTotal(data?.size);
    }, [page, debouncedTitle, data?.courseList, data?.size]);

    const pageBtns = paginationButtons(page, total, itemsPerPage, setPage);

    return (
        <Layout header="Your Assigned Courses">
            <CourseList
                isLoading={isLoading}
                error={error}
                courseList={courseList}
                title={title}
                setTitle={setTitle}
                size={total}
                pageBtns={pageBtns}
            />
        </Layout>
    );
}

export default TrainerCourseList;
