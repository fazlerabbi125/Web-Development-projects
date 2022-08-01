import React from 'react'
import withHoc from '../../utils/withHoc'
import './Home.css'
// import trainingImage from '../../assets/images/the-value-of-employee-training.jpg'

const Home = () => {
    return (
    <section className='home'>
        <div>
            <img src="https://elearningindustry.com/wp-content/uploads/2019/12/the-value-of-employee-training.jpg" alt="training" className='home__img'/>
        </div>
        <div className='home__content'>
            <h2 className='display-5 home__content__heading'>Welcome to <span>JCIT Academy</span></h2>{/*span used to keep the words JCIT & Academy together  */}
            <p>JCIT places great emphasis on developing the best available talent. Participate in your assigned batch courses today to develop your skills and professional career.</p>
        </div>
    </section>
    )
}

export default withHoc('JCIT Academy',Home)