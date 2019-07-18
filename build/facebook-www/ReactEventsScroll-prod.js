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
  rootEventTypes = ["touchcancel", "touchend"];
function dispatchEvent(event, context, state, name, listener, eventPriority) {
  var target = state.scrollTarget,
    pointerType = state.pointerType;
  state = state.direction;
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
  name = {
    target: target,
    type: name,
    pointerType: pointerType,
    direction: state,
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
  context.dispatchEvent(name, listener, eventPriority);
}
var Scroll = React.unstable_createEvent({
  displayName: "Scroll",
  targetEventTypes: ["scroll", "pointerdown", "touchstart", "keyup", "wheel"],
  getInitialState: function() {
    return {
      direction: "",
      isTouching: !1,
      pointerType: "",
      prevScrollTop: 0,
      prevScrollLeft: 0,
      scrollTarget: null
    };
  },
  onEvent: function(event, context, props, state) {
    var pointerType = event.pointerType,
      target = event.target,
      type = event.type;
    if (props.disabled)
      state.isTouching &&
        ((state.isTouching = !1),
        (state.scrollTarget = null),
        (state.isDragging = !1),
        (state.direction = ""),
        context.removeRootEventTypes(rootEventTypes));
    else
      switch (type) {
        case "scroll":
          pointerType = state.scrollTarget;
          var _scrollTop = (type = 0);
          if (9 === target.nodeType) {
            var bodyNode = target.body;
            null !== bodyNode &&
              ((type = bodyNode.offsetLeft), (_scrollTop = bodyNode.offsetTop));
          } else (type = target.scrollLeft), (_scrollTop = target.scrollTop);
          state.direction =
            null !== pointerType
              ? _scrollTop === state.scrollTop
                ? type > state.scrollLeft
                  ? "right"
                  : "left"
                : _scrollTop > state.scrollTop
                  ? "down"
                  : "up"
              : "";
          state.scrollTarget = target;
          state.scrollLeft = type;
          state.scrollTop = _scrollTop;
          state.isTouching &&
            !state.isDragging &&
            ((state.isDragging = !0),
            props.onScrollDragStart &&
              dispatchEvent(
                event,
                context,
                state,
                "scrolldragstart",
                props.onScrollDragStart,
                1
              ));
          props.onScroll &&
            dispatchEvent(event, context, state, "scroll", props.onScroll, 1);
          break;
        case "keyup":
          state.pointerType = pointerType;
          break;
        case "wheel":
          state.pointerType = "mouse";
          break;
        case "pointerdown":
          state.pointerType = pointerType;
          break;
        case "touchstart":
          state.isTouching ||
            ((state.isTouching = !0),
            context.addRootEventTypes(rootEventTypes));
      }
  },
  onRootEvent: function(event, context, props, state) {
    switch (event.type) {
      case "touchcancel":
      case "touchend":
        state.isTouching &&
          (state.isDragging &&
            props.onScrollDragEnd &&
            dispatchEvent(
              event,
              context,
              state,
              "scrolldragend",
              props.onScrollDragEnd,
              1
            ),
          (state.isTouching = !1),
          (state.isDragging = !1),
          (state.scrollTarget = null),
          (state.pointerType = ""),
          context.removeRootEventTypes(rootEventTypes));
    }
  },
  onUnmount: function() {},
  onOwnershipChange: function() {}
});
module.exports = {
  Scroll: Scroll,
  useScroll: function(props) {
    React.unstable_useEvent(Scroll, props);
  }
};
