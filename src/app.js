const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

const data = require('./data');
const accounts = data.accounts;
const users = data.users;
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

//move to data.js
// const accountData = fs.readFileSync('src/json/accounts.json',{encoding:'utf-8'});
// const accounts = JSON.parse(accountData);

// const userData = fs.readFileSync('src/json/users.json',{encoding:'utf-8'});
// const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts,
    })
});



app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0],
    })
});

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.listen(3000, () => console.log('PS Project Running on port 3000!'))