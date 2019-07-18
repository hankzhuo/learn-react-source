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
function focusElement(element) {
  if (null != element)
    try {
      element.focus();
    } catch (err) {}
}
function getFirstFocusableElement(context) {
  context = context.getFocusableElementsInScope();
  if (0 < context.length) return context[0];
}
var FocusScope = require("react").unstable_createEvent({
    displayName: "FocusScope",
    targetEventTypes: ["keydown_active"],
    rootEventTypes: ["focus"],
    getInitialState: function() {
      return { nodeToRestore: null, currentFocusedNode: null };
    },
    onEvent: function(event, context, props, state) {
      var nativeEvent = event.nativeEvent;
      if ("keydown" === event.type && "Tab" === nativeEvent.key) {
        var focusedElement = context.getActiveDocument().activeElement;
        if (
          null !== focusedElement &&
          context.isTargetWithinEventComponent(focusedElement)
        ) {
          var ctrlKey = nativeEvent.ctrlKey,
            metaKey = nativeEvent.metaKey;
          event = nativeEvent.shiftKey;
          if (!(nativeEvent.altkey || ctrlKey || metaKey)) {
            ctrlKey = context.getFocusableElementsInScope();
            focusedElement = ctrlKey.indexOf(focusedElement);
            metaKey = ctrlKey.length - 1;
            if (event)
              if (0 === focusedElement)
                if (props.contain) context = ctrlKey[metaKey];
                else {
                  context.continueLocalPropagation();
                  return;
                }
              else context = ctrlKey[focusedElement - 1];
            else if (focusedElement === metaKey)
              if (props.contain) context = ctrlKey[0];
              else {
                context.continueLocalPropagation();
                return;
              }
            else context = ctrlKey[focusedElement + 1];
            null !== context &&
              (focusElement(context),
              (state.currentFocusedNode = context),
              nativeEvent.preventDefault());
          }
        }
      }
    },
    onRootEvent: function(event, context, props, state) {
      event = event.target;
      props.contain &&
        !context.isTargetWithinEventComponent(event) &&
        ((event = state.currentFocusedNode),
        null !== event
          ? focusElement(event)
          : props.autoFocus &&
            ((context = getFirstFocusableElement(context, state)),
            focusElement(context)));
    },
    onMount: function(context, props, state) {
      props.restoreFocus &&
        (state.nodeToRestore = context.getActiveDocument().activeElement);
      props.autoFocus &&
        ((context = getFirstFocusableElement(context, state)),
        focusElement(context));
    },
    onUnmount: function(context, props, state) {
      props.restoreFocus &&
        null !== state.nodeToRestore &&
        focusElement(state.nodeToRestore);
    }
  }),
  FocusScope$1 = { default: FocusScope },
  FocusScope$2 = (FocusScope$1 && FocusScope) || FocusScope$1;
module.exports = FocusScope$2.default || FocusScope$2;
