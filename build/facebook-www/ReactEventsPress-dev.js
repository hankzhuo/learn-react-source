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

var warningWithoutStack = require("warning");

var ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

// Prevent newer renderers from RTE when used with older react package versions.
// Current owner and dispatcher used to share the same ref,
// but PR #14548 split them out to better support the react-debug-tools package.
if (!ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher")) {
  ReactSharedInternals.ReactCurrentDispatcher = {
    current: null
  };
}
if (!ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig")) {
  ReactSharedInternals.ReactCurrentBatchConfig = {
    suspense: null
  };
}

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = warningWithoutStack;

{
  warning = function(condition, format) {
    if (condition) {
      return;
    }
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();
    // eslint-disable-next-line react-internal/warning-and-invariant-args

    for (
      var _len = arguments.length,
        args = Array(_len > 2 ? _len - 2 : 0),
        _key = 2;
      _key < _len;
      _key++
    ) {
      args[_key - 2] = arguments[_key];
    }

    warningWithoutStack.apply(
      undefined,
      [false, format + "%s"].concat(args, [stack])
    );
  };
}

var warning$1 = warning;

var DiscreteEvent = 0;
var UserBlockingEvent = 1;

var isMac =
  typeof window !== "undefined" && window.navigator != null
    ? /^Mac/.test(window.navigator.platform)
    : false;
var DEFAULT_PRESS_END_DELAY_MS = 0;
var DEFAULT_PRESS_START_DELAY_MS = 0;
var DEFAULT_LONG_PRESS_DELAY_MS = 500;
var DEFAULT_PRESS_RETENTION_OFFSET = {
  bottom: 20,
  top: 20,
  left: 20,
  right: 20
};

var targetEventTypes = [
  "keydown_active",
  "contextmenu_active",
  // We need to preventDefault on pointerdown for mouse/pen events
  // that are in hit target area but not the element area.
  "pointerdown_active",
  "click_active"
];
var rootEventTypes = [
  "click",
  "keyup",
  "pointerup",
  "pointermove",
  "scroll",
  "pointercancel",
  // We listen to this here so stopPropagation can
  // block other mouseup events used internally
  "mouseup_active",
  "touchend"
];

// If PointerEvents is not supported (e.g., Safari), also listen to touch and mouse events.
if (typeof window !== "undefined" && window.PointerEvent === undefined) {
  targetEventTypes.push("touchstart", "mousedown");
  rootEventTypes.push(
    "mousemove",
    "touchmove",
    "touchcancel",
    // Used as a 'cancel' signal for mouse interactions
    "dragstart"
  );
}

function createPressEvent(
  context,
  type,
  target,
  pointerType,
  event,
  touchEvent,
  defaultPrevented
) {
  var timeStamp = context.getTimeStamp();
  var button = "primary";
  var clientX = null;
  var clientY = null;
  var pageX = null;
  var pageY = null;
  var screenX = null;
  var screenY = null;
  var altKey = false;
  var ctrlKey = false;
  var metaKey = false;
  var shiftKey = false;

  if (event) {
    var nativeEvent = event.nativeEvent;

    // Only check for one property, checking for all of them is costly. We can assume
    // if clientX exists, so do the rest.
    altKey = nativeEvent.altKey;
    ctrlKey = nativeEvent.ctrlKey;
    metaKey = nativeEvent.metaKey;
    shiftKey = nativeEvent.shiftKey;
    var eventObject = void 0;
    eventObject = touchEvent || nativeEvent;
    if (eventObject) {
      var _eventObject = eventObject;
      clientX = _eventObject.clientX;
      clientY = _eventObject.clientY;
      pageX = _eventObject.pageX;
      pageY = _eventObject.pageY;
      screenX = _eventObject.screenX;
      screenY = _eventObject.screenY;
    }
    if (nativeEvent.button === 1) {
      button = "auxillary";
    }
  }
  return {
    button: button,
    defaultPrevented: defaultPrevented,
    target: target,
    type: type,
    pointerType: pointerType,
    timeStamp: timeStamp,
    clientX: clientX,
    clientY: clientY,
    pageX: pageX,
    pageY: pageY,
    screenX: screenX,
    screenY: screenY,
    x: clientX,
    y: clientY,
    altKey: altKey,
    ctrlKey: ctrlKey,
    metaKey: metaKey,
    shiftKey: shiftKey
  };
}

function dispatchEvent(event, context, state, name, listener, eventPriority) {
  var target = state.pressTarget;
  var pointerType = state.pointerType;
  var defaultPrevented =
    (event != null && event.nativeEvent.defaultPrevented === true) ||
    (name === "press" && state.shouldPreventClick);
  var touchEvent = state.touchEvent;
  var syntheticEvent = createPressEvent(
    context,
    name,
    target,
    pointerType,
    event,
    touchEvent,
    defaultPrevented
  );
  context.dispatchEvent(syntheticEvent, listener, eventPriority);
}

function dispatchPressChangeEvent(event, context, props, state) {
  var bool = state.isActivePressed;
  var listener = function() {
    props.onPressChange(bool);
  };
  dispatchEvent(event, context, state, "presschange", listener, DiscreteEvent);
}

function dispatchLongPressChangeEvent(event, context, props, state) {
  var bool = state.isLongPressed;
  var listener = function() {
    props.onLongPressChange(bool);
  };
  dispatchEvent(
    event,
    context,
    state,
    "longpresschange",
    listener,
    DiscreteEvent
  );
}

function activate(event, context, props, state) {
  var nativeEvent = event.nativeEvent;

  var _ref = state.touchEvent || nativeEvent,
    x = _ref.clientX,
    y = _ref.clientY;

  var wasActivePressed = state.isActivePressed;
  state.isActivePressed = true;
  if (x !== undefined && y !== undefined) {
    state.activationPosition = { x: x, y: y };
  }

  if (props.onPressStart) {
    dispatchEvent(
      event,
      context,
      state,
      "pressstart",
      props.onPressStart,
      DiscreteEvent
    );
  }
  if (!wasActivePressed && props.onPressChange) {
    dispatchPressChangeEvent(event, context, props, state);
  }
}

function deactivate(event, context, props, state) {
  var wasLongPressed = state.isLongPressed;
  state.isActivePressed = false;
  state.isLongPressed = false;

  if (props.onPressEnd) {
    dispatchEvent(
      event,
      context,
      state,
      "pressend",
      props.onPressEnd,
      DiscreteEvent
    );
  }
  if (props.onPressChange) {
    dispatchPressChangeEvent(event, context, props, state);
  }
  if (wasLongPressed && props.onLongPressChange) {
    dispatchLongPressChangeEvent(event, context, props, state);
  }
}

function dispatchPressStartEvents(event, context, props, state) {
  state.isPressed = true;

  if (state.pressEndTimeout !== null) {
    context.clearTimeout(state.pressEndTimeout);
    state.pressEndTimeout = null;
  }

  var dispatch = function() {
    state.isActivePressStart = true;
    activate(event, context, props, state);

    if (
      (props.onLongPress || props.onLongPressChange) &&
      !state.isLongPressed
    ) {
      var _delayLongPress = calculateDelayMS(
        props.delayLongPress,
        10,
        DEFAULT_LONG_PRESS_DELAY_MS
      );
      state.longPressTimeout = context.setTimeout(function() {
        state.isLongPressed = true;
        state.longPressTimeout = null;
        if (props.onLongPress) {
          dispatchEvent(
            event,
            context,
            state,
            "longpress",
            props.onLongPress,
            DiscreteEvent
          );
        }
        if (props.onLongPressChange) {
          dispatchLongPressChangeEvent(event, context, props, state);
        }
      }, _delayLongPress);
    }
  };

  if (!state.isActivePressStart) {
    var _delayPressStart = calculateDelayMS(
      props.delayPressStart,
      0,
      DEFAULT_PRESS_START_DELAY_MS
    );
    if (_delayPressStart > 0) {
      state.pressStartTimeout = context.setTimeout(function() {
        state.pressStartTimeout = null;
        dispatch();
      }, _delayPressStart);
    } else {
      dispatch();
    }
  }
}

function dispatchPressEndEvents(event, context, props, state) {
  var wasActivePressStart = state.isActivePressStart;
  var activationWasForced = false;

  state.isActivePressStart = false;
  state.isPressed = false;

  if (state.longPressTimeout !== null) {
    context.clearTimeout(state.longPressTimeout);
    state.longPressTimeout = null;
  }

  if (!wasActivePressStart && state.pressStartTimeout !== null) {
    context.clearTimeout(state.pressStartTimeout);
    state.pressStartTimeout = null;
    // don't activate if a press has moved beyond the responder region
    if (state.isPressWithinResponderRegion && event != null) {
      // if we haven't yet activated (due to delays), activate now
      activate(event, context, props, state);
      activationWasForced = true;
    }
  }

  if (state.isActivePressed) {
    var _delayPressEnd = calculateDelayMS(
      props.delayPressEnd,
      // if activation and deactivation occur during the same event there's no
      // time for visual user feedback therefore a small delay is added before
      // deactivating.
      activationWasForced ? 10 : 0,
      DEFAULT_PRESS_END_DELAY_MS
    );
    if (_delayPressEnd > 0) {
      state.pressEndTimeout = context.setTimeout(function() {
        state.pressEndTimeout = null;
        deactivate(event, context, props, state);
      }, _delayPressEnd);
    } else {
      deactivate(event, context, props, state);
    }
  }

  state.responderRegionOnDeactivation = null;
}

function dispatchCancel(event, context, props, state) {
  state.touchEvent = null;
  if (state.pressStartTimeout !== null) {
    context.clearTimeout(state.pressStartTimeout);
    state.pressStartTimeout = null;
  }
  if (state.isPressed) {
    state.ignoreEmulatedMouseEvents = false;
    dispatchPressEndEvents(event, context, props, state);
  }
  removeRootEventTypes(context, state);
}

function isValidKeyboardEvent(nativeEvent) {
  var key = nativeEvent.key,
    target = nativeEvent.target;
  var tagName = target.tagName,
    isContentEditable = target.isContentEditable;
  // Accessibility for keyboards. Space and Enter only.
  // "Spacebar" is for IE 11

  return (
    (key === "Enter" || key === " " || key === "Spacebar") &&
    tagName !== "INPUT" &&
    tagName !== "TEXTAREA" &&
    isContentEditable !== true
  );
}

function calculateDelayMS(delay) {
  var min =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var fallback =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var maybeNumber = delay == null ? null : delay;
  return Math.max(min, maybeNumber != null ? maybeNumber : fallback);
}

// TODO: account for touch hit slop
function calculateResponderRegion(context, target, props) {
  var pressRetentionOffset = context.objectAssign(
    {},
    DEFAULT_PRESS_RETENTION_OFFSET,
    props.pressRetentionOffset
  );

  var _target$getBoundingCl = target.getBoundingClientRect(),
    left = _target$getBoundingCl.left,
    right = _target$getBoundingCl.right,
    bottom = _target$getBoundingCl.bottom,
    top = _target$getBoundingCl.top;

  if (pressRetentionOffset) {
    if (pressRetentionOffset.bottom != null) {
      bottom += pressRetentionOffset.bottom;
    }
    if (pressRetentionOffset.left != null) {
      left -= pressRetentionOffset.left;
    }
    if (pressRetentionOffset.right != null) {
      right += pressRetentionOffset.right;
    }
    if (pressRetentionOffset.top != null) {
      top -= pressRetentionOffset.top;
    }
  }

  return {
    bottom: bottom,
    top: top,
    left: left,
    right: right
  };
}

function getTouchFromPressEvent(nativeEvent) {
  var targetTouches = nativeEvent.targetTouches;
  if (targetTouches.length > 0) {
    return targetTouches[0];
  }
  return null;
}

function unmountResponder(context, props, state) {
  if (state.isPressed) {
    removeRootEventTypes(context, state);
    dispatchPressEndEvents(null, context, props, state);
  }
}

function addRootEventTypes(context, state) {
  if (!state.addedRootEvents) {
    state.addedRootEvents = true;
    context.addRootEventTypes(rootEventTypes);
  }
}

function removeRootEventTypes(context, state) {
  if (state.addedRootEvents) {
    state.addedRootEvents = false;
    context.removeRootEventTypes(rootEventTypes);
  }
}

function getTouchById(nativeEvent, pointerId) {
  var changedTouches = nativeEvent.changedTouches;
  for (var i = 0; i < changedTouches.length; i++) {
    var touch = changedTouches[i];
    if (touch.identifier === pointerId) {
      return touch;
    }
  }
  return null;
}

function getTouchTarget(context, touchEvent) {
  var doc = context.getActiveDocument();
  return doc.elementFromPoint(touchEvent.clientX, touchEvent.clientY);
}

function updateIsPressWithinResponderRegion(
  nativeEventOrTouchEvent,
  context,
  props,
  state
) {
  // Calculate the responder region we use for deactivation if not
  // already done during move event.
  if (state.responderRegionOnDeactivation == null) {
    state.responderRegionOnDeactivation = calculateResponderRegion(
      context,
      state.pressTarget,
      props
    );
  }
  var responderRegionOnActivation = state.responderRegionOnActivation,
    responderRegionOnDeactivation = state.responderRegionOnDeactivation;

  var left = void 0,
    top = void 0,
    right = void 0,
    bottom = void 0;

  if (responderRegionOnActivation != null) {
    left = responderRegionOnActivation.left;
    top = responderRegionOnActivation.top;
    right = responderRegionOnActivation.right;
    bottom = responderRegionOnActivation.bottom;

    if (responderRegionOnDeactivation != null) {
      left = Math.min(left, responderRegionOnDeactivation.left);
      top = Math.min(top, responderRegionOnDeactivation.top);
      right = Math.max(right, responderRegionOnDeactivation.right);
      bottom = Math.max(bottom, responderRegionOnDeactivation.bottom);
    }
  }
  var _ref2 = nativeEventOrTouchEvent,
    x = _ref2.clientX,
    y = _ref2.clientY;

  state.isPressWithinResponderRegion =
    left != null &&
    right != null &&
    top != null &&
    bottom != null &&
    x !== null &&
    y !== null &&
    x >= left &&
    x <= right &&
    y >= top &&
    y <= bottom;
}

function handleStopPropagation(props, context, nativeEvent) {
  var stopPropagation = props.stopPropagation;
  if (stopPropagation !== undefined && context.isRespondingToHook()) {
    {
      warning$1(
        false,
        '"stopPropagation" prop cannot be passed to Press event hooks. This will result in a no-op.'
      );
    }
  } else if (stopPropagation === true) {
    nativeEvent.stopPropagation();
  }
}

function targetIsDocument(target) {
  // When target is null, it is the root
  return target === null || target.nodeType === 9;
}

var PressResponder = {
  displayName: "Press",
  targetEventTypes: targetEventTypes,
  getInitialState: function() {
    return {
      activationPosition: null,
      addedRootEvents: false,
      isActivePressed: false,
      isActivePressStart: false,
      isLongPressed: false,
      isPressed: false,
      isPressWithinResponderRegion: true,
      longPressTimeout: null,
      pointerType: "",
      pressEndTimeout: null,
      pressStartTimeout: null,
      pressTarget: null,
      responderRegionOnActivation: null,
      responderRegionOnDeactivation: null,
      ignoreEmulatedMouseEvents: false,
      activePointerId: null,
      shouldPreventClick: false,
      touchEvent: null
    };
  },
  onEvent: function(event, context, props, state) {
    var pointerId = event.pointerId,
      pointerType = event.pointerType,
      type = event.type;

    if (props.disabled) {
      removeRootEventTypes(context, state);
      dispatchPressEndEvents(event, context, props, state);
      state.ignoreEmulatedMouseEvents = false;
      return;
    }
    var nativeEvent = event.nativeEvent;
    var isPressed = state.isPressed;

    handleStopPropagation(props, context, nativeEvent);
    switch (type) {
      // START
      case "pointerdown":
      case "keydown":
      case "mousedown":
      case "touchstart": {
        if (!isPressed) {
          var isTouchEvent = type === "touchstart";
          var isPointerEvent = type === "pointerdown";
          var isKeyboardEvent = pointerType === "keyboard";
          var isMouseEvent = pointerType === "mouse";

          if (isPointerEvent || isTouchEvent) {
            state.ignoreEmulatedMouseEvents = true;
          } else if (type === "mousedown" && state.ignoreEmulatedMouseEvents) {
            // Ignore emulated mouse events
            return;
          } else if (isKeyboardEvent) {
            // Ignore unrelated key events
            if (!isValidKeyboardEvent(nativeEvent)) {
              return;
            }
          }

          // We set these here, before the button check so we have this
          // data around for handling of the context menu
          state.pointerType = pointerType;
          var _pressTarget = (state.pressTarget = event.responderTarget);
          if (isPointerEvent) {
            state.activePointerId = pointerId;
          } else if (isTouchEvent) {
            var _touchEvent = getTouchFromPressEvent(nativeEvent);
            if (_touchEvent === null) {
              return;
            }
            state.touchEvent = _touchEvent;
            state.activePointerId = _touchEvent.identifier;
          }

          // Ignore any device buttons except primary/auxillary and touch/pen contact.
          // Additionally we ignore primary-button + ctrl-key with Macs as that
          // acts like right-click and opens the contextmenu.
          if (
            nativeEvent.button > 1 ||
            (isMac && isMouseEvent && nativeEvent.ctrlKey)
          ) {
            return;
          }
          // Exclude document targets
          if (!targetIsDocument(_pressTarget)) {
            state.responderRegionOnActivation = calculateResponderRegion(
              context,
              _pressTarget,
              props
            );
          }
          state.responderRegionOnDeactivation = null;
          state.isPressWithinResponderRegion = true;
          dispatchPressStartEvents(event, context, props, state);
          addRootEventTypes(context, state);
        } else {
          // Prevent spacebar press from scrolling the window
          if (isValidKeyboardEvent(nativeEvent) && nativeEvent.key === " ") {
            nativeEvent.preventDefault();
          }
        }
        break;
      }

      case "contextmenu": {
        var _preventContextMenu = props.preventContextMenu;

        if (_preventContextMenu !== undefined && context.isRespondingToHook()) {
          {
            warning$1(
              false,
              '"preventContextMenu" prop cannot be passed to Press event hooks. This will result in a no-op.'
            );
          }
        } else if (_preventContextMenu === true) {
          // Skip dispatching of onContextMenu below
          nativeEvent.preventDefault();
        }

        if (isPressed) {
          var _preventDefault = props.preventDefault;

          if (_preventDefault !== undefined && context.isRespondingToHook()) {
            {
              warning$1(
                false,
                '"preventDefault" prop cannot be passed to Press event hooks. This will result in a no-op.'
              );
            }
          } else if (
            _preventDefault !== false &&
            !nativeEvent.defaultPrevented
          ) {
            // Skip dispatching of onContextMenu below
            nativeEvent.preventDefault();
            return;
          }
          dispatchCancel(event, context, props, state);
        }

        if (props.onContextMenu) {
          dispatchEvent(
            event,
            context,
            state,
            "contextmenu",
            props.onContextMenu,
            DiscreteEvent
          );
        }
        // Click won't occur, so we need to remove root events
        removeRootEventTypes(context, state);
        break;
      }

      case "click": {
        if (state.shouldPreventClick) {
          nativeEvent.preventDefault();
        }
        break;
      }
    }
  },
  onRootEvent: function(event, context, props, state) {
    var pointerId = event.pointerId,
      pointerType = event.pointerType,
      target = event.target,
      type = event.type;

    var nativeEvent = event.nativeEvent;
    var isPressed = state.isPressed;
    var activePointerId = state.activePointerId;
    var previousPointerType = state.pointerType;

    handleStopPropagation(props, context, nativeEvent);
    switch (type) {
      // MOVE
      case "pointermove":
      case "mousemove":
      case "touchmove": {
        var _touchEvent2 = void 0;
        // Ignore emulated events (pointermove will dispatch touch and mouse events)
        // Ignore pointermove events during a keyboard press.
        if (previousPointerType !== pointerType) {
          return;
        }
        if (type === "pointermove" && activePointerId !== pointerId) {
          return;
        } else if (type === "touchmove") {
          _touchEvent2 = getTouchById(nativeEvent, activePointerId);
          if (_touchEvent2 === null) {
            return;
          }
          state.touchEvent = _touchEvent2;
        }
        var _pressTarget2 = state.pressTarget;

        if (
          _pressTarget2 !== null &&
          !targetIsDocument(_pressTarget2) &&
          (pointerType !== "mouse" ||
            !context.isTargetWithinNode(target, _pressTarget2))
        ) {
          // Calculate the responder region we use for deactivation, as the
          // element dimensions may have changed since activation.
          updateIsPressWithinResponderRegion(
            _touchEvent2 || nativeEvent,
            context,
            props,
            state
          );
        }

        if (state.isPressWithinResponderRegion) {
          if (isPressed) {
            if (props.onPressMove) {
              dispatchEvent(
                event,
                context,
                state,
                "pressmove",
                props.onPressMove,
                UserBlockingEvent
              );
            }
            if (
              state.activationPosition != null &&
              state.longPressTimeout != null
            ) {
              var deltaX = state.activationPosition.x - nativeEvent.clientX;
              var deltaY = state.activationPosition.y - nativeEvent.clientY;
              if (
                Math.hypot(deltaX, deltaY) > 10 &&
                state.longPressTimeout != null
              ) {
                context.clearTimeout(state.longPressTimeout);
              }
            }
          } else {
            dispatchPressStartEvents(event, context, props, state);
          }
        } else {
          dispatchPressEndEvents(event, context, props, state);
        }
        break;
      }

      // END
      case "pointerup":
      case "keyup":
      case "mouseup":
      case "touchend": {
        if (isPressed) {
          var _button = nativeEvent.button;
          var isKeyboardEvent = false;
          var _touchEvent3 = void 0;
          if (type === "pointerup" && activePointerId !== pointerId) {
            return;
          } else if (type === "touchend") {
            _touchEvent3 = getTouchById(nativeEvent, activePointerId);
            if (_touchEvent3 === null) {
              return;
            }
            state.touchEvent = _touchEvent3;
            target = getTouchTarget(context, _touchEvent3);
          } else if (type === "keyup") {
            // Ignore unrelated keyboard events
            if (!isValidKeyboardEvent(nativeEvent)) {
              return;
            }
            isKeyboardEvent = true;
            removeRootEventTypes(context, state);
          } else if (_button === 1) {
            // Remove the root events here as no 'click' event is dispatched when this 'button' is pressed.
            removeRootEventTypes(context, state);
          }

          // Determine whether to call preventDefault on subsequent native events.
          state.shouldPreventClick = false;
          if (
            context.isTargetWithinEventComponent(target) &&
            context.isTargetWithinHostComponent(target, "a", true)
          ) {
            var _ref3 = nativeEvent,
              _altKey = _ref3.altKey,
              _ctrlKey = _ref3.ctrlKey,
              _metaKey = _ref3.metaKey,
              _shiftKey = _ref3.shiftKey;
            // Check "open in new window/tab" and "open context menu" key modifiers

            var _preventDefault2 = props.preventDefault;

            if (
              _preventDefault2 !== undefined &&
              context.isRespondingToHook()
            ) {
              {
                warning$1(
                  false,
                  '"preventDefault" prop cannot be passed to Press event hooks. This will result in a no-op.'
                );
              }
            } else if (
              _preventDefault2 !== false &&
              !_shiftKey &&
              !_metaKey &&
              !_ctrlKey &&
              !_altKey
            ) {
              state.shouldPreventClick = true;
            }
          }

          var wasLongPressed = state.isLongPressed;
          var _pressTarget3 = state.pressTarget;
          dispatchPressEndEvents(event, context, props, state);

          if (_pressTarget3 !== null && props.onPress) {
            if (
              !isKeyboardEvent &&
              _pressTarget3 !== null &&
              !targetIsDocument(_pressTarget3) &&
              (pointerType !== "mouse" ||
                !context.isTargetWithinNode(target, _pressTarget3))
            ) {
              // If the event target isn't within the press target, check if we're still
              // within the responder region. The region may have changed if the
              // element's layout was modified after activation.
              updateIsPressWithinResponderRegion(
                _touchEvent3 || nativeEvent,
                context,
                props,
                state
              );
            }
            if (state.isPressWithinResponderRegion && _button !== 1) {
              if (
                !(
                  wasLongPressed &&
                  props.onLongPressShouldCancelPress &&
                  props.onLongPressShouldCancelPress()
                )
              ) {
                dispatchEvent(
                  event,
                  context,
                  state,
                  "press",
                  props.onPress,
                  DiscreteEvent
                );
              }
            }
          }
          state.touchEvent = null;
        } else if (type === "mouseup") {
          state.ignoreEmulatedMouseEvents = false;
        }
        break;
      }

      case "click": {
        // "keyup" occurs after "click"
        if (previousPointerType !== "keyboard") {
          removeRootEventTypes(context, state);
        }
        break;
      }

      // CANCEL
      case "scroll": {
        // We ignore incoming scroll events when using mouse events
        if (previousPointerType === "mouse") {
          return;
        }
        var _pressTarget4 = state.pressTarget;
        var scrollTarget = nativeEvent.target;
        var doc = context.getActiveDocument();
        // If the scroll target is the document or if the press target
        // is inside the scroll target, then this a scroll that should
        // trigger a cancel.
        if (
          _pressTarget4 !== null &&
          (scrollTarget === doc ||
            context.isTargetWithinNode(_pressTarget4, scrollTarget))
        ) {
          dispatchCancel(event, context, props, state);
        }
        break;
      }
      case "pointercancel":
      case "touchcancel":
      case "dragstart": {
        dispatchCancel(event, context, props, state);
      }
    }
  },
  onUnmount: function(context, props, state) {
    unmountResponder(context, props, state);
  },
  onOwnershipChange: function(context, props, state) {
    unmountResponder(context, props, state);
  }
};

var Press = React.unstable_createEvent(PressResponder);

function usePress(props) {
  React.unstable_useEvent(Press, props);
}

var Press$1 = (Object.freeze || Object)({
  Press: Press,
  usePress: usePress
});

var press = Press$1;

module.exports = press;

  })();
}
