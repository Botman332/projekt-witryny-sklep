import { useState } from "react";

const Zaloguj = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return ( 
        <div className="zaloguj">
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="text" required />

                <label>Hasło:</label>
                <input type="password" required />

                <button>Zaloguj się</button>
            </form>
        </div>
     );
}
 
export default Zaloguj;