process.on('uncaughtException', (error) => {
    console.error('Uncaught exception occurred:', error);
    // Perform necessary cleanup and shutdown tasks
    process.exit(1); // Exit with a non-zero code to indicate failure
  });
  
  // Code that might throw an uncaught error
  const result = 10 / 0; // Division by zero (throws an error)
  console.log(result);
  