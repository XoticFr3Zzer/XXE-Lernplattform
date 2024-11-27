const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware, um JSON und URL-encoded Daten zu parsen
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Statische Dateien aus dem "public"-Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

