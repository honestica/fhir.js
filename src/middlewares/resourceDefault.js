(function() {
  var defaultsDeep = require('lodash.defaultsdeep');

  var applyDefaultResourceToResponse = function(defaultResources){

    function defaultResource(resource) {
      if (resource && resource.resourceType && typeof defaultResources[resource.resourceType] !== 'undefined') {
        return defaultsDeep(resource, defaultResources[resource.resourceType]);
      } else {
        return resource;
      }
    }

    return function (response) {
      if (response && response.data) {
        var result = response.data;
        if (result.resourceType === 'Bundle' && result.entry) {
            result.entry = result.entry.map(defaultResource);
            response.data = result;
        } else {
          response.data = defaultResource(result);
        }
      }
      return response;
    }

  };

  module.exports.applyDefaultResourceToResponse = applyDefaultResourceToResponse;

}).call(this);
