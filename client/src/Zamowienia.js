import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"


const Zamowienia = () => {

    let [zamowienia, setZamowienia] = useState([])


    useEffect(() => {
        async function getZamowienia (){
            await fetch("/get-zamowienia", {
                method: "POST"
            }).then((response) =>{
                return response.json();
            }).then(function (data) {
                setZamowienia(data);
            })
        }
        getZamowienia();
    }, [])
    

    function convertDate(inputDate) {
        const date = new Date(inputDate); 
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = String(date.getFullYear()); 
      
        const formattedDate = `${day}-${month}-${year}`;      
        return formattedDate;
      }

    function Table({ data }) {

        return (
            <div className="tabelka">
            <table>
                <thead>
                    <tr>
                    <th>ID zamówienia</th>
                    <th>ID klienta</th>
                    <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                {(typeof data === 'undefined') ? (
                    <p>Loading...</p>
                    ): (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.zamowienie_ID}</td>
                                <td>{item.klient_ID}</td>
                                <td>{convertDate(item.data)}</td>
                            </tr>
                            ))
                    )}
                    
                </tbody>
            </table>
            </div>
        );
      }

    return ( 
    <div className="zamowienia">
        <h1>Zamówienia</h1>
      <Table data={zamowienia} /> {/* Przekazanie danych do komponenty Table */}
    </div> 
    );
}
 
export default Zamowienia;