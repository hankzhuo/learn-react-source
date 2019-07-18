/** @license React vundefined
 * react-events-drag.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global.ReactEventsDrag = factory(global.React));
}(this, (function (React) { 'use strict';

var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var _assign = ReactInternals.assign;

var DiscreteEvent = 0;
var UserBlockingEvent = 1;

var targetEventTypes = ['pointerdown'];
var rootEventTypes = ['pointerup', 'pointercancel', 'pointermove_active'];

// In the case we don't have PointerEvents (Safari), we listen to touch events
// too
if (typeof window !== 'undefined' && window.PointerEvent === undefined) {
  targetEventTypes.push('touchstart', 'mousedown');
  rootEventTypes.push('mouseup', 'mousemove', 'touchend', 'touchcancel', 'touchmove_active');
}

function createDragEvent(context, type, target, eventData) {
  return _assign({
    target: target,
    type: type,
    timeStamp: context.getTimeStamp()
  }, eventData);
}

function dispatchDragEvent(context, name, listener, state, eventPriority, eventData) {
  var target = state.dragTarget;
  var syntheticEvent = createDragEvent(context, name, target, eventData);
  context.dispatchEvent(syntheticEvent, listener, eventPriority);
}

var DragResponder = {
  displayName: 'Drag',
  targetEventTypes: targetEventTypes,
  getInitialState: function () {
    return {
      dragTarget: null,
      isPointerDown: false,
      isDragging: false,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0
    };
  },
  onEvent: function (event, context, props, state) {
    var target = event.target,
        type = event.type,
        nativeEvent = event.nativeEvent;


    switch (type) {
      case 'touchstart':
      case 'mousedown':
      case 'pointerdown':
        {
          if (!state.isDragging) {
            if (props.onShouldClaimOwnership) {
              context.releaseOwnership();
            }
            var obj = type === 'touchstart' ? nativeEvent.changedTouches[0] : nativeEvent;
            var _x = state.startX = obj.screenX;
            var _y = state.startY = obj.screenY;
            state.x = _x;
            state.y = _y;
            state.dragTarget = target;
            state.isPointerDown = true;

            if (props.onDragStart) {
              dispatchDragEvent(context, 'dragstart', props.onDragStart, state, DiscreteEvent);
            }

            context.addRootEventTypes(rootEventTypes);
          }
          break;
        }
    }
  },
  onRootEvent: function (event, context, props, state) {
    var type = event.type,
        nativeEvent = event.nativeEvent;


    switch (type) {
      case 'touchmove':
      case 'mousemove':
      case 'pointermove':
        {
          if (event.passive) {
            return;
          }
          if (state.isPointerDown) {
            var obj = type === 'touchmove' ? nativeEvent.changedTouches[0] : nativeEvent;
            var _x2 = obj.screenX;
            var _y2 = obj.screenY;
            state.x = _x2;
            state.y = _y2;
            if (_x2 === state.startX && _y2 === state.startY) {
              return;
            }
            if (!state.isDragging) {
              var shouldEnableDragging = true;

              if (props.onShouldClaimOwnership && props.onShouldClaimOwnership()) {
                shouldEnableDragging = context.requestGlobalOwnership();
              }
              if (shouldEnableDragging) {
                state.isDragging = true;
                if (props.onDragChange) {
                  var dragChangeEventListener = function () {
                    props.onDragChange(true);
                  };
                  dispatchDragEvent(context, 'dragchange', dragChangeEventListener, state, UserBlockingEvent);
                }
              } else {
                state.dragTarget = null;
                state.isPointerDown = false;
                context.removeRootEventTypes(rootEventTypes);
              }
            } else {
              if (props.onDragMove) {
                var eventData = {
                  diffX: _x2 - state.startX,
                  diffY: _y2 - state.startY
                };
                dispatchDragEvent(context, 'dragmove', props.onDragMove, state, UserBlockingEvent, eventData);
              }
              nativeEvent.preventDefault();
            }
          }
          break;
        }
      case 'pointercancel':
      case 'touchcancel':
      case 'touchend':
      case 'mouseup':
      case 'pointerup':
        {
          if (state.isDragging) {
            if (props.onShouldClaimOwnership) {
              context.releaseOwnership();
            }
            if (props.onDragEnd) {
              dispatchDragEvent(context, 'dragend', props.onDragEnd, state, DiscreteEvent);
            }
            if (props.onDragChange) {
              var _dragChangeEventListener = function () {
                props.onDragChange(false);
              };
              dispatchDragEvent(context, 'dragchange', _dragChangeEventListener, state, UserBlockingEvent);
            }
            state.isDragging = false;
          }
          if (state.isPointerDown) {
            state.dragTarget = null;
            state.isPointerDown = false;
            context.removeRootEventTypes(rootEventTypes);
          }
          break;
        }
    }
  }
};

var Drag = React.unstable_createEvent(DragResponder);

function useDrag(props) {
  React.unstable_useEvent(Drag, props);
}

var Drag$1 = Object.freeze({
	Drag: Drag,
	useDrag: useDrag
});

var drag = Drag$1;

return drag;

})));
