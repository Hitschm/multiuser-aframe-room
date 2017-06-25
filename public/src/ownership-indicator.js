(function () {
    var ownershipindicator = {
        schema: {

        },

        multiple: false,

        init: function () {
          this.setColor = this.setColor.bind(this);
          this.setInitialColor = this.setInitialColor.bind(this);
          
          this.initialColor = AFRAME.utils.entity.getComponentProperty(this.el, "material.color");
          
          this.el.addEventListener("networked-ownership-removed", this.setInitialColor);
          this.el.addEventListener("networked-ownership-taken", this.setColor);          
        },
      
        setColor: function() {
          var player = document.querySelector("#player");
          if (player) {
            AFRAME.utils.entity.setComponentProperty(this.el, "material.color", AFRAME.utils.entity.getComponentProperty(player, "material.color"));
          }
        },
      
        setInitialColor: function() {
          AFRAME.utils.entity.setComponentProperty(this.el, "material.color", this.initialColor);
        },


        play: function() {

        },

        pause: function() {

        },

        remove: function () {

        }
    };

    AFRAME.registerComponent('ownership-indicator', ownershipindicator);

})();