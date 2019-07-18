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

/**
 * Types
 */

/**
 * Shared between Focus and FocusWithin
 */

var isGlobalFocusVisible = true;

var isMac =
  typeof window !== "undefined" && window.navigator != null
    ? /^Mac/.test(window.navigator.platform)
    : false;

var targetEventTypes = ["focus", "blur"];

var rootEventTypes = [
  "keydown",
  "keyup",
  "pointermove",
  "pointerdown",
  "pointerup"
];

// If PointerEvents is not supported (e.g., Safari), also listen to touch and mouse events.
if (typeof window !== "undefined" && window.PointerEvent === undefined) {
  rootEventTypes.push(
    "mousemove",
    "mousedown",
    "mouseup",
    "touchmove",
    "touchstart",
    "touchend"
  );
}

function createFocusEvent(context, type, target, pointerType) {
  return {
    target: target,
    type: type,
    pointerType: pointerType,
    timeStamp: context.getTimeStamp()
  };
}

function handleRootPointerEvent(event, context, state, callback) {
  var type = event.type,
    target = event.target;
  // Ignore a Safari quirks where 'mousemove' is dispatched on the 'html'
  // element when the window blurs.

  if (type === "mousemove" && target.nodeName === "HTML") {
    return;
  }

  isGlobalFocusVisible = false;

  // Focus should stop being visible if a pointer is used on the element
  // after it was focused using a keyboard.
  var focusTarget = state.focusTarget;
  if (
    focusTarget !== null &&
    context.isTargetWithinNode(event.target, focusTarget) &&
    (type === "mousedown" || type === "touchstart" || type === "pointerdown")
  ) {
    callback(false);
  }
}

function handleRootEvent(event, context, state, callback) {
  var type = event.type;

  switch (type) {
    case "mousemove":
    case "mousedown":
    case "mouseup": {
      state.pointerType = "mouse";
      handleRootPointerEvent(event, context, state, callback);
      break;
    }
    case "pointermove":
    case "pointerdown":
    case "pointerup": {
      // $FlowFixMe: Flow doesn't know about PointerEvents
      var nativeEvent = event.nativeEvent;
      state.pointerType = nativeEvent.pointerType;
      handleRootPointerEvent(event, context, state, callback);
      break;
    }
    case "touchmove":
    case "touchstart":
    case "touchend": {
      state.pointerType = "touch";
      handleRootPointerEvent(event, context, state, callback);
      break;
    }

    case "keydown":
    case "keyup": {
      var _nativeEvent = event.nativeEvent;
      if (
        _nativeEvent.key === "Tab" &&
        !(
          _nativeEvent.metaKey ||
          (!isMac && _nativeEvent.altKey) ||
          _nativeEvent.ctrlKey
        )
      ) {
        state.pointerType = "keyboard";
        isGlobalFocusVisible = true;
      }
      break;
    }
  }
}

/**
 * Focus Responder
 */

function dispatchFocusEvents(context, props, state) {
  var pointerType = state.pointerType;
  var target = state.focusTarget;
  if (props.onFocus) {
    var syntheticEvent = createFocusEvent(
      context,
      "focus",
      target,
      pointerType
    );
    context.dispatchEvent(syntheticEvent, props.onFocus, DiscreteEvent);
  }
  if (props.onFocusChange) {
    var listener = function() {
      props.onFocusChange(true);
    };
    var _syntheticEvent = createFocusEvent(
      context,
      "focuschange",
      target,
      pointerType
    );
    context.dispatchEvent(_syntheticEvent, listener, DiscreteEvent);
  }
  if (state.isFocusVisible) {
    dispatchFocusVisibleChangeEvent(context, props, state, true);
  }
}

function dispatchBlurEvents(context, props, state) {
  var pointerType = state.pointerType;
  var target = state.focusTarget;
  if (props.onBlur) {
    var syntheticEvent = createFocusEvent(context, "blur", target, pointerType);
    context.dispatchEvent(syntheticEvent, props.onBlur, DiscreteEvent);
  }
  if (props.onFocusChange) {
    var listener = function() {
      props.onFocusChange(false);
    };
    var _syntheticEvent2 = createFocusEvent(
      context,
      "focuschange",
      target,
      pointerType
    );
    context.dispatchEvent(_syntheticEvent2, listener, DiscreteEvent);
  }
  if (state.isFocusVisible) {
    dispatchFocusVisibleChangeEvent(context, props, state, false);
  }
}

function dispatchFocusVisibleChangeEvent(context, props, state, value) {
  var pointerType = state.pointerType;
  var target = state.focusTarget;
  if (props.onFocusVisibleChange) {
    var listener = function() {
      props.onFocusVisibleChange(value);
    };
    var syntheticEvent = createFocusEvent(
      context,
      "focusvisiblechange",
      target,
      pointerType
    );
    context.dispatchEvent(syntheticEvent, listener, DiscreteEvent);
  }
}

function unmountFocusResponder(context, props, state) {
  if (state.isFocused) {
    dispatchBlurEvents(context, props, state);
  }
}

var FocusResponder = {
  displayName: "Focus",
  targetEventTypes: targetEventTypes,
  rootEventTypes: rootEventTypes,
  getInitialState: function() {
    return {
      focusTarget: null,
      isFocused: false,
      isFocusVisible: false,
      pointerType: ""
    };
  },
  onEvent: function(event, context, props, state) {
    var type = event.type,
      target = event.target;

    if (props.disabled) {
      if (state.isFocused) {
        dispatchBlurEvents(context, props, state);
        state.isFocused = false;
        state.focusTarget = null;
      }
      return;
    }

    switch (type) {
      case "focus": {
        state.focusTarget = event.responderTarget;
        // Limit focus events to the direct child of the event component.
        // Browser focus is not expected to bubble.
        if (!state.isFocused && state.focusTarget === target) {
          state.isFocused = true;
          state.isFocusVisible = isGlobalFocusVisible;
          dispatchFocusEvents(context, props, state);
        }
        break;
      }
      case "blur": {
        if (state.isFocused) {
          dispatchBlurEvents(context, props, state);
          state.isFocusVisible = isGlobalFocusVisible;
          state.isFocused = false;
        }
        break;
      }
    }
  },
  onRootEvent: function(event, context, props, state) {
    handleRootEvent(event, context, state, function(isFocusVisible) {
      if (state.isFocusVisible !== isFocusVisible) {
        state.isFocusVisible = isFocusVisible;
        dispatchFocusVisibleChangeEvent(context, props, state, isFocusVisible);
      }
    });
  },
  onUnmount: function(context, props, state) {
    unmountFocusResponder(context, props, state);
  },
  onOwnershipChange: function(context, props, state) {
    unmountFocusResponder(context, props, state);
  }
};

var Focus = React.unstable_createEvent(FocusResponder);

function useFocus(props) {
  React.unstable_useEvent(Focus, props);
}

/**
 * FocusWithin Responder
 */

function dispatchFocusWithinChangeEvent(context, props, state, value) {
  var pointerType = state.pointerType;
  var target = state.focusTarget;
  if (props.onFocusWithinChange) {
    var listener = function() {
      props.onFocusWithinChange(value);
    };
    var syntheticEvent = createFocusEvent(
      context,
      "focuswithinchange",
      target,
      pointerType
    );
    context.dispatchEvent(syntheticEvent, listener, DiscreteEvent);
  }
  if (state.isFocusVisible) {
    dispatchFocusWithinVisibleChangeEvent(context, props, state, value);
  }
}

function dispatchFocusWithinVisibleChangeEvent(context, props, state, value) {
  var pointerType = state.pointerType;
  var target = state.focusTarget;
  if (props.onFocusWithinVisibleChange) {
    var listener = function() {
      props.onFocusWithinVisibleChange(value);
    };
    var syntheticEvent = createFocusEvent(
      context,
      "focuswithinvisiblechange",
      target,
      pointerType
    );
    context.dispatchEvent(syntheticEvent, listener, DiscreteEvent);
  }
}

function unmountFocusWithinResponder(context, props, state) {
  if (state.isFocused) {
    dispatchFocusWithinChangeEvent(context, props, state, false);
  }
}

var FocusWithinResponder = {
  displayName: "FocusWithin",
  targetEventTypes: targetEventTypes,
  rootEventTypes: rootEventTypes,
  getInitialState: function() {
    return {
      focusTarget: null,
      isFocused: false,
      isFocusVisible: false,
      pointerType: ""
    };
  },
  onEvent: function(event, context, props, state) {
    var nativeEvent = event.nativeEvent,
      type = event.type;

    var relatedTarget = nativeEvent.relatedTarget;

    if (props.disabled) {
      if (state.isFocused) {
        dispatchFocusWithinChangeEvent(context, props, state, false);
        state.isFocused = false;
        state.focusTarget = null;
      }
      return;
    }

    switch (type) {
      case "focus": {
        state.focusTarget = event.responderTarget;
        // Limit focus events to the direct child of the event component.
        // Browser focus is not expected to bubble.
        if (!state.isFocused) {
          state.isFocused = true;
          state.isFocusVisible = isGlobalFocusVisible;
          dispatchFocusWithinChangeEvent(context, props, state, true);
        }
        if (!state.isFocusVisible && isGlobalFocusVisible) {
          state.isFocusVisible = isGlobalFocusVisible;
          dispatchFocusWithinVisibleChangeEvent(context, props, state, true);
        }
        break;
      }
      case "blur": {
        if (
          state.isFocused &&
          !context.isTargetWithinEventResponderScope(relatedTarget)
        ) {
          dispatchFocusWithinChangeEvent(context, props, state, false);
          state.isFocused = false;
        }
        break;
      }
    }
  },
  onRootEvent: function(event, context, props, state) {
    handleRootEvent(event, context, state, function(isFocusVisible) {
      if (state.isFocusVisible !== isFocusVisible) {
        state.isFocusVisible = isFocusVisible;
        dispatchFocusWithinVisibleChangeEvent(
          context,
          props,
          state,
          isFocusVisible
        );
      }
    });
  },
  onUnmount: function(context, props, state) {
    unmountFocusWithinResponder(context, props, state);
  },
  onOwnershipChange: function(context, props, state) {
    unmountFocusWithinResponder(context, props, state);
  }
};

var FocusWithin = React.unstable_createEvent(FocusWithinResponder);

function useFocusWithin(props) {
  React.unstable_useEvent(FocusWithin, props);
}

var Focus$1 = (Object.freeze || Object)({
  Focus: Focus,
  useFocus: useFocus,
  FocusWithin: FocusWithin,
  useFocusWithin: useFocusWithin
});

var focus = Focus$1;

module.exports = focus;

  })();
}
