// Define a type for a person
type Person = {
    name: string;
    age: number;
  };
  
  function greet(person: Person): string {
    return `Hello, ${person.name}! You are ${person.age} years old.`;
  }
  
  // Example usage
  const user: Person = { name: "John", age: 30 };
  console.log(greet(user)); 
  