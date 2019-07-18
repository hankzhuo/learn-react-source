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

"use strict";
var React = require("react"),
  targetEventTypes = ["pointerdown"],
  rootEventTypes = ["pointerup", "pointercancel", "pointermove_active"];
"undefined" !== typeof window &&
  void 0 === window.PointerEvent &&
  (targetEventTypes.push("touchstart", "mousedown"),
  rootEventTypes.push(
    "mouseup",
    "mousemove",
    "touchend",
    "touchcancel",
    "touchmove_active"
  ));
function dispatchSwipeEvent(
  context,
  name,
  listener,
  state,
  eventPriority,
  eventData
) {
  name = context.objectAssign(
    {
      target: state.swipeTarget,
      type: name,
      timeStamp: context.getTimeStamp()
    },
    eventData
  );
  context.dispatchEvent(name, listener, eventPriority);
}
var Swipe = React.unstable_createEvent({
  displayName: "Scroll",
  targetEventTypes: targetEventTypes,
  getInitialState: function() {
    return {
      direction: 0,
      isSwiping: !1,
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
      case "pointerdown":
        state.isSwiping ||
          ((event = nativeEvent),
          "touchstart" === type &&
            ((event = nativeEvent.targetTouches[0]),
            (state.touchId = event.identifier)),
          (type = event.screenX),
          (event = event.screenY),
          (nativeEvent = !0),
          props.onShouldClaimOwnership &&
            props.onShouldClaimOwnership() &&
            (nativeEvent = context.requestGlobalOwnership()),
          nativeEvent
            ? ((state.isSwiping = !0),
              (state.startX = type),
              (state.startY = event),
              (state.x = type),
              (state.y = event),
              (state.swipeTarget = target),
              context.addRootEventTypes(rootEventTypes))
            : (state.touchId = null));
    }
  },
  onRootEvent: function(event, context, props, state) {
    var type = event.type,
      nativeEvent = event.nativeEvent;
    switch (type) {
      case "touchmove":
      case "mousemove":
      case "pointermove":
        if (event.passive) break;
        if (state.isSwiping) {
          event = null;
          if ("touchmove" === type) {
            type = nativeEvent.targetTouches;
            for (var i = 0; i < type.length; i++)
              if (state.touchId === type[i].identifier) {
                event = type[i];
                break;
              }
          } else event = nativeEvent;
          null === event
            ? ((state.isSwiping = !1),
              (state.swipeTarget = null),
              (state.touchId = null),
              context.removeRootEventTypes(rootEventTypes))
            : ((type = event.screenX),
              (event = event.screenY),
              type < state.x && props.onSwipeLeft
                ? (state.direction = 3)
                : type > state.x && props.onSwipeRight && (state.direction = 1),
              (state.x = type),
              (state.y = event),
              props.onSwipeMove &&
                (dispatchSwipeEvent(
                  context,
                  "swipemove",
                  props.onSwipeMove,
                  state,
                  1,
                  { diffX: type - state.startX, diffY: event - state.startY }
                ),
                nativeEvent.preventDefault()));
        }
        break;
      case "pointercancel":
      case "touchcancel":
      case "touchend":
      case "mouseup":
      case "pointerup":
        !state.isSwiping ||
          (state.x === state.startX && state.y === state.startY) ||
          (props.onShouldClaimOwnership && context.releaseOwnership(),
          (nativeEvent = state.direction),
          nativeEvent !== state.lastDirection &&
            (props.onSwipeLeft && 3 === nativeEvent
              ? dispatchSwipeEvent(
                  context,
                  "swipeleft",
                  props.onSwipeLeft,
                  state,
                  0
                )
              : props.onSwipeRight &&
                1 === nativeEvent &&
                dispatchSwipeEvent(
                  context,
                  "swiperight",
                  props.onSwipeRight,
                  state,
                  0
                )),
          props.onSwipeEnd &&
            dispatchSwipeEvent(context, "swipeend", props.onSwipeEnd, state, 0),
          (state.lastDirection = nativeEvent),
          (state.isSwiping = !1),
          (state.swipeTarget = null),
          (state.touchId = null),
          context.removeRootEventTypes(rootEventTypes));
    }
  }
});
module.exports = {
  Swipe: Swipe,
  useSwipe: function(props) {
    React.unstable_useEvent(Swipe, props);
  }
};
