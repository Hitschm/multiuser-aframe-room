var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);

})();


(function () {
    var playercolor = {
        schema: {
        },

        multiple: false,

        init: function () {
          AFRAME.utils.entity.setComponentProperty(this.el, "material.color", urlParams["color"]);
        },        
    };

    AFRAME.registerComponent('playercolor', playercolor);

})();

(function () {
    var playername = {
        schema: {
        },

        multiple: false,

        init: function () {
          AFRAME.utils.entity.setComponentProperty(this.el, "text.value", urlParams["name"]);
        },        
    };

    AFRAME.registerComponent('playername', playername);

})();

AFRAME.registerComponent('do-something', {
  init: function () {
    AFRAME.utils.entity.setComponentProperty(this.el, "networked-scene.webrtcAudio", urlParams["mic"]);
  }
});