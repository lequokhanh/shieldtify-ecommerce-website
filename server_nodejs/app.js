const express = require('express');
const app = express();
const api = require('./src/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
