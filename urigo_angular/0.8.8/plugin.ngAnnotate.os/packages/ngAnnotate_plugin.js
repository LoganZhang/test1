(function () {

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// plugin/annotate.js                                                //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
                                                                     // 1
var ngAnnotate = Npm.require('ng-annotate');                         // 2
                                                                     // 3
Plugin.registerSourceHandler('ng.js', {                              // 4
  isTemplate: true,                                                  // 5
  archMatching: 'web'                                                // 6
}, function(compileStep) {                                           // 7
                                                                     // 8
  var ret = ngAnnotate(compileStep.read().toString('utf8'), {        // 9
    add: true                                                        // 10
  });                                                                // 11
                                                                     // 12
  if (ret.errors) {                                                  // 13
    throw new Error(ret.errors.join(': '));                          // 14
  }                                                                  // 15
  else {                                                             // 16
    compileStep.addJavaScript({                                      // 17
      path : compileStep.inputPath,                                  // 18
      data : ret.src,                                                // 19
      sourcePath : compileStep.inputPath                             // 20
    });                                                              // 21
  }                                                                  // 22
                                                                     // 23
});                                                                  // 24
                                                                     // 25
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.ngAnnotate = {};

})();

//# sourceMappingURL=ngAnnotate_plugin.js.map
