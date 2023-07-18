function asyncFunction(arg1, arg2, callback) {
    // Simulating an asynchronous operation
    setTimeout(() => {
      if (arg1 && arg2) {
        callback(null, arg1 + arg2);
      } else {
        callback(new Error('Invalid arguments'));
      }
    }, 1000);
  }
  
  asyncFunction(5, 3, (error, result) => {
    if (error) {
      console.error('An error occurred:', error.message);
    } else {
      console.log('Result:', result);
    }
  });
  