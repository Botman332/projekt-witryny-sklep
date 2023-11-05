import React, { useRef, useState, useEffect } from "react"

const Kategorie = () => {

    const path = process.env.REACT_APP_PATH
    let [kategorie, setKategorie] = useState([])
    let [selectedKategoria, setSelectedKategoria] = useState ([])
    const [isAddShown, setIsAddShown] = useState(false);
    const [isUpdateShown, setIsUpdateShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const addNazwa = useRef();
    const updateNazwa = useRef();

    // POBIERANIE KATEGORII
    async function getKategorie (){
        await fetch(`${path}/get-kategorie`, {
            method: "POST"
        }).then((response) =>{
            return response.json();
        }).then(function (data) {
            setKategorie(data);
        })
    }

    // USUWANIE KATEGORII
    async function handleDelete (kategoriaID) {     
        setLoading(true); 
        await fetch(`${path}/delete-kategoria`, {
            method: 'DELETE', 
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({kategoriaID: kategoriaID})     
        })
        .catch((error) => {
            console.error('Błąd podczas usuwania kategorii', error);
        })
        .finally(() => {
            setLoading(false);
            getKategorie();
        });   
      };

    // POKAŻ FORMULARZ DODAWANIA
    function handleAddShow (){
        // setIsAddShown(current => !current); 
        setIsAddShown(true);   
    }

    function handleUpdateShow (ID, nazwa){
        // setIsAddShown(current => !current); 
        setIsUpdateShown(true);
        setSelectedKategoria([ID, nazwa])
    }

    //DODAWANIE KATEGORII
    async function handleAddKategoria (e){
        e.preventDefault();

        await fetch(`${path}/add-kategoria`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({
                nazwa: addNazwa.current.value,
            })  
        }).catch((error) => {
            console.error('Błąd podczas dodawania kategorii', error);
        }).finally(() => {
            getKategorie();
            setIsAddShown(false);
        });  
    }

    // UPDATE KATEGORII
    async function handleUpdateKategoria(e){
        e.preventDefault();

        await fetch(`${path}/update-kategoria`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({
                nazwa: updateNazwa.current.value,
                id: selectedKategoria[0]
            })  
        }).catch((error) => {
            console.error('Błąd podczas modyfikowania kategorii', error);
        }).finally(() => {
            getKategorie();
            setIsUpdateShown(false);
        });  
    }

    useEffect(() => {    
        getKategorie();
    }, [])


    // TABELKA WYŚWIETLAJĄCA KATEGORIE
    function Table({ data }) {
        let ref = useRef();

        return (
            <div className="tabelka">
            <table>
                <thead>
                    <tr>
                    <th>ID kategorii</th>
                    <th>Nazwa</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody> 
                {(typeof data === 'undefined') ? (
                    <p>Loading...</p>
                    ): (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.nazwa}</td>
                                <td>
                                    <button onClick={() => handleDelete(item.id)} className="tabButt">Usuń</button>
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateShow(item.id, item.nazwa)} className="tabButt">Zmodyfikuj</button>
                                </td>
                            </tr>
                        ))
                    )}                  
                </tbody>
            </table>
            <button onClick={handleAddShow} className="pAddButt">Dodaj kategorie</button>
            </div>
        );
      } 

      // FORMULARZ DODAWANIA
      function AddForm (){
        return(
            <form className="prodaddForm" onSubmit={handleAddKategoria}>
                <h2>Dodaj Kategorie</h2>

                

                <label>Nazwa</label>
                <br/>
                <input type="text" ref={addNazwa} required/>
                <br/>

                <button type="submit" className="prodaddButton">Dodaj</button>
            </form>
        )
      }

      // FORMULARZ UPDATOWANIA
      function UpdateForm (data){
        return(
            <form className="produpdateForm" onSubmit={handleUpdateKategoria}>
                <h2>Zmodyfikuj produkt</h2>

                <label>ID kategorii</label>
                <br/>
                <input type="text" required disabled defaultValue={selectedKategoria[0]} />
                <br/>

                <label>Nazwa</label>
                <br/>
                <input type="text" ref={updateNazwa} required defaultValue={selectedKategoria[1]} />
                <br/>
                
                <button type="submit" className="produpdateButton">Zmodyfikuj</button>
            </form>
        )
      }

    return ( 
    <div className="kategorie">
        <h1>Kategorie</h1>
        <Table data={kategorie} className="panTab" />
        {isAddShown && <AddForm />}
        {isUpdateShown && <UpdateForm />}  
    </div>
    );
}
 
export default Kategorie;