import React, { useRef, useState, useEffect } from "react"

const Produkty = () => {
    
    let [produkty, setProdukty] = useState([])
    let [selectedProduct, setSelectedProduct] = useState ([])
    const [isAddShown, setIsAddShown] = useState(false);
    const [isUpdateShown, setIsUpdateShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const addNazwa = useRef();
    const addCena = useRef();
    const addOpis = useRef();
    const updateNazwa = useRef();
    const updateCena = useRef();
    const updateOpis = useRef();

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
        console.log(ID + nazwa + cena + opis)
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
                opis: addOpis.current.value
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
                                <td>
                                    <button onClick={() => handleDelete(item.produkt_ID)}>Usuń</button>
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateShow(item.produkt_ID, item.nazwa, item.cena, item.opis)}>Zmodyfikuj</button>
                                </td>
                            </tr>
                        ))
                    )}                  
                </tbody>
            </table>
            <button onClick={handleAddShow}>Dodaj produkt</button>
            </div>
        );
      }

      // FORMULARZ DODAWANIA
      function AddForm (){
        return(
            <form className="addForm" onSubmit={handleAddProduct}>
                <h2>Dodaj produkt</h2>

                <label>Nazwa</label>
                <input type="text" ref={addNazwa} required/>

                <label>Cena</label>
                <input type="text" ref={addCena} required/>

                <label>Opis</label>
                <input type="text" ref={addOpis} required/>

                <button type="submit">Dodaj</button>
            </form>
        )
      }

      // FORMULARZ UPDATOWANIA
      function UpdateForm (data){
        return(
            <form className="updateForm" onSubmit={handleUpdateProduct}>
                <h2>Zmodyfikuj produkt</h2>

                <label>Nazwa</label>
                <input type="text" ref={updateNazwa} required defaultValue={selectedProduct[1]} />

                <label>Cena</label>
                <input type="text" ref={updateCena} required defaultValue={selectedProduct[2]}/>

                <label>Opis</label>
                <input type="text" ref={updateOpis} required defaultValue={selectedProduct[3]}/>

                <button type="submit">Zmodyfikuj</button>
            </form>
        )
      }

    return ( 
        <div className="produkty">
            <h1>Produkty</h1>
      <Table data={produkty} />
      {isAddShown && <AddForm />}
      {isUpdateShown && <UpdateForm />}  
        </div>
     );
}
 
export default Produkty;