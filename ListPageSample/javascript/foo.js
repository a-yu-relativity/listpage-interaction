define(function() {
    var config = requirejs.s.contexts._.config;
    console.log(config);

    // modify jquery version
    config["paths"]["jquery"] = "//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min";
    return function(){};
});

//define(function() {
//    requirejs.config({
//        baseUrl: "js",
//        paths: {
//            "app": ".",
//            /* Load jquery from google cdn.*/
//            "jquery": ['//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min']
//        }
//    });

//    return requirejs(["jquery"]);
//});

// requirejs.config({
//     baseUrl: "../RelativityApplicationWebResourceFile/ad622879-f1e0-426c-b93a-b31d6eb3c772/0.0.0.167/",
//     paths: {
//         "app": "../../CustomPages/2ff16b11-a4ca-4f02-8bbb-1f07f23fe713/scripts/app/",
//         /* Load jquery from google cdn.*/
//         "jquery": ['//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min']
//     }
// });

// requirejs(["app/listPage"]);



//define(["foo"],
//    function() {

//        // load jquery externally
//        requirejs.config({
//            //appDir: ".",
//            //baseUrl: "js",
//            paths: {
//                /* Load jquery from google cdn.*/
//                jquery: ['//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min']
//            }
//        });

//        requirejs(['jquery'], function ($) {
//            // print jQuery version
//            console.log("Loaded jquery version: ");
//            console.log($().jquery);
//            return {};
//        });
//    });