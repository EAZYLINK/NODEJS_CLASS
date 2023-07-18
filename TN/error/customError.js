class CustomError extends Error {
    constructor(name, message){
        super(message)
        this.name = name
        this.message = message
    }
}

const notFoundError = new CustomError('notFound', "no input")
console.log(notFoundError)