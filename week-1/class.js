class Car {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
    age() {
        let date = new Date();
        return date.getFullYear() - this.year;
    }
}

// let ourCar = new Car("Ford", 2014);

// console.log("Our car is " + ourCar.age() + " years old.");

class Model extends Car {
    constructor(name, year, mod) {
        super(name, year);
        this.mod = mod;
    }
    show() {
        return this.name + " " + this.mod + " is " + super.age() + " years old.";
    }
}

let myCar = new Model("Ford", 2014, "Mustang");
console.log(myCar.show());