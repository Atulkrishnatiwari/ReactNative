// console.log("Atul");

// function summarizeUser(userName, age, hasHobby) {
//   return (
//     "Name is " +
//     userName +
//     ", age is " +
//     age +
//     " and the user has hobbies " +
//     hasHobby
//   );
// }

// console.log(summarizeUser("Atul", 24, true));

const person = {
  name: "Atul",
  age: 24,
  greet() {
    console.log("Hi I am " + this.name);
  },
};

const printName = ({ age }) => {
  console.log(age);
};

printName(person);
const { name, age } = person;
console.log(age, name);
