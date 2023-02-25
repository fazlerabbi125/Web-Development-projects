import { useState } from "react";
import {
  Route,
  Outlet,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import MessageContext from "./contexts/MessageContext";
import ProtectedRoutes from "./components/custom-routes/ProtectedRoutes";
import AdminRoutes from "./components/custom-routes/AdminRoutes";
import GuestRoutes from "./components/custom-routes/GuestRoutes";
import TrainerRoutes from "./components/custom-routes/TrainerRoutes";
import TraineeRoutes from "./components/custom-routes/TraineeRoutes";
import LoginPage from "./views/LoginPage";
import ResetPassword from "./views/ResetPassword";
import ForgetPasswordPage from "./views/ForgetPasswordPage";
import ProfilePage from "./views/ProfilePage";
import AccountUpdate from "./views/AccountUpdate";
import CreateTrainingUsers from "./views/AdminViews/CreateTrainingUsers";
import UserList from "./views/AdminViews/UserList";
import EditTrainingUser from "./views/AdminViews/EditTrainingUser";
import AdminCourseList from "./views/AdminViews/AdminCourseList";
import CreateCourse from "./views/AdminViews/CreateCourse";
import CourseDetails from "./views/CourseDetails";
import Lesson from "./views/CourseLesson";
import EditCourse from "./views/AdminViews/EditCourse";
import CreateLesson from "./views/AdminViews/CreateLesson";
import EditLesson from "./views/AdminViews/EditLesson";
import BatchList from "./views/BatchList";
import CreateBatch from "./views/AdminViews/CreateBatch";
import EditBatch from "./views/AdminViews/EditBatch";
import BatchDetails from "./views/BatchDetails";
import TrainerCourseList from "./views/TrainerViews/TrainerCourseList";
import TrainerAssessmentList from "./views/TrainerViews/TrainerAssessmentList";
import CreateEval from "./views/TrainerViews/CreateEval";
import EditEval from "./views/TrainerViews/EditEval";
import EvaluationTasks from "./views/EvaluationTasks";
import CreateTask from "./views/TrainerViews/CreateTask";
import EditTask from "./views/TrainerViews/EditTask";
import SetScore from "./views/TrainerViews/SetScore";
import TrainerPerformance from "./views/TrainerViews/TrainerPerformance";
import TraineeAssessmentList from "./views/TraineeViews/TraineeAssessmentList";
import Home from "./views/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route index element={<Home />} />

        <Route path="user" element={<Outlet />}>
          <Route path=":userID" element={<ProfilePage />} />
          <Route path=":userID/update" element={<AccountUpdate />} />
          <Route
            path=":courseSlug/course-details"
            element={<CourseDetails />}
          />
          <Route
            path=":courseSlug/course-details/:lessonID"
            element={<Lesson />}
          />
          <Route path="batch-list" element={<BatchList />} />
          <Route path=":batchID/batch-details" element={<BatchDetails />} />
        </Route>

        <Route path="admin" element={<AdminRoutes />}>
          <Route path="create-user" element={<CreateTrainingUsers />} />
          <Route path=":eID/edit-user" element={<EditTrainingUser />} />
          <Route path="userlist" element={<UserList />} />
          <Route path="courselist" element={<AdminCourseList />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path=":courseSlug/edit-course" element={<EditCourse />} />
          <Route path=":courseSlug/add-lesson" element={<CreateLesson />} />
          <Route
            path=":courseSlug/:lessonID/edit-lesson"
            element={<EditLesson />}
          />
          <Route path="create-batch" element={<CreateBatch />} />
          <Route path=":batchID/edit-batch" element={<EditBatch />} />
        </Route>
        <Route path="trainer" element={<TrainerRoutes />}>
          <Route path="courselist" element={<TrainerCourseList />} />
          <Route
            path=":batchID/:courseID/assessment-list"
            element={<TrainerAssessmentList />}
          />
          <Route
            path=":batchID/:courseID/create-assessment"
            element={<CreateEval />}
          />
          <Route path=":evalID/edit-assessment" element={<EditEval />} />
          <Route
            path=":evalID/assessment-details"
            element={<EvaluationTasks />}
          />
          <Route path=":evalID/add-task" element={<CreateTask />} />
          <Route path=":evalID/:taskID/edit-task" element={<EditTask />} />
          <Route path=":evalID/set-scores" element={<SetScore />} />
          <Route
            path=":batchID/:courseID/performance"
            element={<TrainerPerformance />}
          />
        </Route>
        <Route path="trainee" element={<TraineeRoutes />}>
          <Route
            path=":batchID/:courseID/assessment-list"
            element={<TraineeAssessmentList />}
          />
          <Route
            path=":evalID/assessment-details"
            element={<EvaluationTasks />}
          />
        </Route>
      </Route>
      <Route element={<GuestRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password/:token/:id" element={<ResetPassword />} />
      </Route>

      <Route
        path="*"
        element={
          <main className="text-center text-danger mt-3">
            <h1>404. Page Not Found</h1>
          </main>
        }
      />
    </>
  )
);

function App() {
  const [message, setMessage] = useState("");
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      <RouterProvider router={router} />
    </MessageContext.Provider>
  );
}

export default App;
