import React from 'react'
import withHoc from '../../utils/withHoc'
import { useSelector, useDispatch } from 'react-redux'
import {fetchCourseList} from '../../store/features/courseListSlice'
import paginationButtons from '../../utils/paginationButtons'
import useDebounce from '../../hooks/useDebounce';
import CourseList from '../../components/CourseList';

function AdminCourseList() {
    const dispatch = useDispatch();
    const itemsPerPage = 3;
    const [page, setPage] = React.useState(1);
    const {data:courselist,error,isLoading,size} = useSelector((state) => state.courseList);

    const [title,setTitle]=React.useState("");
    const debouncedTitle=useDebounce(title);

    React.useEffect(() => {
        dispatch(fetchCourseList({page,itemsPerPage,title:debouncedTitle}));
    },[page,dispatch,debouncedTitle]);

    const pageBtns=paginationButtons(page,size,itemsPerPage,setPage);

    return (
        <CourseList isLoading={isLoading} error={error} courseList={courselist} title={title} 
        setTitle={setTitle} size={size} pageBtns={pageBtns}/>

    )
}

export default withHoc('Available Courses',AdminCourseList);