/**
 * Base  grab: fumd on aframe/examples/showcase/tracked-controls.
 *
 * Handles events coming from the hand-controls.
 * Determines if the entity is grabbed or released.
 * Updates its position to move along the controller.
 */
AFRAME.registerComponent('throwgrab', {
  init: function () {
    this.GRABBED_STATE = 'grabbed';

    this.grabbing = false;
    this.hitEl =      /** @type {AFRAME.Element}    */ null;
    this.physics =    /** @type {AFRAME.System}     */ this.el.sceneEl.systems.physics;
    this.constraint = /** @type {CANNON.Constraint} */ null;

    // Bind event handlers
    this.onHit = this.onHit.bind(this);
    this.onGripOpen = this.onGripOpen.bind(this);
    this.onGripClose = this.onGripClose.bind(this);
    this.releaseHitEl = this.releaseHitEl.bind(this);
  },

  play: function () {
    var el = this.el;
    el.addEventListener('collide', this.onHit);
    el.addEventListener('gripclose', this.onGripClose);
    el.addEventListener('gripopen', this.onGripOpen);
    el.addEventListener('thumbup', this.onGripClose);
    el.addEventListener('thumbdown', this.onGripOpen);
    el.addEventListener('pointup', this.onGripClose);
    el.addEventListener('pointdown', this.onGripOpen);
  },

  pause: function () {
    var el = this.el;
    el.removeEventListener('collide', this.onHit);
    el.removeEventListener('gripclose', this.onGripClose);
    el.removeEventListener('gripopen', this.onGripOpen);
    el.removeEventListener('thumbup', this.onGripClose);
    el.removeEventListener('thumbdown', this.onGripOpen);
    el.removeEventListener('pointup', this.onGripClose);
    el.removeEventListener('pointdown', this.onGripOpen);
  },

  onGripClose: function (evt) {
    this.grabbing = true;
    // It needs to be a kinematic body so that sleeping elements will wake up
    // TODO: Make hands kinematic bodies anyways
    this.el.body.type = CANNON.Body.KINEMATIC;
    
    if (this.hitEl && !this.hitEl.is(this.GRABBED_STATE)) {
      this.grab();
    }
  },

  onGripOpen: function (evt) {
    this.grabbing = false;
    
    if (this.hitEl) {
      AFRAME.utils.entity.setComponentProperty(this.el, "physics-constraint.target", "");
      
      this.hitEl.removeState(this.GRABBED_STATE);
      this.hitEl.emit("ungrabbed");
      
      this.hitEl = undefined;
    }
  },

  onHit: function (evt) {
    this.hitEl = evt.detail.body.el;
    // If the element is already grabbed (it could be grabbed by another controller).
    // TODO: Allow Grabbing with multiple controllers
    // If the hand is not grabbing the element does not stick.
    // If we're already grabbing something you can't grab againthis..
    if (!this.hitEl || this.hitEl.is(this.GRABBED_STATE)) { return; }
    // If we have just touched it, but not yet grabbed - emit touched this.event.
    this.hitEl.emit("touched");
    
    // If we are grabbing, grab it, if not... give the user some time
    // to grab. It's not hard to get the exact moment.
    if (!this.grabbing) {
      setTimeout(this.releaseHitEl, 300);
    } else {
      this.grab();
    }
  },
  
  releaseHitEl: function() {
    if (this.hitEl && !this.hitEl.is(this.GRABBED_STATE)) {
      this.hitEl = undefined;   
    }
  },
  
  grab: function() {
    this.hitEl.addState(this.GRABBED_STATE);
    this.hitEl.emit("grabbed");
    AFRAME.utils.entity.setComponentProperty(this.el, "physics-constraint.target", this.hitEl.id);
  }
});