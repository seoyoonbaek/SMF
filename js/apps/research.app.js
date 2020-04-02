'use strict';
common.getScripts(
  [
    '../js/dataClass/research.dataClass.js',
    '../js/controllers/research.ctrl.js',
    '../js/templates/research.template.js',
    '../js/views/research.view.js',
    '../js/models/research.model.js'
  ],
  function(){
    function App(){
      this.researchDataClass = new app.researchDataClass();
      this.researchModel = new app.researchModel(this.researchDataClass);
      this.researchTemplate = new app.researchTemplate();
      this.researchView = new app.researchView(this.researchTemplate);
      this.researchController = new app.researchController(this.researchModel, this.researchView);
    }
    var researchApp = new App();
});
