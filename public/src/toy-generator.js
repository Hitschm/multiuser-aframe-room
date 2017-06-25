(function () {
    var toygen = {
        schema: {
            templates: {
              type: "array",
              default: []
            },
            genEvents: {
              type: "array",
              default: ["pointingend"]
            }
        },

        multiple: false,

        init: function () {
          this.generateToy = this.generateToy.bind(this);
          
          if (this.data.genEvents) {
            for (var i = 0; i < this.data.genEvents.length; i++) {
              this.el.addEventListener(this.data.genEvents[i], this.generateToy);
            }
          }
          
        },

        update: function (oldData) {
            
        },
      
        generateToy: function() {
          if (this.data.templates && this.data.templates) {
            var toy = this.data.templates[Math.floor(Math.random()*this.data.templates.length)];
            
            var templateChild = document.createElement('a-entity');
            templateChild.setAttribute('mixin', toy);
            templateChild.setAttribute('position', AFRAME.utils.entity.getComponentProperty(this.el, "position"));
            templateChild.className = "grab";
            var toyId = this.guid();
            templateChild.setAttribute('id', toyId);
            var networkedData = {
              networkId: toyId,
              owner: '',
              components: ["position", "quaternion", "material", "net-ownership"]
            };
            templateChild.setAttribute('networked-share', networkedData);
            var el = this.el.sceneEl.appendChild(templateChild);
            el.setAttribute("dynamic-body", "");
          }
        },

        play: function() {

        },

        pause: function() {

        },

        remove: function () {
          if (this.data.genEvents) {
            for (var i = 0; i < this.data.genEvents.length; i++) {
              this.el.removeEventListener(this.data.genEvents[i], this.generateToy);
            }
          }
        },
      
        guid: function () {
            return "a" + this.guidPart() + this.guidPart() + '-' + this.guidPart() + '-' + this.guidPart() + '-' +
                this.guidPart() + '-' + this.guidPart() + this.guidPart() + this.guidPart();
        },

        guidPart: function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
    };

    AFRAME.registerComponent('toy-generator', toygen);

})();