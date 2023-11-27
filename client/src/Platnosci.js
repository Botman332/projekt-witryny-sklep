import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const Platnosci = () => {

    const path = process.env.REACT_APP_PATH
    let [platnosci, setPlatnosci] = useState([])
    let [selectedPlatnosci, setSelectedPlatnosci] = useState ([])
    const [isAddShown, setIsAddShown] = useState(false);
    const [isUpdateShown, setIsUpdateShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const addIdZamowienia = useRef();
    const addIdStatusu = useRef();
    const addSposob = useRef();
    const addCena = useRef();
    const addData = useRef();
    const updateIdZamowienia = useRef();
    const updateIdStatusu = useRef();
    const updateSposob = useRef();
    const updateCena = useRef();
    const updateData = useRef();

    // POBIERANIE PŁATNOŚCI
    async function getPlatnosci (){
        await fetch(`${path}/get-platnosci`, {
            method: "POST"
        }).then((response) =>{
            return response.json();
        }).then(function (data) {
            setPlatnosci(data);
            
        })
    }


 // POKAŻ FORMULARZ DODAWANIA
 function handleAddShow (){
    // setIsAddShown(current => !current); 
    setIsAddShown(true);   
}

function handleUpdateShow (ID, ID_zamowienia, ID_statusu, sposob, cena, data){
    // setIsAddShown(current => !current); 
    console.log(selectedPlatnosci[5])  
    setIsUpdateShown(true);
    setSelectedPlatnosci([ID, ID_zamowienia, ID_statusu, sposob, cena, data])
     
}
//DODAWANIE PŁATNOŚCI
async function handleAddPlatnosc (e){
    e.preventDefault();

    await fetch(`${path}/add-platnosc`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({
            ID_zamowienia: addIdZamowienia.current.value,
            ID_statusu: addIdStatusu.current.value,
            sposob: addSposob.current.value,
            cena: addCena.current.value,
            data: addData.current.value
        })  
    }).catch((error) => {
        console.error('Błąd podczas dodawania płatności', error);
    }).finally(() => {
        getPlatnosci();
        setIsAddShown(false);
    });  
}

 // UPDATE PŁATNOŚCI
 async function handleUpdatePlatnosc(e){
    e.preventDefault();

    await fetch(`${path}/update-platnosc`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({
            ID_zamowienia: updateIdZamowienia.current.value,
            ID_statusu: updateIdStatusu.current.value,
            sposob: updateSposob.current.value,
            cena: updateCena.current.value,
            data: updateData.current.value,
            id: selectedPlatnosci[0]
        })  
    }).catch((error) => {
        console.error('Błąd podczas modyfikowania płatności', error);
    }).finally(() => {
        getPlatnosci();
        setIsUpdateShown(false);
    });  
}

useEffect(() => {    
    getPlatnosci();
}, [])


    function convertDate(inputDate) {
        const date = new Date(inputDate); 
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = String(date.getFullYear()); 
      
        const formattedDate = `${day}-${month}-${year}`;      
        return formattedDate;
      }

      function convertDateToIso(inputDate) {
        const date = new Date(inputDate); 
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = String(date.getFullYear()); 
      
        const formattedDate = `${year}-${month}-${day}`;      
        return formattedDate;
      }

      useEffect(() => {    
        getPlatnosci();
    }, [])
// TABELKA PŁATNOŚCI
    function Table({ data }) {

        return (
            <div className="tabelka">
            <table>
                <thead>
                    <tr>
                    <th>ID płatności</th>
                    <th>ID zamówienia</th>
                    <th>Status</th>
                    <th>Sposób</th>
                    <th>Cena</th>
                    <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                {(typeof data === 'undefined') ? (
                    <p>Loading...</p>
                    ): (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.platnosc_ID}</td>
                                <td>{item.zamowienie_ID}</td>
                                <td>{item.nazwa}</td>
                                <td>{item.sposob}</td>
                                <td>{item.cena}</td>
                                <td>{convertDate(item.data)}</td>
                                <td>
                                    <button onClick={() => handleUpdateShow(item.platnosc_ID, item.zamowienie_ID, item.nazwa,  item.sposob,  item.cena, convertDate(item.data))} className="tabButt">Zmodyfikuj</button>
                                </td>
                            </tr>
                            ))
                    )}
                    
                </tbody>
            </table>
            <button onClick={handleAddShow} className="pAddButt">Dodaj płatność</button>
            </div>
        );
      }

 // FORMULARZ DODAWANIA
 function AddForm (){
    return(
        <form className="prodaddForm" onSubmit={handleAddPlatnosc}>
            <h2>Dodaj płatność</h2>

            <label>ID Zamówienia</label>
            <br/>
            <input type="text" ref={addIdZamowienia} required/>

            <br/>
            <label for="addIdStatusu">Status</label>
                <br/>
                <select name="addIdStatusu" id="addIdStatusu" ref={addIdStatusu} required>
                <option value="" selected disabled hidden>Wybierz status płatności</option>
                <option value="1">Oczekuje na płatność</option>
                <option value="2">Opłacone</option>
                </select>
            <br/>
            <label>Sposób Płatności</label>
            <br/>
            <input type="text" ref={addSposob} required/>
            <br/>
            <label>Cena</label>
            <br/>
            <input type="text" ref={addCena} required/>
            <br/>
            <label>Data</label>
            <br/>
            <input type="date" ref={addData} required/>
            <br/>

            <button type="submit" className="prodaddButton">Dodaj</button>
        </form>
    )
  }

        // FORMULARZ UPDATOWANIA
        function UpdateForm (data){
            return(
                <form className="produpdateForm" onSubmit={handleUpdatePlatnosc}>
                    <h2>Zmodyfikuj płatność</h2>
    
                    <label>ID Zamówienia</label>
                    <br/>
                    <input type="text" ref={updateIdZamowienia} required defaultValue={selectedPlatnosci[1]} />
                    <br/>
                    <label for="updateIdStatusu">Status</label>
                    <br/>
                    <select name="updateIdStatusu" id="updateIdStatusu" ref={updateIdStatusu} required>
                        <option value="" selected disabled hidden>Wybierz status płatności</option>
                        <option value="1">Oczekuje na płatność</option>
                        <option value="2">Opłacone</option>
                    </select>
                    <br/>
                    <label>Sposób Płatności</label>
                    <br/>
                    <input type="text" ref={updateSposob} required defaultValue={selectedPlatnosci[3]} />
                    <br/>
                    <label>Cena</label>
                    <br/>
                    <input type="text" ref={updateCena} required defaultValue={selectedPlatnosci[4]} />
                    <br/>
                    <label>Data</label>
                    <br/>
                    <input type="date" ref={updateData} required defaultValue={selectedPlatnosci[5]}/>
                    <br/>
                    <button type="submit" className="produpdateButton">Zmodyfikuj</button>
                </form>
            )
          }


    return ( 
    <div className="platnosci">
                <Link to="/Admin" className='BackButton'>Wróć</Link> 
        <br></br>
        <h1>Płatności</h1>
      <Table data={platnosci} className="platTab"/>
      {isAddShown && <AddForm />}
      {isUpdateShown && <UpdateForm />}   
    </div> 
    );
}
 
export default Platnosci;