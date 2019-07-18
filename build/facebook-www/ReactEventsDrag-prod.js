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
function dispatchDragEvent(
  context,
  name,
  listener,
  state,
  eventPriority,
  eventData
) {
  name = Object.assign(
    { target: state.dragTarget, type: name, timeStamp: context.getTimeStamp() },
    eventData
  );
  context.dispatchEvent(name, listener, eventPriority);
}
var Drag = React.unstable_createEvent({
  displayName: "Drag",
  targetEventTypes: targetEventTypes,
  getInitialState: function() {
    return {
      dragTarget: null,
      isPointerDown: !1,
      isDragging: !1,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0
    };
  },
  onEvent: function(event, context, props, state) {
    var target = event.target,
      type = event.type;
    event = event.nativeEvent;
    switch (type) {
      case "touchstart":
      case "mousedown":
      case "pointerdown":
        state.isDragging ||
          (props.onShouldClaimOwnership && context.releaseOwnership(),
          (event = "touchstart" === type ? event.changedTouches[0] : event),
          (type = state.startX = event.screenX),
          (event = state.startY = event.screenY),
          (state.x = type),
          (state.y = event),
          (state.dragTarget = target),
          (state.isPointerDown = !0),
          props.onDragStart &&
            dispatchDragEvent(
              context,
              "dragstart",
              props.onDragStart,
              state,
              0
            ),
          context.addRootEventTypes(rootEventTypes));
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
        state.isPointerDown &&
          ((type =
            "touchmove" === type ? nativeEvent.changedTouches[0] : nativeEvent),
          (event = type.screenX),
          (type = type.screenY),
          (state.x = event),
          (state.y = type),
          event !== state.startX || type !== state.startY) &&
          (state.isDragging
            ? (props.onDragMove &&
                dispatchDragEvent(
                  context,
                  "dragmove",
                  props.onDragMove,
                  state,
                  1,
                  { diffX: event - state.startX, diffY: type - state.startY }
                ),
              nativeEvent.preventDefault())
            : ((nativeEvent = !0),
              props.onShouldClaimOwnership &&
                props.onShouldClaimOwnership() &&
                (nativeEvent = context.requestGlobalOwnership()),
              nativeEvent
                ? ((state.isDragging = !0),
                  props.onDragChange &&
                    dispatchDragEvent(
                      context,
                      "dragchange",
                      function() {
                        props.onDragChange(!0);
                      },
                      state,
                      1
                    ))
                : ((state.dragTarget = null),
                  (state.isPointerDown = !1),
                  context.removeRootEventTypes(rootEventTypes))));
        break;
      case "pointercancel":
      case "touchcancel":
      case "touchend":
      case "mouseup":
      case "pointerup":
        state.isDragging &&
          (props.onShouldClaimOwnership && context.releaseOwnership(),
          props.onDragEnd &&
            dispatchDragEvent(context, "dragend", props.onDragEnd, state, 0),
          props.onDragChange &&
            dispatchDragEvent(
              context,
              "dragchange",
              function() {
                props.onDragChange(!1);
              },
              state,
              1
            ),
          (state.isDragging = !1)),
          state.isPointerDown &&
            ((state.dragTarget = null),
            (state.isPointerDown = !1),
            context.removeRootEventTypes(rootEventTypes));
    }
  }
});
module.exports = {
  Drag: Drag,
  useDrag: function(props) {
    React.unstable_useEvent(Drag, props);
  }
};
