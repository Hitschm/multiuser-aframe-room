(function () {
    var physicslerp = {
        schema: {
          targetPosition: {type: 'vec3'},
          targetQuaternion: {type: 'vec4'},
          targetVelocity: {type: 'vec3'},
          targetAngularVelocity: {type: 'vec3'},
          time: {type: 'int'}
        },

        multiple: false,

        init: function () {
          
        },
      
        update: function(oldData) {
          this.physicsInterpolationTarget = {
            position: new CANNON.Vec3(this.data.targetPosition.x, this.data.targetPosition.y, this.data.targetPosition.z),
            quaternion: new THREE.Quaternion(this.data.targetQuaternion.x, this.data.targetQuaternion.y, this.data.targetQuaternion.z, this.data.targetQuaternion.w),
            velocity: new CANNON.Vec3(this.data.targetVelocity.x, this.data.targetVelocity.y, this.data.targetVelocity.z),
            angularVelocity: new CANNON.Vec3(this.data.targetAngularVelocity.x, this.data.targetAngularVelocity.y, this.data.targetAngularVelocity.z)
          };
          
          this.interpolationStartTime = Date.now();
        },
      
        tick: function() {
          var body = this.getMyBody();
          if (body) {
            var time = Date.now();
            var progress = 0;

            if (time > (this.interpolationStartTime + this.data.time)) {
              progress = 1;
            } else {
              progress = (time - this.interpolationStartTime) / this.data.time;
            }

            body.position.lerp(this.physicsInterpolationTarget.position, progress, body.position);
            var tempQuaternion = new THREE.Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
            body.quaternion.copy(tempQuaternion.slerp(this.physicsInterpolationTarget.quaternion, progress));
            body.velocity.lerp(this.physicsInterpolationTarget.velocity, progress, body.velocity);
            body.angularVelocity.lerp(this.physicsInterpolationTarget.angularVelocity, progress, body.angularVelocity);
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

        }
    };

    AFRAME.registerComponent('physics-lerp', physicslerp);

})();