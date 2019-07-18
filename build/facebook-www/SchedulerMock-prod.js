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
var enableSchedulerDebugging = require("SchedulerFeatureFlags")
    .enableSchedulerDebugging,
  currentTime = 0,
  scheduledCallback = null,
  scheduledTimeout = null,
  timeoutTime = -1,
  yieldedValues = null,
  expectedNumberOfYields = -1,
  didStop = !1,
  isFlushing = !1,
  needsPaint = !1,
  shouldYieldForPaint = !1;
function shouldYieldToHost() {
  return (-1 !== expectedNumberOfYields &&
    null !== yieldedValues &&
    yieldedValues.length >= expectedNumberOfYields) ||
    (shouldYieldForPaint && needsPaint)
    ? (didStop = !0)
    : !1;
}
function unstable_flushExpired() {
  if (isFlushing) throw Error("Already flushing work.");
  if (null !== scheduledCallback) {
    isFlushing = !0;
    try {
      scheduledCallback(!1, currentTime) || (scheduledCallback = null);
    } finally {
      isFlushing = !1;
    }
  }
}
function unstable_flushAllWithoutAsserting() {
  if (isFlushing) throw Error("Already flushing work.");
  if (null !== scheduledCallback) {
    var cb = scheduledCallback;
    isFlushing = !0;
    try {
      var hasMoreWork = !0;
      do hasMoreWork = cb(!0, currentTime);
      while (hasMoreWork);
      hasMoreWork || (scheduledCallback = null);
      return !0;
    } finally {
      isFlushing = !1;
    }
  } else return !1;
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
function handleTimeout(currentTime$jscomp$0) {
  isHostTimeoutScheduled = !1;
  advanceTimers(currentTime$jscomp$0);
  isHostCallbackScheduled ||
    (null !== firstTask
      ? ((isHostCallbackScheduled = !0), (scheduledCallback = flushWork))
      : null !== firstDelayedTask &&
        ((currentTime$jscomp$0 =
          firstDelayedTask.startTime - currentTime$jscomp$0),
        (scheduledTimeout = handleTimeout),
        (timeoutTime = currentTime + currentTime$jscomp$0)));
}
function flushWork(hasTimeRemaining, initialTime) {
  if (!enableSchedulerDebugging || !isSchedulerPaused) {
    isHostCallbackScheduled = !1;
    isHostTimeoutScheduled &&
      ((isHostTimeoutScheduled = !1),
      (scheduledTimeout = null),
      (timeoutTime = -1));
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
            (initialTime = currentTime),
            advanceTimers(initialTime);
      else if (null !== firstTask) {
        do
          flushTask(firstTask, initialTime),
            (initialTime = currentTime),
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
      if (null !== firstDelayedTask) {
        var ms = firstDelayedTask.startTime - initialTime;
        scheduledTimeout = handleTimeout;
        timeoutTime = currentTime + ms;
      }
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
exports.unstable_flushAllWithoutAsserting = unstable_flushAllWithoutAsserting;
exports.unstable_flushNumberOfYields = function(count) {
  if (isFlushing) throw Error("Already flushing work.");
  if (null !== scheduledCallback) {
    var cb = scheduledCallback;
    expectedNumberOfYields = count;
    isFlushing = !0;
    try {
      count = !0;
      do count = cb(!0, currentTime);
      while (count && !didStop);
      count || (scheduledCallback = null);
    } finally {
      (expectedNumberOfYields = -1), (isFlushing = didStop = !1);
    }
  }
};
exports.unstable_flushExpired = unstable_flushExpired;
exports.unstable_clearYields = function() {
  if (null === yieldedValues) return [];
  var values = yieldedValues;
  yieldedValues = null;
  return values;
};
exports.unstable_flushUntilNextPaint = function() {
  if (isFlushing) throw Error("Already flushing work.");
  if (null !== scheduledCallback) {
    var cb = scheduledCallback;
    shouldYieldForPaint = !0;
    needsPaint = !1;
    isFlushing = !0;
    try {
      var hasMoreWork = !0;
      do hasMoreWork = cb(!0, currentTime);
      while (hasMoreWork && !didStop);
      hasMoreWork || (scheduledCallback = null);
    } finally {
      isFlushing = didStop = shouldYieldForPaint = !1;
    }
  }
};
exports.unstable_flushAll = function() {
  if (null !== yieldedValues)
    throw Error(
      "Log is not empty. Assert on the log of yielded values before flushing additional work."
    );
  unstable_flushAllWithoutAsserting();
  if (null !== yieldedValues)
    throw Error(
      "While flushing work, something yielded a value. Use an assertion helper to assert on the log of yielded values, e.g. expect(Scheduler).toFlushAndYield([...])"
    );
};
exports.unstable_yieldValue = function(value) {
  null === yieldedValues
    ? (yieldedValues = [value])
    : yieldedValues.push(value);
};
exports.unstable_advanceTime = function(ms) {
  currentTime += ms;
  isFlushing ||
    (null !== scheduledTimeout &&
      timeoutTime <= currentTime &&
      (scheduledTimeout(currentTime),
      (timeoutTime = -1),
      (scheduledTimeout = null)),
    unstable_flushExpired());
};
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
  var currentTime$jscomp$0 = currentTime;
  if ("object" === typeof options && null !== options) {
    var startTime = options.delay;
    startTime =
      "number" === typeof startTime && 0 < startTime
        ? currentTime$jscomp$0 + startTime
        : currentTime$jscomp$0;
    options =
      "number" === typeof options.timeout
        ? options.timeout
        : timeoutForPriorityLevel(priorityLevel);
  } else
    (options = timeoutForPriorityLevel(priorityLevel)),
      (startTime = currentTime$jscomp$0);
  options = startTime + options;
  priorityLevel = {
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: startTime,
    expirationTime: options,
    next: null,
    previous: null
  };
  if (startTime > currentTime$jscomp$0) {
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
        ? ((scheduledTimeout = null), (timeoutTime = -1))
        : (isHostTimeoutScheduled = !0),
      (scheduledTimeout = handleTimeout),
      (timeoutTime = currentTime + (startTime - currentTime$jscomp$0)));
  } else
    insertScheduledTask(priorityLevel, options),
      isHostCallbackScheduled ||
        isPerformingWork ||
        ((isHostCallbackScheduled = !0), (scheduledCallback = flushWork));
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
  var currentTime$jscomp$0 = currentTime;
  advanceTimers(currentTime$jscomp$0);
  return (
    (null !== currentTask &&
      null !== firstTask &&
      firstTask.startTime <= currentTime$jscomp$0 &&
      firstTask.expirationTime < currentTask.expirationTime) ||
    shouldYieldToHost()
  );
};
exports.unstable_requestPaint = function() {
  needsPaint = !0;
};
exports.unstable_continueExecution = function() {
  isSchedulerPaused = !1;
  isHostCallbackScheduled ||
    isPerformingWork ||
    ((isHostCallbackScheduled = !0), (scheduledCallback = flushWork));
};
exports.unstable_pauseExecution = function() {
  isSchedulerPaused = !0;
};
exports.unstable_getFirstCallbackNode = function() {
  return firstTask;
};
exports.unstable_now = function() {
  return currentTime;
};
exports.unstable_forceFrameRate = function() {};
