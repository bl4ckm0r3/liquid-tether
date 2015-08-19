/* jshint node: true */
'use strict';

module.exports = {
  name: 'liquid-tether',

  included: function(app) {
    this._super.included(app);

    if (app.import) {
      this.importBowerDependencies(app);
    }
  },

  importBowerDependencies: function(app) {
    app.import(app.bowerDirectory + '/tether/dist/js/tether.js');
  }
};
