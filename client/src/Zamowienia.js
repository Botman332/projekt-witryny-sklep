import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"


const Zamowienia = () => {

    let [zamowienia, setZamowienia] = useState([])
    let [selectedZamowienie, setSelectedZamowienie] = useState ([])
    const [isAddShown, setIsAddShown] = useState(false);
    const [isUpdateShown, setIsUpdateShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const addIdKlienta = useRef();
    const addData = useRef();
    const updateIdKlienta = useRef();
    const updateData = useRef();

    // POBIERANIE ZAMÓWIENIA
    async function getZamowienia (){
        await fetch("/get-zamowienia", {
            method: "POST"
        }).then((response) =>{
            return response.json();
        }).then(function (data) {
            setZamowienia(data);
        })
    }
    // USUWANIE ZAMÓWIENIA
    async function handleDelete (zamowienieId) {     
        setLoading(true); 
        await fetch("/delete-zamowienie", {
            method: 'DELETE', // Przyjmij odpowiednią metodę HTTP
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({zamowienieId: zamowienieId})     
        })
        .catch((error) => {
            console.error('Błąd podczas usuwania zamówienia', error);
        })
        .finally(() => {
            setLoading(false);
            getZamowienia();
        });   
      };

 // POKAŻ FORMULARZ DODAWANIA
 function handleAddShow (){
    // setIsAddShown(current => !current); 
    setIsAddShown(true);   
}

function handleUpdateShow (ID, ID_klienta, data){
    // setIsAddShown(current => !current); 
    setIsUpdateShown(true);
    setSelectedZamowienie([ID, ID_klienta, data])
    console.log(selectedZamowienie)   
}
//DODAWANIE ZAMÓWIENIA
async function handleAddZamowienie (e){
    e.preventDefault();

    await fetch("/add-zamowienie",{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({
            ID_klienta: addIdKlienta.current.value,
            data: addData.current.value
        })  
    }).catch((error) => {
        console.error('Błąd podczas dodawania zamówienia', error);
    }).finally(() => {
        getZamowienia();
        setIsAddShown(false);
    });  
}

 // UPDATE PRODUKTU
 async function handleUpdateZamowienie(e){
    e.preventDefault();

    await fetch("/update-zamowienie",{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({
            ID_klienta: updateIdKlienta.current.value,
            data: updateData.current.value,
            id: selectedZamowienie[0]
        })  
    }).catch((error) => {
        console.error('Błąd podczas modyfikowania zamówienia', error);
    }).finally(() => {
        getZamowienia();
        setIsUpdateShown(false);
    });  
}

useEffect(() => {    
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


      useEffect(() => {    
        getZamowienia();
    }, [])
// TABELKA ZAMÓWIEŃ
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
                                <td>
                                    <button onClick={() => handleDelete(item.zamowienie_ID)} className="tabButt">Usuń</button>
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateShow(item.zamowienie_ID, item.klient_ID, convertDate(item.data))} className="tabButt">Zmodyfikuj</button>
                                </td>
                            </tr>
                            ))
                    )}
                    
                </tbody>
            </table>
            <button onClick={handleAddShow} className="pAddButt">Dodaj zamówienie</button>
            </div>
        );
      }

 // FORMULARZ DODAWANIA
 function AddForm (){
    return(
        <form className="prodaddForm" onSubmit={handleAddZamowienie}>
            <h2>Dodaj zamówienie</h2>

            <label>ID Klienta</label>
            <br/>
            <input type="text" ref={addIdKlienta} required/>
            <br/>

            <label>Data</label>
            <br/>
            <input type="text" ref={addData} required/>
            <br/>

            <button type="submit" className="prodaddButton">Dodaj</button>
        </form>
    )
  }

        // FORMULARZ UPDATOWANIA
        function UpdateForm (data){
            return(
                <form className="produpdateForm" onSubmit={handleUpdateZamowienie}>
                    <h2>Zmodyfikuj zamówienie</h2>
    
                    <label>ID Klienta</label>
                    <br/>
                    <input type="text" ref={updateIdKlienta} required defaultValue={selectedZamowienie[1]} />
                    <br/>
                    <label>Data</label>
                    <br/>
                    <input type="text" ref={updateData} required defaultValue={selectedZamowienie[2]}/>
                    <br/>
                    <button type="submit" className="produpdateButton">Zmodyfikuj</button>
                </form>
            )
          }









    return ( 
    <div className="zamowienia">
                <Link to="/Admin" className='BackButton'>Wróć</Link> 
        <br></br>
        <h1>Zamówienia</h1>
      <Table data={zamowienia} className="zamTab"/>
      {isAddShown && <AddForm />}
      {isUpdateShown && <UpdateForm />}   
    </div> 
    );
}
 
export default Zamowienia;