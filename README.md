### AirConsole-View-Manager

Build to make it easier to switch between views on controller and screen.

## How it works

Each device has a property named ``custom``, which can be used to manage device
specific states and properties.
The View-Manager sets two properties ``ctrl_view`` and ``screen_view`` which hold the current
visible id of the html container, either on the screen or on the controllers.
If one those properties change (by onDeviceStateChange()), then the View-Manager shows
the view and hides all others.

## How to use

You can use it on both, the screen and the controller.html.

Include the airconsole javascript API file and the airconsole-view-manager.js file

For example in controller.html:

HTML:

```html
  <!-- Define buttons to change views -->
  <button id="set_ctrl_start_view">Set start view</button>

  <!-- Define your views -->
  <div id="start" class="view default-view">
    START CONTROLLER VIEW
  </div>

  <div id="wait_view" class="view">
    A wait view
  </div>

  <script type="text/javascript" src="https://www.airconsole.com/api/airconsole-latest.js"></script>
  <script type="text/javascript" src="airconsole-view-manager.js"></script>
```

Javascript:

```javascript
  var air_console = new AirConsole();
  var vm = null;

  air_console.onReady = function() {
    // Init the ViewManager
    vm = new AirConsoleViewManager(air_console);
  };

  // Listen for view changes
  airconsole.onCustomDeviceStateChange = function(device_id, data) {
    vm.onViewChange(data, function(view_id) {
      // view has changed
    });
  };

  // For example: change view on all controllers:
  // (We use jQuery to bind the click handler :)
  $("#set_ctrl_start_view").on('click', function () {
    // 'start' is the Id of the div container
    vm.controllersShow('start');
  });

  // Change view on all controllers, but not on this controller:
  $("#set_ctrl_wait_view").on('click', function () {
    // Pass 'true' as second argument to only change other controller's views,
    // except this one
    vm.controllersShow('wait_view', true);
  });

  // Change view on screen:
  $("#set_ctrl_game_end_view").on('click', function () {
    vm.screenShow('game_end');
  });

  // Only change view on this device:
  $("#self_show_view").on('click', function () {
    vm.show('custom_menu');
  });

  // Change view on both screen and all controllers:
  $("#set_all_game_end_view").on('click', function () {
    vm.allShow('game_end');
  });
```
