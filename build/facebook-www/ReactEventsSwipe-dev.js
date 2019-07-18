/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @preventMunge
 * @preserve-invariant-messages
 */

'use strict';

if (__DEV__) {
  (function() {
"use strict";

var React = require("react");

var DiscreteEvent = 0;
var UserBlockingEvent = 1;

var targetEventTypes = ["pointerdown"];
var rootEventTypes = ["pointerup", "pointercancel", "pointermove_active"];

// In the case we don't have PointerEvents (Safari), we listen to touch events
// too
if (typeof window !== "undefined" && window.PointerEvent === undefined) {
  targetEventTypes.push("touchstart", "mousedown");
  rootEventTypes.push(
    "mouseup",
    "mousemove",
    "touchend",
    "touchcancel",
    "touchmove_active"
  );
}

function createSwipeEvent(context, type, target, eventData) {
  return context.objectAssign(
    {
      target: target,
      type: type,
      timeStamp: context.getTimeStamp()
    },
    eventData
  );
}

function dispatchSwipeEvent(
  context,
  name,
  listener,
  state,
  eventPriority,
  eventData
) {
  var target = state.swipeTarget;
  var syntheticEvent = createSwipeEvent(context, name, target, eventData);
  context.dispatchEvent(syntheticEvent, listener, eventPriority);
}

var SwipeResponder = {
  displayName: "Scroll",
  targetEventTypes: targetEventTypes,
  getInitialState: function() {
    return {
      direction: 0,
      isSwiping: false,
      lastDirection: 0,
      startX: 0,
      startY: 0,
      touchId: null,
      swipeTarget: null,
      x: 0,
      y: 0
    };
  },
  onEvent: function(event, context, props, state) {
    var target = event.target,
      type = event.type,
      nativeEvent = event.nativeEvent;

    switch (type) {
      case "touchstart":
      case "mousedown":
      case "pointerdown": {
        if (!state.isSwiping) {
          var obj = nativeEvent;
          if (type === "touchstart") {
            obj = nativeEvent.targetTouches[0];
            state.touchId = obj.identifier;
          }
          var _x = obj.screenX;
          var _y = obj.screenY;

          var shouldEnableSwiping = true;

          if (props.onShouldClaimOwnership && props.onShouldClaimOwnership()) {
            shouldEnableSwiping = context.requestGlobalOwnership();
          }
          if (shouldEnableSwiping) {
            state.isSwiping = true;
            state.startX = _x;
            state.startY = _y;
            state.x = _x;
            state.y = _y;
            state.swipeTarget = target;
            context.addRootEventTypes(rootEventTypes);
          } else {
            state.touchId = null;
          }
        }
        break;
      }
    }
  },
  onRootEvent: function(event, context, props, state) {
    var type = event.type,
      nativeEvent = event.nativeEvent;

    switch (type) {
      case "touchmove":
      case "mousemove":
      case "pointermove": {
        if (event.passive) {
          return;
        }
        if (state.isSwiping) {
          var obj = null;
          if (type === "touchmove") {
            var targetTouches = nativeEvent.targetTouches;
            for (var i = 0; i < targetTouches.length; i++) {
              if (state.touchId === targetTouches[i].identifier) {
                obj = targetTouches[i];
                break;
              }
            }
          } else {
            obj = nativeEvent;
          }
          if (obj === null) {
            state.isSwiping = false;
            state.swipeTarget = null;
            state.touchId = null;
            context.removeRootEventTypes(rootEventTypes);
            return;
          }
          var _x2 = obj.screenX;
          var _y2 = obj.screenY;
          if (_x2 < state.x && props.onSwipeLeft) {
            state.direction = 3;
          } else if (_x2 > state.x && props.onSwipeRight) {
            state.direction = 1;
          }
          state.x = _x2;
          state.y = _y2;
          if (props.onSwipeMove) {
            var eventData = {
              diffX: _x2 - state.startX,
              diffY: _y2 - state.startY
            };
            dispatchSwipeEvent(
              context,
              "swipemove",
              props.onSwipeMove,
              state,
              UserBlockingEvent,
              eventData
            );
            nativeEvent.preventDefault();
          }
        }
        break;
      }
      case "pointercancel":
      case "touchcancel":
      case "touchend":
      case "mouseup":
      case "pointerup": {
        if (state.isSwiping) {
          if (state.x === state.startX && state.y === state.startY) {
            return;
          }
          if (props.onShouldClaimOwnership) {
            context.releaseOwnership();
          }
          var _direction = state.direction;
          var _lastDirection = state.lastDirection;
          if (_direction !== _lastDirection) {
            if (props.onSwipeLeft && _direction === 3) {
              dispatchSwipeEvent(
                context,
                "swipeleft",
                props.onSwipeLeft,
                state,
                DiscreteEvent
              );
            } else if (props.onSwipeRight && _direction === 1) {
              dispatchSwipeEvent(
                context,
                "swiperight",
                props.onSwipeRight,
                state,
                DiscreteEvent
              );
            }
          }
          if (props.onSwipeEnd) {
            dispatchSwipeEvent(
              context,
              "swipeend",
              props.onSwipeEnd,
              state,
              DiscreteEvent
            );
          }
          state.lastDirection = _direction;
          state.isSwiping = false;
          state.swipeTarget = null;
          state.touchId = null;
          context.removeRootEventTypes(rootEventTypes);
        }
        break;
      }
    }
  }
};

var Swipe = React.unstable_createEvent(SwipeResponder);

function useSwipe(props) {
  React.unstable_useEvent(Swipe, props);
}

var Swipe$1 = (Object.freeze || Object)({
  Swipe: Swipe,
  useSwipe: useSwipe
});

var swipe = Swipe$1;

module.exports = swipe;

  })();
}
