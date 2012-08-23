// prefix so we can compile LESS on the client
yepnope.addPrefix('less', function (resourceObj) {
    resourceObj.forceCSS = true;
    resourceObj.attrs = {
        'rel':"stylesheet/less",
        'type':"text/css"
    };

    return resourceObj;
});

// load all the resources
Modernizr.load([
    {
        load:[
            "libs/idox/css/idox-ui.css",
            "less!libs/bootstrap/less/bootstrap.less",
            "less!libs/bootstrap/less/responsive.less",
            "libs/jquery-ui/js/jquery.js",
            "libs/jquery-ui/js/jquery-ui.custom.js",
            "libs/bootstrap/js/bootstrap.js",
            "libs/underscore/underscore.js",
            "libs/backbone/backbone.js",
            "libs/backbone/plugins/Backbone.ModelBinder.js",
            "libs/less/less.min.js",
            "js/app.js"
        ]
    }
]);

