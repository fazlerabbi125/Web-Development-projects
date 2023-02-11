import { useSelector } from "react-redux";

export default function Header() {
    const auth = useSelector((state) => state.authUser.userData);
    return (
        <header className={auth ? "auth__header" : "guest__header"}>
            <h1 className="display-6">JCIT Academy</h1>
        </header>
    );
};