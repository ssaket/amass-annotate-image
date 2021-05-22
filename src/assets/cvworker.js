'use-strict';
// function waitForOpencv(callbackFn, waitTimeMs = 30000, stepTimeMs = 100) {
//  if (cv.Mat) callbackFn(true);

//  let timeSpentMs = 0
//  const interval = setInterval(() => {
//    const limitReached = timeSpentMs > waitTimeMs;
//    if (cv.Mat || limitReached) {
//      clearInterval(interval);
//      return callbackFn(!limitReached);
//    } else {
//      timeSpentMs += stepTimeMs;
//    }
//  }, stepTimeMs);
// }

/**
* This exists to capture all the events that are thrown out of the worker
* into the worker. Without this, there would be no communication possible
* with the project.
*/
// onmessage = function (e) {
//  switch (e.data.msg) {
//    case 'load': {
//      // Import Webassembly script
//      importScripts('./opencv.js')
//      waitForOpencv(function (success) {
//        if (success) postMessage({ msg: e.data.msg });
//        else throw new Error('Error on loading OpenCV')
//      })
//      break;
//    }
//    default:
//      break;
//  }
// }

onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}