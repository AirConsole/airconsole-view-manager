var AC = {};
AC.ViewManager = function(airconsole) {
  this.airconsole = airconsole;
  this.views = {};
  this.current_view = {
    self: null,
    ctrl: null,
    screen: null
  };
  this.class_start = 'default-view';
  this.setupViews_();
  this.is_screen = airconsole.device_id === AirConsole.SCREEN;
};

AC.ViewManager.prototype = {

  /**
   * Called to setup the <div class="view"></div>
   * @private
   */
  setupViews_: function() {
    var start_view_id = null;
    var views = document.querySelectorAll('.view');
    for (var i = 0; i < views.length; i++) {
      var view = views[i];
      var id = view.id;
      this.views[id] = view;
      var is_start = view.className.indexOf(this.class_start) > -1;
      if (is_start) {
        start_view_id = id;
      }
    }
    this.hideAll();
    if (start_view_id) {
      this.show(start_view_id);
    }
  },

  /**
   * Called onDeviceStateChange
   * @param {Object} user_data - The device user data
   * @param {Function} cb - A callback function
   */
  onViewChange: function(user_data, cb) {
    if (!user_data || !user_data.custom) return;
    var screen_view = user_data.custom.screen_view;
    var ctrl_view = user_data.custom.ctrl_view;
    var view_id = this.is_screen ? screen_view : ctrl_view;
    if (view_id) {
      this.show(view_id);
      if (cb) {
        cb(view_id);
      }
    }
  },

  /**
   * Triggers a view change on all controllers
   * @param {String} view - The view id
   * @param {Boolean} except_me - This controller will not change the view
   */
  controllersShow: function(view, except_me) {
    this.airconsole.setCustomDeviceState({
      ctrl_view: view
    });
    if (!this.is_screen && !except_me) {
      vm.show(view);
    }
  },

  /**
   * Triggers a view change on the screen
   * @param {String} view - The view id
   */
  screenShow: function(view) {
    this.airconsole.setCustomDeviceState({
      screen_view: view
    });
    if (this.is_screen) {
      vm.show(view);
    }
  },

  /**
   * Shows a view and hides all others
   * @param {String} view - The view id
   */
  show: function(id) {
    if (this.current_view.self === id) return;
    var view = this.views[id];
    if (view) {
      this.current_view.self = id;
      this.hideAll();
      view.style.display = "block";
    } else {
      console.warn("Could not find view with ID:", id);
    }
    return this;
  },

  /**
   * Hides all views
   */
  hideAll: function() {
    for (var key in this.views) {
      this.views[key].style.display = "none";
    }
  }

};
