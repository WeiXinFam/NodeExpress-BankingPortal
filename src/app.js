const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

const accountData = fs.readFileSync('src/json/accounts.json',{encoding:'utf-8'});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('src/json/users.json',{encoding:'utf-8'});
const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts,
    })
});

app.get('/savings', (req, res) => {
    res.render('account', {
        account: accounts.savings,
    })
});

app.get('/checking', (req, res) => {
    res.render('account', {
        account: accounts.checking,
    })
});

app.get('/credit', (req, res) => {
    res.render('account', {
        account: accounts.credit,
    })
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0],
    })
});

app.get('/transfer', (req, res) => {
    res.render('transfer')
});

app.post('/transfer', (req, res) => {
    req.body.from.accounts['savings'].balance = req.body.from.accounts['savings'].balance - req.body.amount;
    req.body.to.accounts['savings'].balance = parseInt(req.body.to.accounts['savings'].balance) + parseInt(req.body.amount);
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname,'src/json/accounts.json'),accountsJSON, {encoding: 'UTF8'})
    res.render('transfer', {
        message: "Transfer Completed"
    })
});

app.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    })
});

app.post('/payment', (req, res) => {
    accounts.credit.balance = accounts.credit.balance - req.body.amount;
    accounts.credit.available = pasrseInt(accounts.credit.available) + parseInt(req.body.amount);
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname,'src/json/accounts.json'),accountsJSON, {encoding: 'UTF8'})
    res.render('payment', {
        message: "Payment Successful", account: accounts.credit
    })
});

app.listen(3000, () => console.log('PS Project Running on port 3000!'))