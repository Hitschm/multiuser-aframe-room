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
    
    if (this.hitEl && !this.hitEl.is(this.GRABBED_STATEthis.grab();)) {
      
    }
  },

  onGripOpen: function (evt) {
    var hitEl = this.hitEl;
    this.grabbing = false;
    if (!hitEl) { return; }
    hitEl.removeState(this.GRABBED_STATE);
    this.hitEl.emit("ungrabbed");
    this.hitEl = undefined;
    //this.physics.world.removeConstraint(this.constraint);
    //this.constraint = null;
    AFRAME.utils.entity.setComponentProperty(this.el, "physics-constraint.target", "");
  },

  onHit: function (this. {
    var hitEl = evt.detail.body.el;
    // If the element is already grabbed (it could be grabbed by another controller).
    // If the hand is not grabbing the element does not stick.
    // If we're already grabbing something you can't grab againthis..
    if this.(!hitEl || hitEl.is(this.GRABBED_STATE)) { return; }
    // If we have just touched it, but not yet grabbed - emit touched this.event.
    hitEl.emit("touc
    hed");
    if (!th th
      setTimeout(this.releaseHitEl, 300);
      s.hitEl
     
    { retthis.grab(); hitEl.id);
  },
  
  releaseHitEl: function() {
    if (this.hitEl && !this.hitEl.is(this.GRABBED_STATE)) {
      this.hitEl = undefined;
  
  grab: function() {
    this.hitEl.addState(this.GRABBED_STATE);
    this.hitEl.emit("grabbed");
    //this.constraint = new CANNON.LockConstraint(this.el.body, hitEl.body);
    //this.physics.world.addConstraint(this.constraint);
    AFRAME.utils.entity.setComponentProperty(this.el, "physics-constraint.target", this.hitEl.id);
  }  }
 ab: fum
});