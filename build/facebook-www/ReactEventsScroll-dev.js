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

var UserBlockingEvent = 1;

var targetEventTypes = [
  "scroll",
  "pointerdown",
  "touchstart",
  "keyup",
  "wheel"
];
var rootEventTypes = ["touchcancel", "touchend"];

function createScrollEvent(
  event,
  context,
  type,
  target,
  pointerType,
  direction
) {
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
    pointerType: pointerType,
    direction: direction,
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

function dispatchEvent(event, context, state, name, listener, eventPriority) {
  var target = state.scrollTarget;
  var pointerType = state.pointerType;
  var direction = state.direction;
  var syntheticEvent = createScrollEvent(
    event,
    context,
    name,
    target,
    pointerType,
    direction
  );
  context.dispatchEvent(syntheticEvent, listener, eventPriority);
}

var ScrollResponder = {
  displayName: "Scroll",
  targetEventTypes: targetEventTypes,
  getInitialState: function() {
    return {
      direction: "",
      isTouching: false,
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

    if (props.disabled) {
      if (state.isTouching) {
        state.isTouching = false;
        state.scrollTarget = null;
        state.isDragging = false;
        state.direction = "";
        context.removeRootEventTypes(rootEventTypes);
      }
      return;
    }

    switch (type) {
      case "scroll": {
        var prevScrollTarget = state.scrollTarget;
        var _scrollLeft = 0;
        var _scrollTop = 0;

        // Check if target is the document
        if (target.nodeType === 9) {
          var bodyNode = target.body;
          if (bodyNode !== null) {
            _scrollLeft = bodyNode.offsetLeft;
            _scrollTop = bodyNode.offsetTop;
          }
        } else {
          _scrollLeft = target.scrollLeft;
          _scrollTop = target.scrollTop;
        }

        if (prevScrollTarget !== null) {
          if (_scrollTop === state.scrollTop) {
            if (_scrollLeft > state.scrollLeft) {
              state.direction = "right";
            } else {
              state.direction = "left";
            }
          } else {
            if (_scrollTop > state.scrollTop) {
              state.direction = "down";
            } else {
              state.direction = "up";
            }
          }
        } else {
          state.direction = "";
        }
        state.scrollTarget = target;
        state.scrollLeft = _scrollLeft;
        state.scrollTop = _scrollTop;

        if (state.isTouching && !state.isDragging) {
          state.isDragging = true;
          if (props.onScrollDragStart) {
            dispatchEvent(
              event,
              context,
              state,
              "scrolldragstart",
              props.onScrollDragStart,
              UserBlockingEvent
            );
          }
        }
        if (props.onScroll) {
          dispatchEvent(
            event,
            context,
            state,
            "scroll",
            props.onScroll,
            UserBlockingEvent
          );
        }
        break;
      }
      case "keyup": {
        state.pointerType = pointerType;
        break;
      }
      case "wheel": {
        state.pointerType = "mouse";
        break;
      }
      case "pointerdown": {
        state.pointerType = pointerType;
        break;
      }
      case "touchstart": {
        if (!state.isTouching) {
          state.isTouching = true;
          context.addRootEventTypes(rootEventTypes);
        }
      }
    }
  },
  onRootEvent: function(event, context, props, state) {
    var type = event.type;

    switch (type) {
      case "touchcancel":
      case "touchend": {
        if (state.isTouching) {
          if (state.isDragging && props.onScrollDragEnd) {
            dispatchEvent(
              event,
              context,
              state,
              "scrolldragend",
              props.onScrollDragEnd,
              UserBlockingEvent
            );
          }
          state.isTouching = false;
          state.isDragging = false;
          state.scrollTarget = null;
          state.pointerType = "";
          context.removeRootEventTypes(rootEventTypes);
        }
      }
    }
  },
  onUnmount: function(context, props, state) {
    // TODO
  },
  onOwnershipChange: function(context, props, state) {
    // TODO
  }
};

var Scroll = React.unstable_createEvent(ScrollResponder);

function useScroll(props) {
  React.unstable_useEvent(Scroll, props);
}

var Scroll$1 = (Object.freeze || Object)({
  Scroll: Scroll,
  useScroll: useScroll
});

var scroll = Scroll$1;

module.exports = scroll;

  })();
}
