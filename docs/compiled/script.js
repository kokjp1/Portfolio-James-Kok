"use strict";
function greet(person) {
    return `Hello, ${person.name}! You are ${person.age} years old.`;
}
// Example usage
const user = { name: "John", age: 30 };
console.log(greet(user));
