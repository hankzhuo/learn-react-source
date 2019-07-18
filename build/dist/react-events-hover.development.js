/** @license React vundefined
 * react-events-hover.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global.ReactEventsHover = factory(global.React));
}(this, (function (React) { 'use strict';

var UserBlockingEvent = 1;

var DEFAULT_HOVER_END_DELAY_MS = 0;
var DEFAULT_HOVER_START_DELAY_MS = 0;

var targetEventTypes = ['pointerover', 'pointermove', 'pointerout', 'pointercancel'];

// If PointerEvents is not supported (e.g., Safari), also listen to touch and mouse events.
if (typeof window !== 'undefined' && window.PointerEvent === undefined) {
  targetEventTypes.push('touchstart', 'mouseover', 'mousemove', 'mouseout');
}

function createHoverEvent(event, context, type, target) {
  var clientX = null;
  var clientY = null;
  var pageX = null;
  var pageY = null;
  var screenX = null;
  var screenY = null;

  if (event) {
    var nativeEvent = event.nativeEvent;
    clientX = nativeEvent.clientX;
    clientY = nativeEvent.clientY;
    pageX = nativeEvent.pageX;
    pageY = nativeEvent.pageY;
    screenX = nativeEvent.screenX;
    screenY = nativeEvent.screenY;
  }

  return {
    target: target,
    type: type,
    timeStamp: context.getTimeStamp(),
    clientX: clientX,
    clientY: clientY,
    pageX: pageX,
    pageY: pageY,
    screenX: screenX,
    screenY: screenY,
    x: clientX,
    y: clientY
  };
}

function dispatchHoverChangeEvent(event, context, props, state) {
  var bool = state.isActiveHovered;
  var listener = function () {
    props.onHoverChange(bool);
  };
  var syntheticEvent = createHoverEvent(event, context, 'hoverchange', state.hoverTarget);
  context.dispatchEvent(syntheticEvent, listener, UserBlockingEvent);
}

function dispatchHoverStartEvents(event, context, props, state) {
  var target = state.hoverTarget;
  if (event !== null) {
    var nativeEvent = event.nativeEvent;

    if (context.isTargetWithinEventResponderScope(nativeEvent.relatedTarget)) {
      return;
    }
  }

  state.isHovered = true;

  if (state.hoverEndTimeout !== null) {
    context.clearTimeout(state.hoverEndTimeout);
    state.hoverEndTimeout = null;
  }

  var activate = function () {
    state.isActiveHovered = true;

    if (props.onHoverStart) {
      var syntheticEvent = createHoverEvent(event, context, 'hoverstart', target);
      context.dispatchEvent(syntheticEvent, props.onHoverStart, UserBlockingEvent);
    }
    if (props.onHoverChange) {
      dispatchHoverChangeEvent(event, context, props, state);
    }
  };

  if (!state.isActiveHovered) {
    var _delayHoverStart = calculateDelayMS(props.delayHoverStart, 0, DEFAULT_HOVER_START_DELAY_MS);
    if (_delayHoverStart > 0) {
      state.hoverStartTimeout = context.setTimeout(function () {
        state.hoverStartTimeout = null;
        activate();
      }, _delayHoverStart);
    } else {
      activate();
    }
  }
}

function dispatchHoverEndEvents(event, context, props, state) {
  var target = state.hoverTarget;
  if (event !== null) {
    var nativeEvent = event.nativeEvent;

    if (context.isTargetWithinEventResponderScope(nativeEvent.relatedTarget)) {
      return;
    }
  }

  state.isHovered = false;

  if (state.hoverStartTimeout !== null) {
    context.clearTimeout(state.hoverStartTimeout);
    state.hoverStartTimeout = null;
  }

  var deactivate = function () {
    state.isActiveHovered = false;

    if (props.onHoverEnd) {
      var syntheticEvent = createHoverEvent(event, context, 'hoverend', target);
      context.dispatchEvent(syntheticEvent, props.onHoverEnd, UserBlockingEvent);
    }
    if (props.onHoverChange) {
      dispatchHoverChangeEvent(event, context, props, state);
    }
    state.hoverTarget = null;
    state.ignoreEmulatedMouseEvents = false;
    state.isTouched = false;
  };

  if (state.isActiveHovered) {
    var _delayHoverEnd = calculateDelayMS(props.delayHoverEnd, 0, DEFAULT_HOVER_END_DELAY_MS);
    if (_delayHoverEnd > 0) {
      state.hoverEndTimeout = context.setTimeout(function () {
        deactivate();
      }, _delayHoverEnd);
    } else {
      deactivate();
    }
  }
}

function calculateDelayMS(delay) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var maybeNumber = delay == null ? null : delay;
  return Math.max(min, maybeNumber != null ? maybeNumber : fallback);
}

function unmountResponder(context, props, state) {
  if (state.isHovered) {
    dispatchHoverEndEvents(null, context, props, state);
  }
}

function isEmulatedMouseEvent(event, state) {
  var type = event.type;

  return state.ignoreEmulatedMouseEvents && (type === 'mousemove' || type === 'mouseover' || type === 'mouseout');
}

var HoverResponder = {
  displayName: 'Hover',
  targetEventTypes: targetEventTypes,
  getInitialState: function () {
    return {
      isActiveHovered: false,
      isHovered: false,
      isTouched: false,
      hoverStartTimeout: null,
      hoverEndTimeout: null,
      ignoreEmulatedMouseEvents: false
    };
  },

  allowMultipleHostChildren: false,
  allowEventHooks: true,
  onEvent: function (event, context, props, state) {
    var pointerType = event.pointerType,
        type = event.type;


    if (props.disabled) {
      if (state.isHovered) {
        dispatchHoverEndEvents(event, context, props, state);
        state.ignoreEmulatedMouseEvents = false;
      }
      if (state.isTouched) {
        state.isTouched = false;
      }
      return;
    }

    switch (type) {
      // START
      case 'pointerover':
      case 'mouseover':
      case 'touchstart':
        {
          if (!state.isHovered) {
            // Prevent hover events for touch
            if (state.isTouched || pointerType === 'touch') {
              state.isTouched = true;
              return;
            }

            // Prevent hover events for emulated events
            if (isEmulatedMouseEvent(event, state)) {
              return;
            }
            state.hoverTarget = event.responderTarget;
            state.ignoreEmulatedMouseEvents = true;
            dispatchHoverStartEvents(event, context, props, state);
          }
          return;
        }

      // MOVE
      case 'pointermove':
      case 'mousemove':
        {
          if (state.isHovered && !isEmulatedMouseEvent(event, state)) {
            if (props.onHoverMove && state.hoverTarget !== null) {
              var syntheticEvent = createHoverEvent(event, context, 'hovermove', state.hoverTarget);
              context.dispatchEvent(syntheticEvent, props.onHoverMove, UserBlockingEvent);
            }
          }
          return;
        }

      // END
      case 'pointerout':
      case 'pointercancel':
      case 'mouseout':
      case 'touchcancel':
      case 'touchend':
        {
          if (state.isHovered) {
            dispatchHoverEndEvents(event, context, props, state);
            state.ignoreEmulatedMouseEvents = false;
          }
          if (state.isTouched) {
            state.isTouched = false;
          }
          return;
        }
    }
  },
  onUnmount: function (context, props, state) {
    unmountResponder(context, props, state);
  },
  onOwnershipChange: function (context, props, state) {
    unmountResponder(context, props, state);
  }
};

var Hover = React.unstable_createEvent(HoverResponder);

function useHover(props) {
  React.unstable_useEvent(Hover, props);
}

var Hover$1 = Object.freeze({
	Hover: Hover,
	useHover: useHover
});

var hover = Hover$1;

return hover;

})));
