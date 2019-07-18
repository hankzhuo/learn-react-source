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
var React = require("react");
require("warning");
var ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher") ||
  (ReactSharedInternals.ReactCurrentDispatcher = { current: null });
ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig") ||
  (ReactSharedInternals.ReactCurrentBatchConfig = { suspense: null });
var isMac =
    "undefined" !== typeof window && null != window.navigator
      ? /^Mac/.test(window.navigator.platform)
      : !1,
  DEFAULT_PRESS_RETENTION_OFFSET = { bottom: 20, top: 20, left: 20, right: 20 },
  targetEventTypes = [
    "keydown_active",
    "contextmenu_active",
    "pointerdown_active",
    "click_active"
  ],
  rootEventTypes = "click keyup pointerup pointermove scroll pointercancel mouseup_active touchend".split(
    " "
  );
"undefined" !== typeof window &&
  void 0 === window.PointerEvent &&
  (targetEventTypes.push("touchstart", "mousedown"),
  rootEventTypes.push("mousemove", "touchmove", "touchcancel", "dragstart"));
function dispatchEvent(event, context, state, name, listener, eventPriority) {
  var target = state.pressTarget,
    pointerType = state.pointerType,
    touchEvent = state.touchEvent;
  state =
    (null != event && !0 === event.nativeEvent.defaultPrevented) ||
    ("press" === name && state.shouldPreventClick);
  var timeStamp = context.getTimeStamp(),
    button = "primary",
    clientX = null,
    clientY = null,
    pageX = null,
    pageY = null,
    screenX = null,
    screenY = null,
    altKey = !1,
    ctrlKey = !1,
    metaKey = !1,
    shiftKey = !1;
  if (event) {
    event = event.nativeEvent;
    altKey = event.altKey;
    ctrlKey = event.ctrlKey;
    metaKey = event.metaKey;
    shiftKey = event.shiftKey;
    if ((touchEvent = touchEvent || event))
      (clientX = touchEvent.clientX),
        (clientY = touchEvent.clientY),
        (pageX = touchEvent.pageX),
        (pageY = touchEvent.pageY),
        (screenX = touchEvent.screenX),
        (screenY = touchEvent.screenY);
    1 === event.button && (button = "auxillary");
  }
  context.dispatchEvent(
    {
      button: button,
      defaultPrevented: state,
      target: target,
      type: name,
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
    },
    listener,
    eventPriority
  );
}
function dispatchPressChangeEvent(event, context, props, state) {
  var bool = state.isActivePressed;
  dispatchEvent(
    event,
    context,
    state,
    "presschange",
    function() {
      props.onPressChange(bool);
    },
    0
  );
}
function dispatchLongPressChangeEvent(event, context, props, state) {
  var bool = state.isLongPressed;
  dispatchEvent(
    event,
    context,
    state,
    "longpresschange",
    function() {
      props.onLongPressChange(bool);
    },
    0
  );
}
function activate(event, context, props, state) {
  var nativeEvent = event.nativeEvent,
    _ref = state.touchEvent || nativeEvent;
  nativeEvent = _ref.clientX;
  _ref = _ref.clientY;
  var wasActivePressed = state.isActivePressed;
  state.isActivePressed = !0;
  void 0 !== nativeEvent &&
    void 0 !== _ref &&
    (state.activationPosition = { x: nativeEvent, y: _ref });
  props.onPressStart &&
    dispatchEvent(event, context, state, "pressstart", props.onPressStart, 0);
  !wasActivePressed &&
    props.onPressChange &&
    dispatchPressChangeEvent(event, context, props, state);
}
function deactivate(event, context, props, state) {
  var wasLongPressed = state.isLongPressed;
  state.isActivePressed = !1;
  state.isLongPressed = !1;
  props.onPressEnd &&
    dispatchEvent(event, context, state, "pressend", props.onPressEnd, 0);
  props.onPressChange && dispatchPressChangeEvent(event, context, props, state);
  wasLongPressed &&
    props.onLongPressChange &&
    dispatchLongPressChangeEvent(event, context, props, state);
}
function dispatchPressStartEvents(event, context, props, state) {
  function dispatch() {
    state.isActivePressStart = !0;
    activate(event, context, props, state);
    if (
      (props.onLongPress || props.onLongPressChange) &&
      !state.isLongPressed
    ) {
      var _delayLongPress = calculateDelayMS(props.delayLongPress, 10, 500);
      state.longPressTimeout = context.setTimeout(function() {
        state.isLongPressed = !0;
        state.longPressTimeout = null;
        props.onLongPress &&
          dispatchEvent(
            event,
            context,
            state,
            "longpress",
            props.onLongPress,
            0
          );
        props.onLongPressChange &&
          dispatchLongPressChangeEvent(event, context, props, state);
      }, _delayLongPress);
    }
  }
  state.isPressed = !0;
  null !== state.pressEndTimeout &&
    (context.clearTimeout(state.pressEndTimeout),
    (state.pressEndTimeout = null));
  if (!state.isActivePressStart) {
    var _delayPressStart = calculateDelayMS(props.delayPressStart, 0, 0);
    0 < _delayPressStart
      ? (state.pressStartTimeout = context.setTimeout(function() {
          state.pressStartTimeout = null;
          dispatch();
        }, _delayPressStart))
      : dispatch();
  }
}
function dispatchPressEndEvents(event, context, props, state) {
  var wasActivePressStart = state.isActivePressStart,
    activationWasForced = !1;
  state.isActivePressStart = !1;
  state.isPressed = !1;
  null !== state.longPressTimeout &&
    (context.clearTimeout(state.longPressTimeout),
    (state.longPressTimeout = null));
  wasActivePressStart ||
    null === state.pressStartTimeout ||
    (context.clearTimeout(state.pressStartTimeout),
    (state.pressStartTimeout = null),
    state.isPressWithinResponderRegion &&
      null != event &&
      (activate(event, context, props, state), (activationWasForced = !0)));
  state.isActivePressed &&
    ((wasActivePressStart = calculateDelayMS(
      props.delayPressEnd,
      activationWasForced ? 10 : 0,
      0
    )),
    0 < wasActivePressStart
      ? (state.pressEndTimeout = context.setTimeout(function() {
          state.pressEndTimeout = null;
          deactivate(event, context, props, state);
        }, wasActivePressStart))
      : deactivate(event, context, props, state));
  state.responderRegionOnDeactivation = null;
}
function dispatchCancel(event, context, props, state) {
  state.touchEvent = null;
  null !== state.pressStartTimeout &&
    (context.clearTimeout(state.pressStartTimeout),
    (state.pressStartTimeout = null));
  state.isPressed &&
    ((state.ignoreEmulatedMouseEvents = !1),
    dispatchPressEndEvents(event, context, props, state));
  removeRootEventTypes(context, state);
}
function isValidKeyboardEvent(nativeEvent) {
  var key = nativeEvent.key,
    target = nativeEvent.target;
  nativeEvent = target.tagName;
  target = target.isContentEditable;
  return (
    ("Enter" === key || " " === key || "Spacebar" === key) &&
    "INPUT" !== nativeEvent &&
    "TEXTAREA" !== nativeEvent &&
    !0 !== target
  );
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
function calculateResponderRegion(context, target, props) {
  context = context.objectAssign(
    {},
    DEFAULT_PRESS_RETENTION_OFFSET,
    props.pressRetentionOffset
  );
  var _target$getBoundingCl = target.getBoundingClientRect();
  target = _target$getBoundingCl.left;
  props = _target$getBoundingCl.right;
  var bottom = _target$getBoundingCl.bottom;
  _target$getBoundingCl = _target$getBoundingCl.top;
  context &&
    (null != context.bottom && (bottom += context.bottom),
    null != context.left && (target -= context.left),
    null != context.right && (props += context.right),
    null != context.top && (_target$getBoundingCl -= context.top));
  return {
    bottom: bottom,
    top: _target$getBoundingCl,
    left: target,
    right: props
  };
}
function removeRootEventTypes(context, state) {
  state.addedRootEvents &&
    ((state.addedRootEvents = !1),
    context.removeRootEventTypes(rootEventTypes));
}
function getTouchById(nativeEvent, pointerId) {
  nativeEvent = nativeEvent.changedTouches;
  for (var i = 0; i < nativeEvent.length; i++) {
    var touch = nativeEvent[i];
    if (touch.identifier === pointerId) return touch;
  }
  return null;
}
function updateIsPressWithinResponderRegion(
  nativeEventOrTouchEvent,
  context,
  props,
  state
) {
  null == state.responderRegionOnDeactivation &&
    (state.responderRegionOnDeactivation = calculateResponderRegion(
      context,
      state.pressTarget,
      props
    ));
  var responderRegionOnActivation = state.responderRegionOnActivation,
    responderRegionOnDeactivation = state.responderRegionOnDeactivation,
    right = (props = context = void 0),
    bottom = void 0;
  null != responderRegionOnActivation &&
    ((context = responderRegionOnActivation.left),
    (props = responderRegionOnActivation.top),
    (right = responderRegionOnActivation.right),
    (bottom = responderRegionOnActivation.bottom),
    null != responderRegionOnDeactivation &&
      ((context = Math.min(context, responderRegionOnDeactivation.left)),
      (props = Math.min(props, responderRegionOnDeactivation.top)),
      (right = Math.max(right, responderRegionOnDeactivation.right)),
      (bottom = Math.max(bottom, responderRegionOnDeactivation.bottom))));
  responderRegionOnActivation = nativeEventOrTouchEvent.clientX;
  nativeEventOrTouchEvent = nativeEventOrTouchEvent.clientY;
  state.isPressWithinResponderRegion =
    null != context &&
    null != right &&
    null != props &&
    null != bottom &&
    null !== responderRegionOnActivation &&
    null !== nativeEventOrTouchEvent &&
    responderRegionOnActivation >= context &&
    responderRegionOnActivation <= right &&
    nativeEventOrTouchEvent >= props &&
    nativeEventOrTouchEvent <= bottom;
}
function handleStopPropagation(props, context, nativeEvent) {
  props = props.stopPropagation;
  (void 0 !== props && context.isRespondingToHook()) ||
    (!0 === props && nativeEvent.stopPropagation());
}
var Press = React.unstable_createEvent({
  displayName: "Press",
  targetEventTypes: targetEventTypes,
  getInitialState: function() {
    return {
      activationPosition: null,
      addedRootEvents: !1,
      isActivePressed: !1,
      isActivePressStart: !1,
      isLongPressed: !1,
      isPressed: !1,
      isPressWithinResponderRegion: !0,
      longPressTimeout: null,
      pointerType: "",
      pressEndTimeout: null,
      pressStartTimeout: null,
      pressTarget: null,
      responderRegionOnActivation: null,
      responderRegionOnDeactivation: null,
      ignoreEmulatedMouseEvents: !1,
      activePointerId: null,
      shouldPreventClick: !1,
      touchEvent: null
    };
  },
  onEvent: function(event, context, props, state) {
    var pointerId = event.pointerId,
      pointerType = event.pointerType,
      type = event.type;
    if (props.disabled)
      removeRootEventTypes(context, state),
        dispatchPressEndEvents(event, context, props, state),
        (state.ignoreEmulatedMouseEvents = !1);
    else {
      var nativeEvent = event.nativeEvent,
        isPressed = state.isPressed;
      handleStopPropagation(props, context, nativeEvent);
      switch (type) {
        case "pointerdown":
        case "keydown":
        case "mousedown":
        case "touchstart":
          if (isPressed)
            isValidKeyboardEvent(nativeEvent) &&
              " " === nativeEvent.key &&
              nativeEvent.preventDefault();
          else {
            var isTouchEvent = "touchstart" === type,
              isPointerEvent = "pointerdown" === type,
              isKeyboardEvent = "keyboard" === pointerType;
            isPressed = "mouse" === pointerType;
            if (isPointerEvent || isTouchEvent)
              state.ignoreEmulatedMouseEvents = !0;
            else if ("mousedown" === type && state.ignoreEmulatedMouseEvents)
              break;
            else if (isKeyboardEvent && !isValidKeyboardEvent(nativeEvent))
              break;
            state.pointerType = pointerType;
            pointerType = state.pressTarget = event.responderTarget;
            if (isPointerEvent) state.activePointerId = pointerId;
            else if (isTouchEvent) {
              pointerId = nativeEvent.targetTouches;
              pointerId = 0 < pointerId.length ? pointerId[0] : null;
              if (null === pointerId) break;
              state.touchEvent = pointerId;
              state.activePointerId = pointerId.identifier;
            }
            1 < nativeEvent.button ||
              (isMac && isPressed && nativeEvent.ctrlKey) ||
              (null !== pointerType &&
                9 !== pointerType.nodeType &&
                (state.responderRegionOnActivation = calculateResponderRegion(
                  context,
                  pointerType,
                  props
                )),
              (state.responderRegionOnDeactivation = null),
              (state.isPressWithinResponderRegion = !0),
              dispatchPressStartEvents(event, context, props, state),
              state.addedRootEvents ||
                ((state.addedRootEvents = !0),
                context.addRootEventTypes(rootEventTypes)));
          }
          break;
        case "contextmenu":
          pointerId = props.preventContextMenu;
          (void 0 !== pointerId && context.isRespondingToHook()) ||
            (!0 === pointerId && nativeEvent.preventDefault());
          if (isPressed) {
            isPressed = props.preventDefault;
            if (
              !(
                (void 0 !== isPressed && context.isRespondingToHook()) ||
                !1 === isPressed ||
                nativeEvent.defaultPrevented
              )
            ) {
              nativeEvent.preventDefault();
              break;
            }
            dispatchCancel(event, context, props, state);
          }
          props.onContextMenu &&
            dispatchEvent(
              event,
              context,
              state,
              "contextmenu",
              props.onContextMenu,
              0
            );
          removeRootEventTypes(context, state);
          break;
        case "click":
          state.shouldPreventClick && nativeEvent.preventDefault();
      }
    }
  },
  onRootEvent: function(event, context, props, state) {
    var pointerId = event.pointerId,
      pointerType = event.pointerType,
      target = event.target,
      type = event.type,
      nativeEvent = event.nativeEvent,
      isPressed = state.isPressed,
      activePointerId = state.activePointerId,
      previousPointerType = state.pointerType;
    handleStopPropagation(props, context, nativeEvent);
    switch (type) {
      case "pointermove":
      case "mousemove":
      case "touchmove":
        var _touchEvent2 = void 0;
        if (previousPointerType !== pointerType) break;
        if ("pointermove" === type && activePointerId !== pointerId) break;
        else if ("touchmove" === type) {
          _touchEvent2 = getTouchById(nativeEvent, activePointerId);
          if (null === _touchEvent2) break;
          state.touchEvent = _touchEvent2;
        }
        previousPointerType = state.pressTarget;
        null === previousPointerType ||
          null === previousPointerType ||
          9 === previousPointerType.nodeType ||
          ("mouse" === pointerType &&
            context.isTargetWithinNode(target, previousPointerType)) ||
          updateIsPressWithinResponderRegion(
            _touchEvent2 || nativeEvent,
            context,
            props,
            state
          );
        state.isPressWithinResponderRegion
          ? isPressed
            ? (props.onPressMove &&
                dispatchEvent(
                  event,
                  context,
                  state,
                  "pressmove",
                  props.onPressMove,
                  1
                ),
              null != state.activationPosition &&
                null != state.longPressTimeout &&
                10 <
                  Math.hypot(
                    state.activationPosition.x - nativeEvent.clientX,
                    state.activationPosition.y - nativeEvent.clientY
                  ) &&
                null != state.longPressTimeout &&
                context.clearTimeout(state.longPressTimeout))
            : dispatchPressStartEvents(event, context, props, state)
          : dispatchPressEndEvents(event, context, props, state);
        break;
      case "pointerup":
      case "keyup":
      case "mouseup":
      case "touchend":
        if (isPressed) {
          if (
            ((isPressed = nativeEvent.button),
            (_touchEvent2 = !1),
            (previousPointerType = void 0),
            "pointerup" !== type || activePointerId === pointerId)
          ) {
            if ("touchend" === type) {
              previousPointerType = getTouchById(nativeEvent, activePointerId);
              if (null === previousPointerType) break;
              target = state.touchEvent = previousPointerType;
              target = context
                .getActiveDocument()
                .elementFromPoint(target.clientX, target.clientY);
            } else if ("keyup" === type) {
              if (!isValidKeyboardEvent(nativeEvent)) break;
              _touchEvent2 = !0;
              removeRootEventTypes(context, state);
            } else 1 === isPressed && removeRootEventTypes(context, state);
            state.shouldPreventClick = !1;
            if (
              context.isTargetWithinEventComponent(target) &&
              context.isTargetWithinHostComponent(target, "a", !0)
            ) {
              pointerId = nativeEvent.altKey;
              type = nativeEvent.ctrlKey;
              activePointerId = nativeEvent.metaKey;
              var _shiftKey = nativeEvent.shiftKey,
                _preventDefault2 = props.preventDefault;
              (void 0 !== _preventDefault2 && context.isRespondingToHook()) ||
                !1 === _preventDefault2 ||
                _shiftKey ||
                activePointerId ||
                type ||
                pointerId ||
                (state.shouldPreventClick = !0);
            }
            pointerId = state.isLongPressed;
            type = state.pressTarget;
            dispatchPressEndEvents(event, context, props, state);
            null !== type &&
              props.onPress &&
              (_touchEvent2 ||
                null === type ||
                null === type ||
                9 === type.nodeType ||
                ("mouse" === pointerType &&
                  context.isTargetWithinNode(target, type)) ||
                updateIsPressWithinResponderRegion(
                  previousPointerType || nativeEvent,
                  context,
                  props,
                  state
                ),
              state.isPressWithinResponderRegion &&
                1 !== isPressed &&
                ((pointerId &&
                  props.onLongPressShouldCancelPress &&
                  props.onLongPressShouldCancelPress()) ||
                  dispatchEvent(
                    event,
                    context,
                    state,
                    "press",
                    props.onPress,
                    0
                  )));
            state.touchEvent = null;
          }
        } else "mouseup" === type && (state.ignoreEmulatedMouseEvents = !1);
        break;
      case "click":
        "keyboard" !== previousPointerType &&
          removeRootEventTypes(context, state);
        break;
      case "scroll":
        if ("mouse" === previousPointerType) break;
        pointerType = state.pressTarget;
        nativeEvent = nativeEvent.target;
        target = context.getActiveDocument();
        null === pointerType ||
          (nativeEvent !== target &&
            !context.isTargetWithinNode(pointerType, nativeEvent)) ||
          dispatchCancel(event, context, props, state);
        break;
      case "pointercancel":
      case "touchcancel":
      case "dragstart":
        dispatchCancel(event, context, props, state);
    }
  },
  onUnmount: function(context, props, state) {
    state.isPressed &&
      (removeRootEventTypes(context, state),
      dispatchPressEndEvents(null, context, props, state));
  },
  onOwnershipChange: function(context, props, state) {
    state.isPressed &&
      (removeRootEventTypes(context, state),
      dispatchPressEndEvents(null, context, props, state));
  }
});
module.exports = {
  Press: Press,
  usePress: function(props) {
    React.unstable_useEvent(Press, props);
  }
};
