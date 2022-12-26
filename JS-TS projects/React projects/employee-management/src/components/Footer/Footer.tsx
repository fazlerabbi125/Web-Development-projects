import styles from "./Footer.module.css"

const Footer = () => {
    //Add multiple style classes from module.css via strings
    return ( 
        <footer className={styles[`sticky-footer`]}>
            <div className={`${styles[`sticky-footer__content`]} `}>
            Fazle Rabbi Faiyaz. All rights reserved <i className="fa fa-copyright"></i>
            </div>
        </footer>

    );
}

export default Footer;