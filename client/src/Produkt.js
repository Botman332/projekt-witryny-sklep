import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Produkt = () => {
  const path = process.env.REACT_APP_PATH;
  const params = useParams();
  const produktID = parseInt(params.id);
  let [produkt, setProdukt] = useState([]);
  //   let produkt = [];

  // POBIERANIE PRODUKTU
  async function getProdukt() {
    await fetch(`${path}/get-produkt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: produktID,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        setProdukt(data);
        console.log(produkt);
      });
  }

  useEffect(() => {
    getProdukt();
  }, []);

  console.log(produkt);

  function DisplayProduct({ prod }) {
    return (
      <div className="produkt">
        {prod.map((product, index) => (
          <div key={index} className="single-product">
            <img src={require("./img/" + product.obraz)} alt={product.nazwa} />
            <h2>{product.nazwa}</h2>
            <p>Cena: {product.cena}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Strona produktu</h2>
      <DisplayProduct prod={produkt} />
      <button>Dodaj do koszyka</button>
    </div>
  );
};

export default Produkt;
