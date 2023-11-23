import React, { useRef, useState, useEffect } from "react";

const Home = () => {
  const path = process.env.REACT_APP_PATH;
  let [produkty, setProdukty] = useState([]);
  const [sorted, setSorted] = useState("relevant");

  async function getProdukty() {
    await fetch(`${path}/get-produkty`, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        setProdukty(data);
      });
  }

  useEffect(() => {
    getProdukty();
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSorted(selectedValue);
  };

  useEffect(() => {
    if (sorted === "priceAsc") {
      setProdukty((prevProdukty) => [...prevProdukty].sort(sortByPriceAsc));
    } else if (sorted === "priceDesc") {
      setProdukty((prevProdukty) => [...prevProdukty].sort(sortByPriceDesc));
    } else if (sorted === "relevant") {
      setProdukty((prevProdukty) => [...prevProdukty].sort(sortByRelevant));
    }
  }, [sorted]);

  const sortByRelevant = (a, b) => a.produkt_ID - b.produkt_ID;
  const sortByPriceAsc = (a, b) => a.cena - b.cena;
  const sortByPriceDesc = (a, b) => b.cena - a.cena;

  useEffect(() => {}, [sorted]);

  function ProduktyDisplay({ prod }) {
    return (
      <div className="produkty">
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
    <div className="homepage">
      <h1>STRONA GŁÓWNA</h1>

      <select name="" id="" value={sorted} onChange={handleSelectChange}>
        <option value="relevant">Najbardziej odpowiednie</option>
        <option value="priceAsc">Cena Rosnąco</option>
        <option value="priceDesc">Cena malejąco</option>
      </select>

      <div className="home-main">
        <div className="parametry">
          <ol>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
            <li>Parametr x</li>
          </ol>
        </div>

        <ProduktyDisplay prod={produkty} />
      </div>
    </div>
  );
};

export default Home;
