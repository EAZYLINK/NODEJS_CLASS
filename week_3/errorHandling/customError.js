
class CustomError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
    this.message = message;
  }
}

const inputError = new CustomError("invalidInput", "You entered an invalid input");


const getNumber = (num) => {
    if (typeof num !== "number") {
        throw inputError.message;
    } else {
        console.log("You entered a number");
    }
    }

getNumber(3);