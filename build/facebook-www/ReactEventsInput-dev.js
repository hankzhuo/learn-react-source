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

var targetEventTypes = ["input", "change", "beforeinput", "click"];

var supportedInputTypes = new Set([
  "color",
  "date",
  "datetime",
  "datetime-local",
  "email",
  "month",
  "number",
  "password",
  "range",
  "search",
  "tel",
  "text",
  "time",
  "url",
  "week"
]);

function createInputEvent(event, context, type, target) {
  var _nativeEvent = event.nativeEvent,
    data = _nativeEvent.data,
    dataTransfer = _nativeEvent.dataTransfer,
    inputType = _nativeEvent.inputType,
    isComposing = _nativeEvent.isComposing;

  return {
    data: data,
    dataTransfer: dataTransfer,
    inputType: inputType,
    isComposing: isComposing,
    target: target,
    timeStamp: context.getTimeStamp(),
    type: type
  };
}

function dispatchInputEvent(event, context, type, listener, target) {
  var syntheticEvent = createInputEvent(event, context, type, target);
  context.dispatchEvent(syntheticEvent, listener, DiscreteEvent);
}

function getNodeName(elem) {
  return elem.nodeName && elem.nodeName.toLowerCase();
}

function isTextInputElement(elem) {
  var nodeName = getNodeName(elem);
  var type = elem.type;
  return (
    nodeName === "textarea" ||
    (nodeName === "input" && (type == null || supportedInputTypes.has(type)))
  );
}

function isCheckable(elem) {
  var nodeName = getNodeName(elem);
  var type = elem.type;
  return nodeName === "input" && (type === "checkbox" || type === "radio");
}

function shouldUseChangeEvent(elem) {
  var nodeName = getNodeName(elem);
  return (
    nodeName === "select" || (nodeName === "input" && elem.type === "file")
  );
}

function dispatchChangeEvent(event, context, type, changeListener, target) {
  var value = getValueFromNode(target);
  var listener = function() {
    changeListener(value);
  };
  dispatchInputEvent(event, context, type, listener, target);
}

function dispatchBothChangeEvents(event, context, props, target) {
  var onChange = props.onChange;
  context.enqueueStateRestore(target);
  if (onChange) {
    dispatchInputEvent(event, context, "change", onChange, target);
  }
  var onValueChange = props.onValueChange;
  if (onValueChange) {
    dispatchChangeEvent(event, context, "valuechange", onValueChange, target);
  }
}

function updateValueIfChanged(elem) {
  // React's internal value tracker
  var valueTracker = elem._valueTracker;
  if (valueTracker == null) {
    return true;
  }
  var prevValue = valueTracker.getValue();
  var nextValue = getValueFromNode(elem);

  if (prevValue !== nextValue) {
    valueTracker.setValue(nextValue);
    return true;
  }
  return false;
}

function getValueFromNode(node) {
  var value = "";
  if (!node) {
    return value;
  }

  if (isCheckable(node)) {
    value = node.checked ? "true" : "false";
  } else {
    value = node.value;
  }

  return value;
}

var InputResponder = {
  displayName: "Input",
  targetEventTypes: targetEventTypes,
  onEvent: function(event, context, props) {
    var responderTarget = event.responderTarget,
      type = event.type,
      target = event.target;

    if (props.disabled) {
      return;
    }
    if (target !== responderTarget || responderTarget === null) {
      return;
    }
    switch (type) {
      default: {
        if (shouldUseChangeEvent(target) && type === "change") {
          dispatchBothChangeEvents(event, context, props, responderTarget);
        } else if (
          isTextInputElement(target) &&
          (type === "input" || type === "change") &&
          updateValueIfChanged(target)
        ) {
          dispatchBothChangeEvents(event, context, props, responderTarget);
        } else if (
          isCheckable(target) &&
          type === "click" &&
          updateValueIfChanged(target)
        ) {
          dispatchBothChangeEvents(event, context, props, responderTarget);
        }
        break;
      }
    }
  }
};

var Input = React.unstable_createEvent(InputResponder);

function useInput(props) {
  React.unstable_useEvent(Input, props);
}

var Input$1 = (Object.freeze || Object)({
  Input: Input,
  useInput: useInput
});

var input = Input$1;

module.exports = input;

  })();
}
