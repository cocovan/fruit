module.exports = function (grunt) {
    // Project Configuration
    grunt.initConfig({
        // specify the package file that contains all relevant information
        pkg     :'<json:package.json>',
        // delete the build folder - errors are thrown if sub folders are empty, hence the bit by bit deletion
        clean   :{
            dist:["target/css", "target/js", "target/<%= pkg.name %>/css", "target/<%= pkg.name %>/js", "target/<%= pkg.name %>/img", "target/<%= pkg.name %>", "target"]
        },
        // test the syntax of the JS files - ignore third party files as these are outside our control
        lint    :{
            dist:[ "grunt.js", "libs/idox/js/**/*.js" ]
        },
        // lint options
        jshint  :{
            options:{
                curly  :true,
                eqeqeq :false,
                immed  :true,
                latedef:true,
                newcap :true,
                noarg  :true,
                sub    :true,
                undef  :false,
                boss   :true,
                eqnull :true,
                browser:true
            },
            globals:{
                jQuery:true
            }
        },
        // combine the JS files in the correct order
        concat  :{
            // jstree requires some libs loaded in the right order so concatenate them
            jstree      :{
                src :[ "libs/jquery-ui/plugins/jquery.cookie.js", "libs/jquery-ui/plugins/jquery.hotkeys.js", "libs/jquery-ui/plugins/jquery.jstree.js" ],
                dest:"target/js/<%= pkg.name %>-jstree.js"
            },
            // add jquery, jquery-ui and any plugins
            jquery      :{
                src :[ "libs/jquery-ui/js/jquery.js", "libs/jquery-ui/js/jquery-ui.custom.js", "target/js/<%= pkg.name %>-jstree.js" ],
                dest:"target/js/<%= pkg.name %>-jquery.js"
            },
            // add zepto (mobile jquery), jquery-ui and any plugins
            jquerymobile:{
                src :[ "libs/jquery-ui/js/zepto.js", "libs/jquery-ui/js/jquery-ui.custom.js", "target/js/<%= pkg.name %>-jstree.js" ],
                dest:"target/js/<%= pkg.name %>-jquery-mobile.js"
            },
            // bootstrap and any plugins for it
            bootstrap   :{
                src :["libs/bootstrap/js/bootstrap.js", "libs/bootstrap/plugins*//**//*.js" ],
                dest:"target/js/<%= pkg.name %>-bootstrap.js"
            },
            // backbone - make sure these are concatenated in the right order
            backbone    :{
                src :[ "libs/underscore/underscore.js", "libs/backbone/backbone.js", "libs/backbone/plugins*//**//*.js" ],
                dest:"target/js/<%= pkg.name %>-backbone.js"
            },
            // any custom JS used in fruit
            idox        :{
                src :[ "libs/idox/js*//**//*.js"],
                dest:"target/js/<%= pkg.name %>-idox.js"
            },
            // all JS
            dist        :{
                src :[ "target/js/<%= pkg.name %>-jquery.js", "target/js/<%= pkg.name %>-bootstrap.js", "target/js/<%= pkg.name %>-idox.js" ],
                dest:"target/js/<%= pkg.name %>.js"
            },
            // all mobile JS
            mobile      :{
                src :[ "target/js/<%= pkg.name %>-jquery-mobile.js", "target/js/<%= pkg.name %>-bootstrap.js", "target/js/<%= pkg.name %>-idox.js" ],
                dest:"target/js/<%= pkg.name %>-mobile.js"
            }
        },
        // minimise the JS files
        min     :{
            dist        :{
                src :"target/js/<%= pkg.name %>.js",
                dest:"target/js/<%= pkg.name %>.min.js"
            },
            mobile      :{
                src :"target/js/<%= pkg.name %>-mobile.js",
                dest:"target/js/<%= pkg.name %>-mobile.min.js"
            },
            backbone    :{
                src :"target/js/<%= pkg.name %>-backbone.js",
                dest:"target/js/<%= pkg.name %>-backbone.min.js"
            },
            // special case - do not add "min" on the file name end so that HTML works the same in dev and prod
            modernizr   :{
                src :"js/modernizr.js",
                dest:"target/js/modernizr.js"
            }
        },
        // compile the LESS stylesheets
        less    :{
            bootstrap   :{
                options:{
                    paths:["libs/bootstrap/less"]
                },
                files   :{
                    "target/css/bootstrap.css"           :"libs/bootstrap/less/bootstrap.less",
                    "target/css/bootstrap-responsive.css":"libs/bootstrap/less/responsive.less"
                }
            }
        },
        // combine and minimise the CSS files
        mincss  :{
            dist    :{
                files:{
                    // combine all regular CSS and minify
                    "target/css/<%= pkg.name %>.min.css":["target/css/bootstrap.css", "target/css/bootstrap-responsive.css", "libs/idox/css/subnav.css", "libs/idox/css/idox-ui.css" ],
                    // jstree css loads separately so have it as a standalone file but still minified
                    "target/css/idox-jstree.min.css"    :["libs/idox/css/idox-jstree.css"]
                }
            },
            lessfix :{
                files:{
                    // combine all regular CSS and minify
                    "target/css/<%= pkg.name %>.min.css":["libs/bootstrap/css/bootstrap.css", "libs/bootstrap/css/bootstrap-responsive.css", "libs/idox/css/subnav.css", "libs/idox/css/idox-ui.css" ],
                    // jstree css loads separately so have it as a standalone file but still minified
                    "target/css/idox-jstree.min.css"    :["libs/idox/css/idox-jstree.css"]
                }
            }
        },
        // move all required files into the right locations
        copy    :{
            // standard build
            dist    :{
                files  :{
                    "target/<%= pkg.name %>/img"       :[ "libs/bootstrap/img/*", "libs/idox/img/*" ],
                    "target/<%= pkg.name %>/js"        :[ "target/js/<%= pkg.name %>.min.js", "target/js/<%= pkg.name %>-mobile.min.js", "target/js/<%= pkg.name %>-backbone.min.js", "target/js/modernizr.js" ],
                    "target/<%= pkg.name %>/css"       :[ "target/css/idox-jstree.min.css", "target/css/<%= pkg.name %>.min.css" ],
                    "target/<%= pkg.name %>/css/images":"libs/idox/css/images/*"
                },
                options:{
                    "flatten":"true"
                }
            },
            // documentation files
            docs    :{
                files  :{
                    "target/<%= pkg.name %>/docs"       :"docs*",
                    "target/<%= pkg.name %>/docs/images":"docs/images/*"
                },
                options:{
                    "flatten":"true"
                }
            },
            // application specific (just an example)
            application:{
                files  :{
                    "target/<%= pkg.name %>"   :"index.htm",
                    "target/<%= pkg.name %>/js":[ "js/loader-production.js", "js/app.js" ]
                },
                options:{
                    "flatten"  :"true",
                    // rename the production JS file
                    processName:function (filename) {
                        if (filename == "loader-production.js") {
                            filename = "loader.js";
                        }
                        return filename;
                    }
                }
            }
        },
        // build the release package
        compress:{
            zip:{
                options:{
                    mode    :"zip",
                    basePath:"target"
                },
                files  :{
                    "target/<%= pkg.name %>-<%= pkg.version %>.zip":"target/<%= pkg.name %>/**"
                }
            }
        }
    });

    // load external tasks
    grunt.loadNpmTasks("grunt-contrib");

    // Default task
    grunt.registerTask("default", "clean lint concat min less mincss:dist copy compress");
    // special task to overcome bootstrap less not compiling - use this until this issue is resolved
    grunt.registerTask("lessfix", "clean lint concat min less mincss:lessfix copy compress");
};