const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const history = require('connect-history-api-fallback');

app = express();

const staticFileMiddleware = serveStatic(path.join(__dirname + '/dist'));
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 80;
app.listen(port);