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

var targetEventTypes = ["keydown_active"];
var rootEventTypes = ["focus"];

function focusElement(element) {
  if (element != null) {
    try {
      element.focus();
    } catch (err) {}
  }
}

function getFirstFocusableElement(context, state) {
  var elements = context.getFocusableElementsInScope();
  if (elements.length > 0) {
    return elements[0];
  }
}

var FocusScopeResponder = {
  displayName: "FocusScope",
  targetEventTypes: targetEventTypes,
  rootEventTypes: rootEventTypes,
  getInitialState: function() {
    return {
      nodeToRestore: null,
      currentFocusedNode: null
    };
  },
  onEvent: function(event, context, props, state) {
    var type = event.type,
      nativeEvent = event.nativeEvent;

    if (type === "keydown" && nativeEvent.key === "Tab") {
      var focusedElement = context.getActiveDocument().activeElement;
      if (
        focusedElement !== null &&
        context.isTargetWithinEventComponent(focusedElement)
      ) {
        var _ref = nativeEvent,
          altkey = _ref.altkey,
          ctrlKey = _ref.ctrlKey,
          metaKey = _ref.metaKey,
          shiftKey = _ref.shiftKey;
        // Skip if any of these keys are being pressed

        if (altkey || ctrlKey || metaKey) {
          return;
        }
        var elements = context.getFocusableElementsInScope();
        var position = elements.indexOf(focusedElement);
        var lastPosition = elements.length - 1;
        var nextElement = null;

        if (shiftKey) {
          if (position === 0) {
            if (props.contain) {
              nextElement = elements[lastPosition];
            } else {
              // Out of bounds
              context.continueLocalPropagation();
              return;
            }
          } else {
            nextElement = elements[position - 1];
          }
        } else {
          if (position === lastPosition) {
            if (props.contain) {
              nextElement = elements[0];
            } else {
              // Out of bounds
              context.continueLocalPropagation();
              return;
            }
          } else {
            nextElement = elements[position + 1];
          }
        }
        if (nextElement !== null) {
          focusElement(nextElement);
          state.currentFocusedNode = nextElement;
          nativeEvent.preventDefault();
        }
      }
    }
  },
  onRootEvent: function(event, context, props, state) {
    var target = event.target;

    // Handle global focus containment

    if (props.contain) {
      if (!context.isTargetWithinEventComponent(target)) {
        var _currentFocusedNode = state.currentFocusedNode;
        if (_currentFocusedNode !== null) {
          focusElement(_currentFocusedNode);
        } else if (props.autoFocus) {
          var firstElement = getFirstFocusableElement(context, state);
          focusElement(firstElement);
        }
      }
    }
  },
  onMount: function(context, props, state) {
    if (props.restoreFocus) {
      state.nodeToRestore = context.getActiveDocument().activeElement;
    }
    if (props.autoFocus) {
      var firstElement = getFirstFocusableElement(context, state);
      focusElement(firstElement);
    }
  },
  onUnmount: function(context, props, state) {
    if (props.restoreFocus && state.nodeToRestore !== null) {
      focusElement(state.nodeToRestore);
    }
  }
};

var FocusScope = React.unstable_createEvent(FocusScopeResponder);

var FocusScope$1 = (Object.freeze || Object)({
  default: FocusScope
});

var FocusScope$2 = (FocusScope$1 && FocusScope) || FocusScope$1;

var focusScope = FocusScope$2.default || FocusScope$2;

module.exports = focusScope;

  })();
}
