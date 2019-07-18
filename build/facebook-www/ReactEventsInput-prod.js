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
  supportedInputTypes = new Set(
    "color date datetime datetime-local email month number password range search tel text time url week".split(
      " "
    )
  );
function dispatchInputEvent(event, context, type, listener, target) {
  event = event.nativeEvent;
  type = {
    data: event.data,
    dataTransfer: event.dataTransfer,
    inputType: event.inputType,
    isComposing: event.isComposing,
    target: target,
    timeStamp: context.getTimeStamp(),
    type: type
  };
  context.dispatchEvent(type, listener, 0);
}
function isCheckable(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  elem = elem.type;
  return "input" === nodeName && ("checkbox" === elem || "radio" === elem);
}
function dispatchChangeEvent(event, context, type, changeListener, target) {
  var value = getValueFromNode(target);
  dispatchInputEvent(
    event,
    context,
    type,
    function() {
      changeListener(value);
    },
    target
  );
}
function dispatchBothChangeEvents(event, context, props, target) {
  var onChange = props.onChange;
  context.enqueueStateRestore(target);
  onChange && dispatchInputEvent(event, context, "change", onChange, target);
  (props = props.onValueChange) &&
    dispatchChangeEvent(event, context, "valuechange", props, target);
}
function updateValueIfChanged(elem) {
  var valueTracker = elem._valueTracker;
  if (null == valueTracker) return !0;
  var prevValue = valueTracker.getValue();
  elem = getValueFromNode(elem);
  return prevValue !== elem ? (valueTracker.setValue(elem), !0) : !1;
}
function getValueFromNode(node) {
  var value = "";
  return node
    ? (value = isCheckable(node)
        ? node.checked
          ? "true"
          : "false"
        : node.value)
    : value;
}
var Input = React.unstable_createEvent({
  displayName: "Input",
  targetEventTypes: ["input", "change", "beforeinput", "click"],
  onEvent: function(event, context, props) {
    var responderTarget = event.responderTarget,
      type = event.type,
      target = event.target;
    if (
      !props.disabled &&
      target === responderTarget &&
      null !== responderTarget
    ) {
      var nodeName = target.nodeName && target.nodeName.toLowerCase();
      if (
        ("select" === nodeName ||
          ("input" === nodeName && "file" === target.type)) &&
        "change" === type
      )
        dispatchBothChangeEvents(event, context, props, responderTarget);
      else {
        nodeName = target.nodeName && target.nodeName.toLowerCase();
        var type$jscomp$0 = target.type;
        ("textarea" !== nodeName &&
          ("input" !== nodeName ||
            (null != type$jscomp$0 &&
              !supportedInputTypes.has(type$jscomp$0)))) ||
        ("input" !== type && "change" !== type) ||
        !updateValueIfChanged(target)
          ? isCheckable(target) &&
            "click" === type &&
            updateValueIfChanged(target) &&
            dispatchBothChangeEvents(event, context, props, responderTarget)
          : dispatchBothChangeEvents(event, context, props, responderTarget);
      }
    }
  }
});
module.exports = {
  Input: Input,
  useInput: function(props) {
    React.unstable_useEvent(Input, props);
  }
};
