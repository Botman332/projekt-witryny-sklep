import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="navbar">
            <Link to="/">Strona główna</Link>
            <Link to="Zaloguj">Zaloguj się</Link>
        </div>
     );
}
 
export default Navbar;