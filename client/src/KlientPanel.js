import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const KlientPanel = () => {
  const path = process.env.REACT_APP_PATH;
  const params = useParams();
  const klientID = parseInt(params.id);
  const [currentDbUserID, setcurrentDbUserID] = useState([]);
  const { currentUser } = useAuth();
  let [klienci, setKlienci] = useState([]);
  const [isUpdateShown, setIsUpdateShown] = useState(false);
  const [UpdateLoginDataShown, setUpdateLoginDataShown] = useState(false);

  const updateimie = useRef();
  const updatenazwisko = useRef();
  const updatemiejscowosc = useRef();
  const updatekod_pocztowy = useRef();
  const updateadres = useRef();

  const updateEmail = useRef();
  const updateEmailPowtorz = useRef();
  const updatePassword = useRef();
  const updatePasswordPowtorz = useRef();

  // POBIERANIE KLIENTÓW
  async function getKlienci(id) {
    await fetch(`${path}/get-klient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        klientID: klientID,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        setKlienci(data);
      });
  }

  // UPDATE KLIENTA
  async function handleUpdateClient(e) {
    e.preventDefault();

    await fetch(`${path}/update-klient-dane`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imie: updateimie.current.value,
        nazwisko: updatenazwisko.current.value,
        miejscowosc: updatemiejscowosc.current.value,
        kod_pocztowy: updatekod_pocztowy.current.value,
        adres: updateadres.current.value,
        id: klienci[0].klient_ID,
      }),
    })
      .catch((error) => {
        console.error("Błąd podczas modyfikowania produktu", error);
      })
      .finally(() => {
        getKlienci();
        setIsUpdateShown(false);
      });
  }

  useEffect(() => {
    setcurrentDbUserID(klientID);
    getKlienci();
  }, []);

  function handleUpdateLoginDataShown() {
    setUpdateLoginDataShown(true);
  }

  async function handleUpdateLoginData(e) {
    e.preventDefault();
    if (updateEmail.current.value == updateEmailPowtorz.current.value) {
      await fetch(`${path}/update-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: updateEmail.current.value,
          klientID: klienci[0].klient_ID,
        }),
      })
        .catch((error) => {
          console.error("Błąd podczas modyfikowania użytkownika", error);
        })
        .finally(() => {
          getKlienci();
          setUpdateLoginDataShown(false);
        });
      await currentUser
        .updateEmail(updateEmail.current.value)
        .then(() => {
          // Update successful
          // ...
        })
        .catch((error) => {
          console.log("Error while modyfing user email");
        });
    } else {
      alert("Adresy email nie są takie samie");
    }
  }

  function handleUpdateShow() {
    setIsUpdateShown(true);
  }

  // TABELKA WYŚWIETLAJĄCA KLIENTÓW
  function Table({ data }) {
    let ref = useRef();

    return (
      <div className="tabelka">
        {typeof data === "undefined" ? (
          <p>Loading...</p>
        ) : (
          data.map((item, index) => (
            <div key={index}>
              <p>{item.imie}</p>
              <p>{item.nazwisko}</p>
              <p>{item.miejscowosc}</p>
              <p>{item.kod_pocztowy}</p>
              <p>{item.adres}</p>
              <p>{item.email}</p>
              {/* <td>
                                    <button onClick={() => handleDelete(item.produkt_ID)} className="tabButt">Usuń</button>
                                </td> */}

              <button onClick={() => handleUpdateShow()} className="tabButt">
                Edytuj swoje dane
              </button>
            </div>
          ))
        )}
      </div>
    );
  }

  // FORMULARZ UPDATOWANIA
  function UpdateForm(data) {
    return (
      // ID_klienta, ID_użytkownika, imie, nazwisko, miejscowosc, kod_pocztowy, adres
      <form className="produpdateForm" onSubmit={handleUpdateClient}>
        <h2>Zmodyfikuj produkt</h2>

        <label>Imie</label>
        <br></br>
        <input
          type="text"
          ref={updateimie}
          required
          defaultValue={klienci[0].imie}
        />
        <br></br>
        <label>Nazwisko</label>
        <br></br>
        <input
          type="text"
          ref={updatenazwisko}
          required
          defaultValue={klienci[0].nazwisko}
        />
        <br></br>
        <label>Miejscowość</label>
        <br></br>
        <input
          type="text"
          ref={updatemiejscowosc}
          required
          defaultValue={klienci[0].miejscowosc}
        />
        <br></br>
        <label>Kod pocztowy</label>
        <br></br>
        <input
          type="text"
          ref={updatekod_pocztowy}
          required
          defaultValue={klienci[0].kod_pocztowy}
        />
        <br></br>
        <label>Adres</label>
        <br></br>
        <input
          type="text"
          ref={updateadres}
          required
          defaultValue={klienci[0].adres}
        />
        <br></br>
        <button type="submit" className="produpdateButton">
          Potwierdź
        </button>
      </form>
    );
  }

  function UpdateLoginDataForm() {
    return (
      <form action="" onSubmit={handleUpdateLoginData}>
        <br />
        <label htmlFor="email">Podaj nowy adres email</label>
        <br />
        <input type="text" name="email" id="" required ref={updateEmail} />
        <br />

        <label htmlFor="emailPowtorz">Powtórz adres email</label>
        <br />
        <input
          type="text"
          name="emailPowtorz"
          id=""
          required
          ref={updateEmailPowtorz}
        />
        <br />
        <button type="submit">Potwierdź</button>
      </form>
    );
  }

  return (
    <div>
      <h1>Klienci</h1>
      <Table data={klienci} className="panTab" />
      {isUpdateShown && <UpdateForm />}
      <button onClick={handleUpdateLoginDataShown}>
        Zmień swoje dane logowania
      </button>
      {UpdateLoginDataShown && <UpdateLoginDataForm />}
    </div>
  );
};

export default KlientPanel;
