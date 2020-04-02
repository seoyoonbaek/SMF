'use strict';

common.getScripts(
  // 필요한 파일 loading
  [
    '../js/controllers/home.ctrl.js',
    '../js/templates/home.template.js',
    '../js/views/home.view.js',
    '../js/models/home.model.js'
  ],
  function(){
    function App(){
      console.log('App created!');
      this.homeModel = new app.homeModel();
      this.homeTemplate = new app.homeTemplate();
      this.homeView = new app.homeView(this.homeTemplate);
      this.homeController = new app.homeController(this.homeModel, this.homeView);
    }
    var homeApp = new App();
});
