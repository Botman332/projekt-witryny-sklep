import React, { useRef, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"

const Klienci = () => {
    
    let [klienci, setKlienci] = useState([])
    let [selectedKlient, setSelectedKlient] = useState ([])
    const [isUpdateShown, setIsUpdateShown] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateID_klienta = useRef();
    const updateID_użytkownika = useRef();
    const updateimie = useRef();
    const updatenazwisko = useRef();
    const updatemiejscowosc = useRef();
    const updatekod_pocztowy = useRef();
    const updateadres = useRef();
    const updatenotatka = useRef();

    // POBIERANIE KLIENTÓW 
    async function getProdukty (){
        await fetch("/get-klienci", {
            method: "POST"
        }).then((response) =>{
            return response.json();
        }).then(function (data) {
            setKlienci(data);
        })
    }

    // USUWANIE KLIENTA
    // async function handleDelete (productId) {     
    //     setLoading(true); 
    //     await fetch("/delete-produkt", {
    //         method: 'DELETE', // Przyjmij odpowiednią metodę HTTP
    //         headers: {
    //             "Content-Type": "application/json",
    //           },
    //         body: JSON.stringify({productId: productId})     
    //     })
    //     .catch((error) => {
    //         console.error('Błąd podczas usuwania produktu', error);
    //     })
    //     .finally(() => {
    //         setLoading(false);
    //         getProdukty();
    //     });   
    //   };


    function handleUpdateShow (ID_klienta, ID_użytkownika, imie, nazwisko, miejscowosc, kod_pocztowy, adres, notatka){
        // setIsAddShown(current => !current); 
        setIsUpdateShown(true);
        setSelectedKlient([ID_klienta, ID_użytkownika, imie, nazwisko, miejscowosc, kod_pocztowy, adres, notatka]) 
    }


    // UPDATE KLIENTA
    async function handleUpdateProduct(e){
        e.preventDefault();

        await fetch("/update-klient",{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({
                imie: updateimie.current.value,
                nazwisko: updatenazwisko.current.value,
                miejscowosc: updatemiejscowosc.current.value,
                kod_pocztowy: updatekod_pocztowy.current.value,
                adres: updateadres.current.value,
                notatka: updatenotatka.current.value,
                id: selectedKlient[0]
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


    // TABELKA WYŚWIETLAJĄCA KLIENTÓW
    function Table({ data }) {
        let ref = useRef();

        return (
            <div className="tabelka">
            <table>
                <thead>
                    <tr>
                    <th>ID Klienta</th>
                    <th>ID Użytkownika</th>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Miejscowość</th>
                    <th>Kod pocztowy</th>
                    <th>Adres</th>
                    <th>Email</th>
                    <th>Notatka</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody> 
                {(typeof data === 'undefined') ? (
                    <p>Loading...</p>
                    ): (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.klient_ID}</td>
                                <td>{item.uzytkownik_ID}</td>
                                <td>{item.imie}</td>
                                <td>{item.nazwisko}</td>
                                <td>{item.miejscowosc}</td>
                                <td>{item.kod_pocztowy}</td>
                                <td>{item.adres}</td>
                                <td>{item.email}</td>
                                <td>{item.notatka}</td>
                                {/* <td>
                                    <button onClick={() => handleDelete(item.produkt_ID)} className="tabButt">Usuń</button>
                                </td> */}
                                <td>
                                    <button onClick={() => handleUpdateShow(
                                        item.klient_ID,
                                        item.uzytkownik_ID,
                                        item.imie,
                                        item.nazwisko,
                                        item.miejscowosc,
                                        item.kod_pocztowy,
                                        item.adres,
                                        item.notatka
                                        )} className="tabButt">Zmodyfikuj</button>
                                </td>
                            </tr>
                        ))
                    )}                  
                </tbody>
            </table>
            </div>
        );
      }

      

      // FORMULARZ UPDATOWANIA
      function UpdateForm (data){
        return(
            // ID_klienta, ID_użytkownika, imie, nazwisko, miejscowosc, kod_pocztowy, adres
            <form className="produpdateForm" onSubmit={handleUpdateProduct}>
                <h2>Zmodyfikuj produkt</h2>

                <label>ID klienta</label>
                <br></br>
                <input type="text" ref={updateID_klienta} required disabled defaultValue={selectedKlient[0]} />
                <br></br>
                <label>ID użytkownika</label>
                <br></br>
                <input type="text" ref={updateID_użytkownika} required disabled defaultValue={selectedKlient[1]}/>
                <br></br>
                <label>Imie</label>
                <br></br>
                <input type="text" ref={updateimie} required defaultValue={selectedKlient[2]}/>
                <br></br>
                <label>Nazwisko</label>
                <br></br>
                <input type="text" ref={updatenazwisko} required defaultValue={selectedKlient[3]}/>
                <br></br>
                <label>Miejscowość</label>
                <br></br>
                <input type="text" ref={updatemiejscowosc} required defaultValue={selectedKlient[4]}/>
                <br></br>
                <label>Kod pocztowy</label>
                <br></br>
                <input type="text" ref={updatekod_pocztowy} required defaultValue={selectedKlient[5]}/>
                <br></br>
                <label>Adres</label>
                <br></br>
                <input type="text" ref={updateadres} required defaultValue={selectedKlient[6]}/>
                <br></br>
                <label>Notatka</label>
                <br></br>
                <input type="text" ref={updatenotatka} required defaultValue={selectedKlient[7]}/>
                <br></br>
                <button type="submit" className="produpdateButton">Zmodyfikuj</button>
            </form>
        )
      }

    return ( 
        <div className="klienci">
        <Link to="/Admin" className='BackButton'>Wróć</Link> 
        <br></br>
            <h1>Klienci</h1>
      <Table data={klienci} className="panTab" />
      {isUpdateShown && <UpdateForm />}
        </div>
     );
}
 
export default Klienci;