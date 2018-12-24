(function() {
    var utils = require("../utils");
    var applyDefaultResourceToResponse = require('./resourceDefault').applyDefaultResourceToResponse;

    exports.Http = function(cfg, adapter){
        var resourceDefaultFromConfig = typeof cfg.resourceDefault === 'undefined' ? {} : cfg.resourceDefault;
        return function(args){
            if(args.debug){
                console.log("\nDEBUG (request):", args.method, args.url, args);
            }
            var promise = (args.http || adapter.http  || cfg.http)(args);
            if (args.debug && promise && promise.then){
                promise.then(function(x){ console.log("\nDEBUG: (responce)", x);});
            }
            return promise && promise.then && typeof promise.then === 'function' ? promise.then(applyDefaultResourceToResponse(resourceDefaultFromConfig)) : promise;
        };
    };

    var toJson = function(x){
        return (utils.type(x) == 'object' || utils.type(x) == 'array') ? JSON.stringify(x) : x;
    };

    exports.$JsonData = function(h){
        return function(args){
            var data = args.bundle || args.data || args.resource;
            if(data){
                args.data = toJson(data);
            }
            return h(args);
        };
    };

}).call(this);
