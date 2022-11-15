import React from "react";
import Layout from "../../components/Layout";
import "./Home.css";
import { useSelector } from "react-redux";
// trainingImage URL: https://elearningindustry.com/wp-content/uploads/2019/12/the-value-of-employee-training.jpg

const Home = () => {
    const auth = useSelector((state) => state.authUser.userData);
    return (
        <Layout>
            <section className="home">
                <div>
                    <img src="/img/employee-training.jpg" alt="training" className="home__img" />
                </div>
                <div className="home__content">
                    <h3 className="display-5 home__content__heading">
                        Welcome <span>{auth.name}</span>
                    </h3>
                    {/*span used to keep the words JCIT & Academy together  */}
                    <p>
                        JCIT places great emphasis on developing the best available talent.
                        Participate in your assigned batch courses today to develop your
                        skills and professional career.
                    </p>
                </div>
            </section>
        </Layout>
    );
};

export default Home;
