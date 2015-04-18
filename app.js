var express = require('express');
var path = require('path');
var app = express();

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index', {
        serverRender: true,
        scripts: [
            '/build/apps/index.js'
        ],
        styles: [
            '/build/main.css'
        ]
    });
});

app.listen(3000);
