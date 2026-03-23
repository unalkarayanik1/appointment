const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Ana sayfa
app.get("/", (req, res) => {
  res.send(`
    <h1>Hastane Randevu Sistemi</h1>
    <a href="/randevu">Randevu Al</a>
  `);
});

// Randevu sayfası
app.get("/randevu", (req, res) => {
  res.send(`
    <h2>Randevu Formu</h2>
    <form method="GET" action="/kaydet">
      İsim: <input name="isim" /><br><br>
      Tarih: <input name="tarih" type="date"/><br><br>
      <button type="submit">Kaydet</button>
    </form>
  `);
});

// Randevu kaydetme
app.get("/kaydet", (req, res) => {
  const { isim, tarih } = req.query;

  res.send(`
    <h3>Randevu Alındı</h3>
    <p>İsim: ${isim}</p>
    <p>Tarih: ${tarih}</p>
    <a href="/">Ana Sayfa</a>
  `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server Started on port " + PORT);
});
