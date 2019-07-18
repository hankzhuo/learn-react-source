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
Object.defineProperty(exports, "__esModule", { value: !0 });
var _require = require("SchedulerFeatureFlags"),
  enableIsInputPending = _require.enableIsInputPending,
  enableSchedulerDebugging = _require.enableSchedulerDebugging,
  requestHostCallback = void 0,
  requestHostTimeout = void 0,
  cancelHostTimeout = void 0,
  shouldYieldToHost = void 0,
  requestPaint = void 0;
exports.unstable_now = void 0;
exports.unstable_forceFrameRate = void 0;
var localDate = Date,
  localSetTimeout = "function" === typeof setTimeout ? setTimeout : void 0,
  localClearTimeout =
    "function" === typeof clearTimeout ? clearTimeout : void 0,
  localRequestAnimationFrame =
    "function" === typeof requestAnimationFrame
      ? requestAnimationFrame
      : void 0,
  localCancelAnimationFrame =
    "function" === typeof cancelAnimationFrame ? cancelAnimationFrame : void 0,
  rAFID = void 0,
  rAFTimeoutID = void 0;
function requestAnimationFrameWithTimeout(callback) {
  rAFID = localRequestAnimationFrame(function(timestamp) {
    localClearTimeout(rAFTimeoutID);
    callback(timestamp);
  });
  rAFTimeoutID = localSetTimeout(function() {
    localCancelAnimationFrame(rAFID);
    callback(exports.unstable_now());
  }, 100);
}
if ("object" === typeof performance && "function" === typeof performance.now) {
  var Performance = performance;
  exports.unstable_now = function() {
    return Performance.now();
  };
} else
  exports.unstable_now = function() {
    return localDate.now();
  };
if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var _callback = null,
    _timeoutID = null,
    _flushCallback = function() {
      if (null !== _callback)
        try {
          var currentTime = exports.unstable_now();
          _callback(!0, currentTime);
          _callback = null;
        } catch (e) {
          throw (setTimeout(_flushCallback, 0), e);
        }
    };
  requestHostCallback = function(cb) {
    null !== _callback
      ? setTimeout(requestHostCallback, 0, cb)
      : ((_callback = cb), setTimeout(_flushCallback, 0));
  };
  requestHostTimeout = function(cb, ms) {
    _timeoutID = setTimeout(cb, ms);
  };
  cancelHostTimeout = function() {
    clearTimeout(_timeoutID);
  };
  shouldYieldToHost = function() {
    return !1;
  };
  requestPaint = exports.unstable_forceFrameRate = function() {};
} else {
  "undefined" !== typeof console &&
    ("function" !== typeof localRequestAnimationFrame &&
      console.error(
        "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
      ),
    "function" !== typeof localCancelAnimationFrame &&
      console.error(
        "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
      ));
  var scheduledHostCallback = null,
    isMessageEventScheduled = !1,
    isAnimationFrameScheduled = !1,
    timeoutID = -1,
    frameDeadline = 0,
    previousFrameTime = 33,
    activeFrameTime = 33,
    fpsLocked = !1,
    needsPaint = !1;
  if (
    enableIsInputPending &&
    void 0 !== navigator &&
    void 0 !== navigator.scheduling &&
    void 0 !== navigator.scheduling.isInputPending
  ) {
    var scheduling = navigator.scheduling;
    shouldYieldToHost = function() {
      var currentTime = exports.unstable_now();
      return currentTime >= frameDeadline
        ? needsPaint || scheduling.isInputPending()
          ? !0
          : currentTime >= frameDeadline + 300
        : !1;
    };
    requestPaint = function() {
      needsPaint = !0;
    };
  } else
    (shouldYieldToHost = function() {
      return exports.unstable_now() >= frameDeadline;
    }),
      (requestPaint = function() {});
  exports.unstable_forceFrameRate = function(fps) {
    0 > fps || 125 < fps
      ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"
        )
      : 0 < fps
        ? ((activeFrameTime = Math.floor(1e3 / fps)), (fpsLocked = !0))
        : ((activeFrameTime = 33), (fpsLocked = !1));
  };
  var channel = new MessageChannel(),
    port = channel.port2;
  channel.port1.onmessage = function() {
    isMessageEventScheduled = !1;
    if (null !== scheduledHostCallback) {
      var currentTime = exports.unstable_now(),
        hasTimeRemaining = 0 < frameDeadline - currentTime;
      try {
        scheduledHostCallback(hasTimeRemaining, currentTime)
          ? isAnimationFrameScheduled ||
            ((isAnimationFrameScheduled = !0),
            requestAnimationFrameWithTimeout(animationTick))
          : (scheduledHostCallback = null);
      } catch (error) {
        throw ((isMessageEventScheduled = !0), port.postMessage(void 0), error);
      }
      needsPaint = !1;
    }
  };
  var animationTick = function(rafTime) {
    if (null !== scheduledHostCallback) {
      requestAnimationFrameWithTimeout(animationTick);
      var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
      nextFrameTime < activeFrameTime &&
      previousFrameTime < activeFrameTime &&
      !fpsLocked
        ? (8 > nextFrameTime && (nextFrameTime = 8),
          (activeFrameTime =
            nextFrameTime < previousFrameTime
              ? previousFrameTime
              : nextFrameTime))
        : (previousFrameTime = nextFrameTime);
      frameDeadline = rafTime + activeFrameTime;
      isMessageEventScheduled ||
        ((isMessageEventScheduled = !0), port.postMessage(void 0));
    } else isAnimationFrameScheduled = !1;
  };
  requestHostCallback = function(callback) {
    null === scheduledHostCallback &&
      ((scheduledHostCallback = callback),
      isAnimationFrameScheduled ||
        ((isAnimationFrameScheduled = !0),
        requestAnimationFrameWithTimeout(animationTick)));
  };
  requestHostTimeout = function(callback, ms) {
    timeoutID = localSetTimeout(function() {
      callback(exports.unstable_now());
    }, ms);
  };
  cancelHostTimeout = function() {
    localClearTimeout(timeoutID);
    timeoutID = -1;
  };
}
var firstTask = null,
  firstDelayedTask = null,
  isSchedulerPaused = !1,
  currentTask = null,
  currentPriorityLevel = 3,
  isPerformingWork = !1,
  isHostCallbackScheduled = !1,
  isHostTimeoutScheduled = !1;
function flushTask(task, currentTime) {
  var next = task.next;
  if (next === task) firstTask = null;
  else {
    task === firstTask && (firstTask = next);
    var previous = task.previous;
    previous.next = next;
    next.previous = previous;
  }
  task.next = task.previous = null;
  next = task.callback;
  previous = currentPriorityLevel;
  var previousTask = currentTask;
  currentPriorityLevel = task.priorityLevel;
  currentTask = task;
  try {
    var didUserCallbackTimeout = task.expirationTime <= currentTime;
    switch (currentPriorityLevel) {
      case 1:
        var continuationCallback = next(didUserCallbackTimeout);
        break;
      case 2:
        continuationCallback = next(didUserCallbackTimeout);
        break;
      case 3:
        continuationCallback = next(didUserCallbackTimeout);
        break;
      case 4:
        continuationCallback = next(didUserCallbackTimeout);
        break;
      case 5:
        continuationCallback = next(didUserCallbackTimeout);
    }
  } catch (error) {
    throw error;
  } finally {
    (currentPriorityLevel = previous), (currentTask = previousTask);
  }
  if ("function" === typeof continuationCallback)
    if (
      ((currentTime = task.expirationTime),
      (task = {
        callback: continuationCallback,
        priorityLevel: task.priorityLevel,
        startTime: task.startTime,
        expirationTime: currentTime,
        next: null,
        previous: null
      }),
      null === firstTask)
    )
      firstTask = task.next = task.previous = task;
    else {
      continuationCallback = null;
      didUserCallbackTimeout = firstTask;
      do {
        if (currentTime <= didUserCallbackTimeout.expirationTime) {
          continuationCallback = didUserCallbackTimeout;
          break;
        }
        didUserCallbackTimeout = didUserCallbackTimeout.next;
      } while (didUserCallbackTimeout !== firstTask);
      null === continuationCallback
        ? (continuationCallback = firstTask)
        : continuationCallback === firstTask && (firstTask = task);
      currentTime = continuationCallback.previous;
      currentTime.next = continuationCallback.previous = task;
      task.next = continuationCallback;
      task.previous = currentTime;
    }
}
function advanceTimers(currentTime) {
  if (null !== firstDelayedTask && firstDelayedTask.startTime <= currentTime) {
    do {
      var task = firstDelayedTask,
        next = task.next;
      if (task === next) firstDelayedTask = null;
      else {
        firstDelayedTask = next;
        var previous = task.previous;
        previous.next = next;
        next.previous = previous;
      }
      task.next = task.previous = null;
      insertScheduledTask(task, task.expirationTime);
    } while (
      null !== firstDelayedTask &&
      firstDelayedTask.startTime <= currentTime
    );
  }
}
function handleTimeout(currentTime) {
  isHostTimeoutScheduled = !1;
  advanceTimers(currentTime);
  isHostCallbackScheduled ||
    (null !== firstTask
      ? ((isHostCallbackScheduled = !0), requestHostCallback(flushWork))
      : null !== firstDelayedTask &&
        requestHostTimeout(
          handleTimeout,
          firstDelayedTask.startTime - currentTime
        ));
}
function flushWork(hasTimeRemaining, initialTime) {
  if (!enableSchedulerDebugging || !isSchedulerPaused) {
    isHostCallbackScheduled = !1;
    isHostTimeoutScheduled &&
      ((isHostTimeoutScheduled = !1), cancelHostTimeout());
    advanceTimers(initialTime);
    isPerformingWork = !0;
    try {
      if (!hasTimeRemaining)
        for (
          ;
          null !== firstTask &&
          firstTask.expirationTime <= initialTime &&
          (!enableSchedulerDebugging || !isSchedulerPaused);

        )
          flushTask(firstTask, initialTime),
            (initialTime = exports.unstable_now()),
            advanceTimers(initialTime);
      else if (null !== firstTask) {
        do
          flushTask(firstTask, initialTime),
            (initialTime = exports.unstable_now()),
            advanceTimers(initialTime);
        while (
          !(
            null === firstTask ||
            shouldYieldToHost() ||
            (enableSchedulerDebugging && isSchedulerPaused)
          )
        );
      }
      if (null !== firstTask) return !0;
      null !== firstDelayedTask &&
        requestHostTimeout(
          handleTimeout,
          firstDelayedTask.startTime - initialTime
        );
      return !1;
    } finally {
      isPerformingWork = !1;
    }
  }
}
function timeoutForPriorityLevel(priorityLevel) {
  switch (priorityLevel) {
    case 1:
      return -1;
    case 2:
      return 250;
    case 5:
      return 1073741823;
    case 4:
      return 1e4;
    default:
      return 5e3;
  }
}
function insertScheduledTask(newTask, expirationTime) {
  if (null === firstTask) firstTask = newTask.next = newTask.previous = newTask;
  else {
    var next = null,
      task = firstTask;
    do {
      if (expirationTime < task.expirationTime) {
        next = task;
        break;
      }
      task = task.next;
    } while (task !== firstTask);
    null === next
      ? (next = firstTask)
      : next === firstTask && (firstTask = newTask);
    expirationTime = next.previous;
    expirationTime.next = next.previous = newTask;
    newTask.next = next;
    newTask.previous = expirationTime;
  }
}
var unstable_requestPaint = requestPaint;
exports.unstable_ImmediatePriority = 1;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_NormalPriority = 3;
exports.unstable_IdlePriority = 5;
exports.unstable_LowPriority = 4;
exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      priorityLevel = 3;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_next = function(eventHandler) {
  switch (currentPriorityLevel) {
    case 1:
    case 2:
    case 3:
      var priorityLevel = 3;
      break;
    default:
      priorityLevel = currentPriorityLevel;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
  var currentTime = exports.unstable_now();
  if ("object" === typeof options && null !== options) {
    var startTime = options.delay;
    startTime =
      "number" === typeof startTime && 0 < startTime
        ? currentTime + startTime
        : currentTime;
    options =
      "number" === typeof options.timeout
        ? options.timeout
        : timeoutForPriorityLevel(priorityLevel);
  } else
    (options = timeoutForPriorityLevel(priorityLevel)),
      (startTime = currentTime);
  options = startTime + options;
  priorityLevel = {
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: startTime,
    expirationTime: options,
    next: null,
    previous: null
  };
  if (startTime > currentTime) {
    options = startTime;
    if (null === firstDelayedTask)
      firstDelayedTask = priorityLevel.next = priorityLevel.previous = priorityLevel;
    else {
      callback = null;
      var task = firstDelayedTask;
      do {
        if (options < task.startTime) {
          callback = task;
          break;
        }
        task = task.next;
      } while (task !== firstDelayedTask);
      null === callback
        ? (callback = firstDelayedTask)
        : callback === firstDelayedTask && (firstDelayedTask = priorityLevel);
      options = callback.previous;
      options.next = callback.previous = priorityLevel;
      priorityLevel.next = callback;
      priorityLevel.previous = options;
    }
    null === firstTask &&
      firstDelayedTask === priorityLevel &&
      (isHostTimeoutScheduled
        ? cancelHostTimeout()
        : (isHostTimeoutScheduled = !0),
      requestHostTimeout(handleTimeout, startTime - currentTime));
  } else
    insertScheduledTask(priorityLevel, options),
      isHostCallbackScheduled ||
        isPerformingWork ||
        ((isHostCallbackScheduled = !0), requestHostCallback(flushWork));
  return priorityLevel;
};
exports.unstable_cancelCallback = function(task) {
  var next = task.next;
  if (null !== next) {
    if (task === next)
      task === firstTask
        ? (firstTask = null)
        : task === firstDelayedTask && (firstDelayedTask = null);
    else {
      task === firstTask
        ? (firstTask = next)
        : task === firstDelayedTask && (firstDelayedTask = next);
      var previous = task.previous;
      previous.next = next;
      next.previous = previous;
    }
    task.next = task.previous = null;
  }
};
exports.unstable_wrapCallback = function(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function() {
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;
    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
};
exports.unstable_getCurrentPriorityLevel = function() {
  return currentPriorityLevel;
};
exports.unstable_shouldYield = function() {
  var currentTime = exports.unstable_now();
  advanceTimers(currentTime);
  return (
    (null !== currentTask &&
      null !== firstTask &&
      firstTask.startTime <= currentTime &&
      firstTask.expirationTime < currentTask.expirationTime) ||
    shouldYieldToHost()
  );
};
exports.unstable_requestPaint = unstable_requestPaint;
exports.unstable_continueExecution = function() {
  isSchedulerPaused = !1;
  isHostCallbackScheduled ||
    isPerformingWork ||
    ((isHostCallbackScheduled = !0), requestHostCallback(flushWork));
};
exports.unstable_pauseExecution = function() {
  isSchedulerPaused = !0;
};
exports.unstable_getFirstCallbackNode = function() {
  return firstTask;
};
