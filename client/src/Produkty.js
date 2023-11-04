import React, { useRef, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
const Produkty = () => {
    
    let [produkty, setProdukty] = useState([])
    let [selectedProduct, setSelectedProduct] = useState ([])
    const [isAddShown, setIsAddShown] = useState(false);
    const [isUpdateShown, setIsUpdateShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const addNazwa = useRef();
    const addCena = useRef();
    const addOpis = useRef();
    const addKategoria = useRef();
    const updateNazwa = useRef();
    const updateCena = useRef();
    const updateOpis = useRef();
    const updateKategoria = useRef();

    // POBIERANIE PRODUKTU
    async function getProdukty (){
        await fetch("/get-produkty", {
            method: "POST"
        }).then((response) =>{
            return response.json();
        }).then(function (data) {
            setProdukty(data);
        })
    }

    // USUWANIE PRODUKTU
    async function handleDelete (productId) {     
        setLoading(true); 
        await fetch("/delete-produkt", {
            method: 'DELETE', // Przyjmij odpowiednią metodę HTTP
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({productId: productId})     
        })
        .catch((error) => {
            console.error('Błąd podczas usuwania produktu', error);
        })
        .finally(() => {
            setLoading(false);
            getProdukty();
        });   
      };

    // POKAŻ FORMULARZ DODAWANIA
    function handleAddShow (){
        // setIsAddShown(current => !current); 
        setIsAddShown(true);   
    }

    function handleUpdateShow (ID, nazwa, cena, opis){
        // setIsAddShown(current => !current); 
        setIsUpdateShown(true);
        setSelectedProduct([ID, nazwa, cena, opis])
        console.log(selectedProduct)   
    }

    //DODAWANIE PRODUKTU
    async function handleAddProduct (e){
        e.preventDefault();

        await fetch("/add-product",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({
                nazwa: addNazwa.current.value,
                cena: addCena.current.value,
                opis: addOpis.current.value,
                kategoria: addKategoria.current.value
            })  
        }).catch((error) => {
            console.error('Błąd podczas dodawania produktu', error);
        }).finally(() => {
            getProdukty();
            setIsAddShown(false);
        });  
    }

    // UPDATE PRODUKTU
    async function handleUpdateProduct(e){
        e.preventDefault();

        await fetch("/update-product",{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({
                nazwa: updateNazwa.current.value,
                cena: updateCena.current.value,
                opis: updateOpis.current.value,
                kategoria: updateKategoria.current.value,
                id: selectedProduct[0]
            })  
        }).catch((error) => {
            console.error('Błąd podczas modyfikowania produktu', error);
        }).finally(() => {
            getProdukty();
            setIsUpdateShown(false);
        });  
    }

    useEffect(() => {    
        getProdukty();
    }, [])


    // TABELKA WYŚWIETLAJĄCA PRODUKTY
    function Table({ data }) {
        let ref = useRef();

        return (
            <div className="tabelka">
            <table>
                <thead>
                    <tr>
                    <th>ID produktu</th>
                    <th>Nazwa</th>
                    <th>Cena</th>
                    <th>Opis</th>
                    <th>Kategoria</th>
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
                                <td>{item.produkt_ID}</td>
                                <td>{item.nazwa}</td>
                                <td>{item.cena}</td>
                                <td>{item.opis}</td>
                                <td>{item.kategoria}</td>
                                <td>
                                    <button onClick={() => handleDelete(item.produkt_ID)} className="tabButt">Usuń</button>
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateShow(item.produkt_ID, item.nazwa, item.cena, item.opis)} className="tabButt">Zmodyfikuj</button>
                                </td>
                            </tr>
                        ))
                    )}                  
                </tbody>
            </table>
            <button onClick={handleAddShow} className="pAddButt">Dodaj produkt</button>
            </div>
        );
      }

      // FORMULARZ DODAWANIA
      function AddForm (){
        return(
            <form className="prodaddForm" onSubmit={handleAddProduct}>
                <h2>Dodaj produkt</h2>

                <label>Nazwa</label>
                <br/>
                <input type="text" ref={addNazwa} required/>
                <br/>

                <label>Cena</label>
                <br/>
                <input type="text" ref={addCena} required/>
                <br/>

                <label>Opis</label>
                <br/>
                <input type="text" ref={addOpis} required/>
                <br/>
                
                
                <label for="addKategoria">Kategoria</label>
                <br/>
                <select name="addKategoria" id="addKategoria" ref={addKategoria} required>
                <option value="" selected disabled hidden>Wybierz kategorie</option>
                <option value="1">Rock</option>
                <option value="2">Pop</option>
                <option value="3">Hip-Hop</option>
                <option value="4">Muzyka klasyczna</option>
                <option value="5">Jazz</option>
                </select>
                <br/>

                <button type="submit" className="prodaddButton">Dodaj</button>
            </form>
        )
      }

      // FORMULARZ UPDATOWANIA
      function UpdateForm (data){
        return(
            <form className="produpdateForm" onSubmit={handleUpdateProduct}>
                <h2>Zmodyfikuj produkt</h2>

                <label>Nazwa</label>
                <br/>
                <input type="text" ref={updateNazwa} required defaultValue={selectedProduct[1]} />
                <br/>
                <label>Cena</label>
                <br/>
                <input type="text" ref={updateCena} required defaultValue={selectedProduct[2]}/>
                <br/>
                <label>Opis</label>
                <br/>
                <input type="text" ref={updateOpis} required defaultValue={selectedProduct[3]}/>
                <br/>

                <label for="updateKategoria">Kategoria</label>
                <br/>
                <select name="updateKategoria" id="updateKategoria" ref={updateKategoria}>
                <option value="" selected disabled hidden>Wybierz kategorie</option>
                <option value="1">Rock</option>
                <option value="2">Pop</option>
                <option value="3">Hip-Hop</option>
                <option value="4">Muzyka klasyczna</option>
                <option value="5">Jazz</option>
                </select>
                <br/>
                <button type="submit" className="produpdateButton">Zmodyfikuj</button>
            </form>
        )
      }

    return ( 
        <div className="produkty">
                    <Link to="/Admin" className='BackButton'>Wróć</Link> 
        <br></br>
            <h1>Produkty</h1>
      <Table data={produkty} className="panTab" />
      {isAddShown && <AddForm />}
      {isUpdateShown && <UpdateForm />}  
        </div>
     );
}
 
export default Produkty;