import React from 'react'
import Layout from '../../components/Layout';
import paginationButtons from '../../utils/paginationButtons'
import { axInstance } from '../../hooks/useAxios';
import {getTokens} from "../../utils/handleStorage";
import useDebounce from '../../hooks/useDebounce';
import CourseList from '../../components/CourseList';

function TrainerCourseList() {
    const itemsPerPage = 2;
    const [page, setPage] = React.useState(1);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [courseList,setCourseList]=React.useState([]);
    const [total,setTotal]=React.useState(null);

    const [title,setTitle]=React.useState("");
    const debouncedTitle=useDebounce(title);

    const pageBtns=paginationButtons(page,total,itemsPerPage,setPage);

    React.useEffect(() => {
        axInstance.get(`/trainer/get-courses?page=${page}&itemsPerPage=${itemsPerPage}&title=${debouncedTitle}`,{
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`,
            }
        }).then(function (response) {
                if (!response.data || !response.data.success){
                    console.log(response.response.data.errors);
                    throw new Error(response.response.data.message);
                }
                setCourseList(response.data.results.courseList);
                setTotal(response.data.results.size);
                setError(null);
                setIsLoading(false);
            })
            .catch(function (err) {
                setError(err.message);
                setIsLoading(false);
        });
    },[page,debouncedTitle]);
    return (
        <Layout header='Your Assigned Courses'>
        <CourseList isLoading={isLoading} error={error} courseList={courseList} title={title} 
        setTitle={setTitle} size={total} pageBtns={pageBtns}/>
        </Layout>
    )
}

export default TrainerCourseList;

