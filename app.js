var express = require('express'),
    path = require('path'),
    application_root = __dirname,
    route = require('./server/routes/routes');

var app = express();

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true
    }));
    app.set('view options', {
        pretty: true
    });
});

app.configure(function() {
    app.set('port', 4711);
    app.use(express.favicon());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'Aiant111213'
    }));
    app.use(express.bodyParser());
    app.use(function(req,res,next){
        res.locals.currentUser = req.session.currentUser;
        next();
    });
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.set('views', path.join(application_root, "server/views"));
    app.set('view engine', 'jade');
    app.use(express.logger({
        format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms'
    }));
});


app.get('/', route.fetch);

app.get('/update', route.update);

app.get('/result', route.comparisonResult);

var port = process.env.PORT || 4711;
app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
