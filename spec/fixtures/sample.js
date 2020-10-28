// Sample file for ensuring the regions get added.
// Output Fizz on multiples of 3, Output Buzz on multiples of 5
// Output FizzBuzz on multiples of 3 and 5

let output = "";

let i = 1;
while (i <= 100) {
  let string = `${i} `;
  if ((i % 3) === 0) { string += 'Fizz'; }
  if ((i % 5) === 0) { string += 'Buzz'; }
  output += `${string}\n`;
  i++;
}
