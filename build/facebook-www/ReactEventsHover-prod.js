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
  targetEventTypes = [
    "pointerover",
    "pointermove",
    "pointerout",
    "pointercancel"
  ];
"undefined" !== typeof window &&
  void 0 === window.PointerEvent &&
  targetEventTypes.push("touchstart", "mouseover", "mousemove", "mouseout");
function createHoverEvent(event, context, type, target) {
  var clientX = null,
    clientY = null,
    pageX = null,
    pageY = null,
    screenX = null,
    screenY = null;
  event &&
    ((event = event.nativeEvent),
    (clientX = event.clientX),
    (clientY = event.clientY),
    (pageX = event.pageX),
    (pageY = event.pageY),
    (screenX = event.screenX),
    (screenY = event.screenY));
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
  event = createHoverEvent(event, context, "hoverchange", state.hoverTarget);
  context.dispatchEvent(
    event,
    function() {
      props.onHoverChange(bool);
    },
    1
  );
}
function dispatchHoverStartEvents(event, context, props, state) {
  var target = state.hoverTarget;
  if (
    null === event ||
    !context.isTargetWithinEventResponderScope(event.nativeEvent.relatedTarget)
  ) {
    state.isHovered = !0;
    null !== state.hoverEndTimeout &&
      (context.clearTimeout(state.hoverEndTimeout),
      (state.hoverEndTimeout = null));
    var activate = function() {
      state.isActiveHovered = !0;
      if (props.onHoverStart) {
        var syntheticEvent = createHoverEvent(
          event,
          context,
          "hoverstart",
          target
        );
        context.dispatchEvent(syntheticEvent, props.onHoverStart, 1);
      }
      props.onHoverChange &&
        dispatchHoverChangeEvent(event, context, props, state);
    };
    if (!state.isActiveHovered) {
      var _delayHoverStart = calculateDelayMS(props.delayHoverStart, 0, 0);
      0 < _delayHoverStart
        ? (state.hoverStartTimeout = context.setTimeout(function() {
            state.hoverStartTimeout = null;
            activate();
          }, _delayHoverStart))
        : activate();
    }
  }
}
function dispatchHoverEndEvents(event, context, props, state) {
  var target = state.hoverTarget;
  if (
    null === event ||
    !context.isTargetWithinEventResponderScope(event.nativeEvent.relatedTarget)
  ) {
    state.isHovered = !1;
    null !== state.hoverStartTimeout &&
      (context.clearTimeout(state.hoverStartTimeout),
      (state.hoverStartTimeout = null));
    var deactivate = function() {
      state.isActiveHovered = !1;
      if (props.onHoverEnd) {
        var syntheticEvent = createHoverEvent(
          event,
          context,
          "hoverend",
          target
        );
        context.dispatchEvent(syntheticEvent, props.onHoverEnd, 1);
      }
      props.onHoverChange &&
        dispatchHoverChangeEvent(event, context, props, state);
      state.hoverTarget = null;
      state.ignoreEmulatedMouseEvents = !1;
      state.isTouched = !1;
    };
    if (state.isActiveHovered) {
      var _delayHoverEnd = calculateDelayMS(props.delayHoverEnd, 0, 0);
      0 < _delayHoverEnd
        ? (state.hoverEndTimeout = context.setTimeout(function() {
            deactivate();
          }, _delayHoverEnd))
        : deactivate();
    }
  }
}
function calculateDelayMS(delay) {
  var fallback =
      2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
    maybeNumber = null == delay ? null : delay;
  return Math.max(
    1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
    null != maybeNumber ? maybeNumber : fallback
  );
}
function isEmulatedMouseEvent(event, state) {
  event = event.type;
  return (
    state.ignoreEmulatedMouseEvents &&
    ("mousemove" === event || "mouseover" === event || "mouseout" === event)
  );
}
var Hover = React.unstable_createEvent({
  displayName: "Hover",
  targetEventTypes: targetEventTypes,
  getInitialState: function() {
    return {
      isActiveHovered: !1,
      isHovered: !1,
      isTouched: !1,
      hoverStartTimeout: null,
      hoverEndTimeout: null,
      ignoreEmulatedMouseEvents: !1
    };
  },
  allowMultipleHostChildren: !1,
  allowEventHooks: !0,
  onEvent: function(event, context, props, state) {
    var pointerType = event.pointerType,
      type = event.type;
    if (props.disabled)
      state.isHovered &&
        (dispatchHoverEndEvents(event, context, props, state),
        (state.ignoreEmulatedMouseEvents = !1)),
        state.isTouched && (state.isTouched = !1);
    else
      switch (type) {
        case "pointerover":
        case "mouseover":
        case "touchstart":
          state.isHovered ||
            (state.isTouched || "touch" === pointerType
              ? (state.isTouched = !0)
              : isEmulatedMouseEvent(event, state) ||
                ((state.hoverTarget = event.responderTarget),
                (state.ignoreEmulatedMouseEvents = !0),
                dispatchHoverStartEvents(event, context, props, state)));
          break;
        case "pointermove":
        case "mousemove":
          state.isHovered &&
            !isEmulatedMouseEvent(event, state) &&
            props.onHoverMove &&
            null !== state.hoverTarget &&
            ((event = createHoverEvent(
              event,
              context,
              "hovermove",
              state.hoverTarget
            )),
            context.dispatchEvent(event, props.onHoverMove, 1));
          break;
        case "pointerout":
        case "pointercancel":
        case "mouseout":
        case "touchcancel":
        case "touchend":
          state.isHovered &&
            (dispatchHoverEndEvents(event, context, props, state),
            (state.ignoreEmulatedMouseEvents = !1)),
            state.isTouched && (state.isTouched = !1);
      }
  },
  onUnmount: function(context, props, state) {
    state.isHovered && dispatchHoverEndEvents(null, context, props, state);
  },
  onOwnershipChange: function(context, props, state) {
    state.isHovered && dispatchHoverEndEvents(null, context, props, state);
  }
});
module.exports = {
  Hover: Hover,
  useHover: function(props) {
    React.unstable_useEvent(Hover, props);
  }
};
