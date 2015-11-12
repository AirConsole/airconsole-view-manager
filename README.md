### AirConsole-View-Manager

Build to make it easier to switch between views on controller and screen.

## API

You can use it on both, the screen and the controller.html.

Include the airconsole javascript API file and the airconsole-view-manager.js file

For example on a controller:

```html

  <!-- Define your views -->
  <div id="start" class="view default-view">
    START CONTROLLER VIEW
  </div>

  <div id="wait_view" class="view">
    A wait view
  </div>

  <script type="text/javascript" src="http://www.airconsole.com/api/airconsole-1.2.1.js"></script>
  <script type="text/javascript" src="airconsole-view-manager.js"></script>
```

Javascript:

```javascript
  var air_console = new AirConsole();
  var vm = null;

  air_console.onReady = function() {
    // Init the ViewManager
    vm = new AC.ViewManager(air_console);
  };

  air_console.onDeviceStateChange = function(device_id, user_data) {
    // Listen for changes on the view
    vm.onViewChange(user_data, function(view_id) {
      // view has changed
    });
  };

  // For example with jQuery, change view on all controllers:
  $("#set_ctrl_start_view").on('click', function () {
    // 'start' is the Id of the div container
    vm.controllersShow('start');
  });

  // Change view on all controllers, but not on this controller:
  $("#set_ctrl_wait_view").on('click', function () {
    vm.controllersShow('wait_view', true);
  });

  // Change view on screen:
  $("#set_ctrl_game_end_view").on('click', function () {
    vm.screenShow('game_end');
  });
```
