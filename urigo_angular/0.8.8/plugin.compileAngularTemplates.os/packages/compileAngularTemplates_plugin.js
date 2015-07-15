(function () {

/* Imports */
var HTMLTools = Package['html-tools'].HTMLTools;
var HTML = Package.htmljs.HTML;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// plugin/handler.js                                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**                                                                                                                   // 1
 * Created by netanel on 01/01/15.                                                                                    // 2
 */                                                                                                                   // 3
                                                                                                                      // 4
var minify = Npm.require('html-minifier').minify;                                                                     // 5
Plugin.registerSourceHandler('ng.html', {                                                                             // 6
  isTemplate: true,                                                                                                   // 7
  archMatching: "web"                                                                                                 // 8
}, function(compileStep) {                                                                                            // 9
  var contents = compileStep.read().toString('utf8');                                                                 // 10
                                                                                                                      // 11
  // Just parse the html to make sure it is correct before minifying                                                  // 12
  HTMLTools.parseFragment(contents);                                                                                  // 13
                                                                                                                      // 14
  // Build the templateCache prefix using the package name                                                            // 15
  // In case the template is not from a package but the user's app there will be no prefix - client/views/my-template.ng.html
  // In case the template came from a package the prefix will be - my-app_my-package_client/views/my-template.ng.html // 17
  var packagePrefix = compileStep.packageName;                                                                        // 18
  packagePrefix = packagePrefix ? (packagePrefix.replace(/:/g, '_') + '_') : '';                                      // 19
                                                                                                                      // 20
  var results = 'angular.module(\'angular-meteor\').run([\'$templateCache\', function($templateCache) {' +            // 21
    // Since compileStep.inputPath uses backslashes on Windows, we need replace them                                  // 22
    // with forward slashes to be able to consistently include templates across platforms.                            // 23
    // Ticket here: https://github.com/Urigo/angular-meteor/issues/169                                                // 24
    // A standardized solution to this problem might be on its way, see this ticket:                                  // 25
    // https://github.com/meteor/windows-preview/issues/47                                                            // 26
    '$templateCache.put(' + JSON.stringify(packagePrefix + compileStep.inputPath.replace(/\\/g, "/")) + ', ' +        // 27
      JSON.stringify(minify(contents, {                                                                               // 28
        collapseWhitespace : true,                                                                                    // 29
        conservativeCollapse : true,                                                                                  // 30
        minifyJS : true,                                                                                              // 31
        minifyCSS : true,                                                                                             // 32
        processScripts : ['text/ng-template']                                                                         // 33
      })) + ');' +                                                                                                    // 34
    '}]);';                                                                                                           // 35
                                                                                                                      // 36
  compileStep.addJavaScript({                                                                                         // 37
    path : compileStep.inputPath + '.js',                                                                             // 38
    data : results,                                                                                                   // 39
    sourcePath : compileStep.inputPath                                                                                // 40
  });                                                                                                                 // 41
});                                                                                                                   // 42
                                                                                                                      // 43
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.compileAngularTemplates = {};

})();

//# sourceMappingURL=compileAngularTemplates_plugin.js.map
