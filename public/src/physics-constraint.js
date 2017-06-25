(function () {
    var constraint = {
        schema: {
          target: {default: ''}
        },

        multiple: false,

        init: function () {
          this.constraint = null;
        },
      
        update: function(oldData) {
          this.remove();
          
          if (this.data.target != "") {
            var targetEl = document.querySelector("#" + this.data.target);
          
            if (targetEl && targetEl.body) {
              var localBody = this.getMyBody();
              if (localBody) {
                this.constraint = new CANNON.LockConstraint(localBody, targetEl.body);
                this.el.sceneEl.systems.physics.world.addConstraint(this.constraint);
                
                console.log("Added Constraint between: " + localBody.el + " and " + targetEl.body);
              }
            } 
          }
        },

        play: function() {

        },

        pause: function() {

        },
      
        getMyBody: function() {
          // This is necessary because of networked-aframes schema system
          if (this.el.body) {
            return this.el.body;
          } else {
            var childBody = this.el.querySelector("[dynamic-body], [static-body]");
            
            if (childBody && childBody.body) {
              return childBody.body;
            }
          }
          
          return null;
        },

        remove: function () {
          if (this.constraint) {
            this.el.sceneEl.systems.physics.world.removeConstraint(this.constraint);
          }
          
          this.constraint = null;
        }
    };

    AFRAME.registerComponent('physics-constraint', constraint);

})();