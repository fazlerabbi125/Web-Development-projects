import React from 'react'
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

function LessonForm({ lesson, course, submitForm }) {
    const { courseSlug } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: lesson.title || "",
            content: lesson.content || "",
        }
    });
    const onSubmit = data => {
        const inputs = { ...data, course }
        submitForm(inputs);
    }
    return (
        <section className='card auth__form'>
            <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
                <div className="mb-3">
                    <div className="row justify-content-center ">
                        <div className="col-auto">
                            <label className="col-form-label">Title:</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" {...register("title", {
                                required: "Title is required",
                                minLength: {
                                    value: 3,
                                    message: "Title must be at least 3 characters long."
                                }
                            })}
                            />
                        </div>
                    </div>
                    {errors.title && <div className="text-center text-danger fw-bolder">{errors.title.message}</div>}
                </div>
                <div className="mb-3 ">
                    <div className='col-8 mx-auto'>
                        <label htmlFor="details" className="form-label">Lesson Content</label>
                        <textarea className="form-control" id="details" rows="3"
                            {...register('content', {
                                required: "content is required",
                                minLength: {
                                    value: 10,
                                    message: "content must be at least 10 characters long."
                                }
                            })}
                        ></textarea>
                    </div>
                    {errors.content && <div className="text-center text-danger fw-bolder">{errors.content.message}</div>}
                </div>
                <div className="row justify-content-center gap-2">
                    <Link to={`/user/${courseSlug}/course-details`} role="button" className="col-4 btn btn-secondary">Back</Link>
                    <input className='col-4 btn btn-dark' type="submit" value="Submit" />
                </div>
            </form>
        </section>
    )
}

export default LessonForm