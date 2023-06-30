const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const path = require('path');
const detectSqlInjection = require('detect-sql-injection');

const app = express();


app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10kb' }));
// Data sanitization against XSS
app.use(xss());
// for sql injection ;
app.use(detectSqlInjection)

const router = require('./Router');
// this router is for login and  signup 
app.use('/auth', router);

// this is for welcome page request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/welcome.html')
})


// server setup
const port = 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});


