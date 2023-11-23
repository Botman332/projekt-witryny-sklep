const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "UserTwo", "UserThree"] });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// connection.query('SELECT * FROM users', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);

// });

app.post("/register-user", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  connection.query(
    {
      sql: "INSERT INTO users (email, password) VALUES(?, ?)",
      values: [req.body.email, hashedPassword],
    },
    function (error, results, fields) {
      if (error) throw error;
      // console.log(results);
    }
  );
  // console.log(req.body.email);
  res.send("succes");
});

//cft6&YGV
//Zrobić bugfixa żeby nie sprawdzał roli konta które nie istnieje
app.post("/admin-login", async (req, res) => {
  connection.query(
    {
      sql: "SELECT rola FROM users WHERE email=?",
      values: [req.body.email],
    },
    function (error, results, fields) {
      if (error) throw error;
      res.json(results[0].rola);
    }
  );
});

// POBIERANIE ZAMÓWIEŃ
app.post("/get-zamowienia", async (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM zamowienie",
    },
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

// POBIERANIE PRODUKTÓW
app.post("/get-produkty", async (req, res) => {
  connection.query(
    {
      sql: "SELECT produkty.produkt_ID, produkty.nazwa, produkty.opis, produkty.cena, produkty.obraz, kategorie.nazwa AS kategoria FROM produkty INNER JOIN kategorie ON produkty.kategoria_ID = kategorie.id ORDER BY produkt_ID ASC",
    },
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.post("/get-klienci", async (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM klienci INNER JOIN users on klienci.uzytkownik_ID = users.user_id ORDER BY 1 ASC",
    },
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

// USUWANIE PRODUKTU
app.delete("/delete-produkt", async (req, res) => {
  connection.query(
    {
      sql: "DELETE FROM produkty WHERE produkt_ID=?",
      values: [req.body.productId],
    },
    function (error, results, fields) {
      if (error) throw error;
      res.send("succes");
    }
  );
});

// DODAWANIE PRODUKTU
// WALIDACJA CENY W FORMULARZU
app.post("/add-product", async (req, res) => {
  connection.query(
    {
      sql: "INSERT INTO produkty (nazwa, opis, cena, kategoria_ID) VALUES (?, ?, ?, ?)",
      values: [
        req.body.nazwa,
        req.body.cena,
        req.body.opis,
        req.body.kategoria,
      ],
    },
    function (error, results, fields) {
      if (error) throw error;
      res.send("succes");
    }
  );
});

// MODYFIKOWANIE PRODUKTU
app.put("/update-product", async (req, res) => {
  connection.query(
    {
      sql: "UPDATE produkty SET nazwa = ?, cena = ?, opis=?, kategoria_ID=? WHERE produkt_ID = ?",
      values: [
        req.body.nazwa,
        req.body.cena,
        req.body.opis,
        req.body.kategoria,
        req.body.id,
      ],
    },
    function (error, results, fields) {
      if (error) throw error;
      res.send("succes");
    }
  );
});

app.put("/update-klient", async (req, res) => {
  connection.query(
    {
      sql: "UPDATE klienci SET imie= ?, nazwisko = ?, miejscowosc=?, kod_pocztowy=?, adres=?, notatka=? WHERE klient_ID = ?",
      values: [
        req.body.imie,
        req.body.nazwisko,
        req.body.miejscowosc,
        req.body.kod_pocztowy,
        req.body.adres,
        req.body.notatka,
        req.body.id,
      ],
    },
    function (error, results, fields) {
      if (error) throw error;
      res.send("succes");
    }
  );
});

//  POBIERANIE KATEGORII
app.post("/get-kategorie", async (req, res) => {
  connection.query(
    {
      sql: "SELECT * FROM kategorie ORDER BY 1 ASC",
    },
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//  USUWANIE KATEGORII
app.delete("/delete-kategoria", async (req, res) => {
  connection.query(
    {
      sql: "DELETE FROM kategorie WHERE id=?",
      values: [req.body.kategoriaID],
    },
    function (error, results, fields) {
      if (error) throw error;
      res.send("succes");
    }
  );
});

//  DODAWANIE KATEGORII
app.post("/add-kategoria", async (req, res) => {
  connection.query(
    {
      sql: "INSERT INTO kategorie (nazwa) VALUES (?)",
      values: [req.body.nazwa],
    },
    function (error, results, fields) {
      if (error) throw error;
      res.send("succes");
    }
  );
});

app.put("/update-kategoria", async (req, res) => {
  connection.query(
    {
      sql: "UPDATE kategorie SET nazwa = ? WHERE id = ?",
      values: [req.body.nazwa, req.body.id],
    },
    function (error, results, fields) {
      if (error) throw error;
      res.send("succes");
    }
  );
});

app.post("/get-platnosci", async (req, res) => {
  connection.query(
    {
      sql: "SELECT platnosci.platnosc_ID, platnosci.zamowienie_ID, statusy.nazwa, platnosci.sposob, platnosci.cena, platnosci.data FROM platnosci INNER JOIN statusy ON platnosci.status_ID = statusy.status_ID ORDER BY 1 ASC",
    },
    function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.post("/add-platnosc", async (req, res) => {
  connection.query(
    {
      sql: "INSERT INTO platnosci (zamowienie_ID, status_ID, sposob, cena, data) VALUES (?, ?, ?, ?, ?)",
      values: [
        req.body.ID_zamowienia,
        req.body.ID_statusu,
        req.body.sposob,
        req.body.cena,
        req.body.data,
      ],
    },
    function (error, results, fields) {
      if (error) throw error;
      res.send("succes");
    }
  );
});

app.put("/update-platnosc", async (req, res) => {
  connection.query(
    {
      sql: "UPDATE platnosci SET zamowienie_ID=?, status_ID=?, sposob=?, cena=?, data=? WHERE platnosc_ID=?",
      values: [
        req.body.ID_zamowienia,
        req.body.ID_statusu,
        req.body.sposob,
        req.body.cena,
        req.body.data,
        req.body.id,
      ],
    },
    function (error, results, fields) {
      if (error) throw error;
      res.send("succes");
    }
  );
});

// connection.end();
