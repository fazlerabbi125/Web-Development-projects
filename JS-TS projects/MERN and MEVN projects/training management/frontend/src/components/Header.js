import { useSelector } from "react-redux";
const Header = ({ header }) => {
    const auth = useSelector((state) => state.authUser.userData);
    return (
        <header className={auth ? "auth__header" : "guest__header"}>
            <h1 className="display-6">
                {auth ? header || "JCIT Academy" : "JCIT Academy"}
            </h1>
        </header>
    );
};
export default Header;
