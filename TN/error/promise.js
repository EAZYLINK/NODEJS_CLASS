// Function that returns a promise
function getDataFromServer() {
    return new Promise((resolve, reject) => {
      // Simulating an asynchronous operation
      setTimeout(() => {
        const data = { name: 'John', age: 25 };
        if (data) {
          resolve(data); // Resolve the promise with the data
        } else {
          reject(new Error('Failed to fetch data')); // Reject the promise with an error
        }
      }, 1000);
    });
  }
  
  // Using the promise
  getDataFromServer()
    .then((data) => {
      console.log('Data:', data);
      // Perform further operations with the data
    })
    .catch((error) => {
      console.error('Error:', error.message);
      // Handle the error
    })
    .finally(() => {
      console.log('Promise completed'); // Executed regardless of success or failure
    });
  