import React, { useRef, useState, useEffect } from "react"

const Produkty = () => {
    
    let [produkty, setProdukty] = useState([])
    // let [selectedProduct, setSelectedProduct] = useState ()
    const [isShown, setIsShown] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleDelete (productId) {
        // setIsShown(current => !current);
        
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
            document.location.reload();
        });

        
      };


    useEffect(() => {
        async function getProdukty (){
            await fetch("/get-produkty", {
                method: "POST"
            }).then((response) =>{
                return response.json();
            }).then(function (data) {
                setProdukty(data);
            })
        }
        getProdukty();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

      }

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
                            </tr>
                            ))
                    )}
                    
                </tbody>
            </table>

            {isShown && <Form />}

            </div>
        );
      }

      function Form ({data}){
        return(
            <form className="editForm" onSubmit={handleSubmit}>
                <h2>Edytuj produkt</h2>

                <label>Nazwa</label>
                <input type="text" required defaultValue={""} />

                <label>Cena</label>
                <input type="text" required defaultValue={""}/>

                <label>Opis</label>
                <input type="text" required defaultValue={""}/>

                <button type="submit">Edytuj</button>
            </form>
        )
      }

    return ( 
        <div className="produkty">
            <h1>Produkty</h1>
      <Table data={produkty} /> 
        </div>
     );
}
 
export default Produkty;