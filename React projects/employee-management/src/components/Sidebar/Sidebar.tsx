import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'
import { SidebarPropTypes } from '../../utils/interfaces';


function Sidebar({show,toggleSidebar}:SidebarPropTypes) {
  return (
    <nav className={show?`${styles.sidebar} ${styles['sidebar--show']}`:styles.sidebar}>
    <div className={styles.sidebar__container}>
      <div className={styles.sidebar__container__heading}>
      <span>EMS</span>
      <button onClick={()=>toggleSidebar(!show)} className="btn--close"></button>
      </div>
      <ul className={styles.sidebar__container__links}>
        <li><NavLink to="/" className={({ isActive }) =>(isActive ? `${styles.sidebar__container__links__item} ${styles['sidebar__container__links__item--active']}`: 
        styles.sidebar__container__links__item)}>
          <i className="fa-solid fa-home"></i>Home</NavLink>
          </li>
        <li>
        <NavLink to="/about" className={({ isActive }) =>(isActive ? `${styles.sidebar__container__links__item} ${styles['sidebar__container__links__item--active']}`: 
        styles.sidebar__container__links__item)}>
          <i className="fa-solid fa-circle-info"></i>About</NavLink>
          </li>
        <li>
        <NavLink to="/employee/create" className={({ isActive }) =>(isActive ? `${styles.sidebar__container__links__item} ${styles['sidebar__container__links__item--active']}`: 
        styles.sidebar__container__links__item)}>
          <i className="fa-solid fa-circle-plus"></i>Create Employee</NavLink>
        </li>
      </ul>
    </div>
    </nav>
  )
}



export default Sidebar
