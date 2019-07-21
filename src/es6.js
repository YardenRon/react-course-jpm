/**
 * Let's get going on some vanilla JS features.
 * Some of these are new, but some have been with us since the early 2010s
 *
 * @TOKNOW promises, async-await
 *
 * https://babeljs.io/repl
 */

async function varLetConst() {
  const promises = [];
  for (let i = 0; i < 5; i++) {
    promises.push(
      // eslint-disable-next-line
      new Promise(function(resolve) {
        setTimeout(function() {
          resolve(i);
        }, 0);
      })
    );
  }
  const values = await Promise.all(promises);
  return (
    values.reduce(function(sum, value) {
      return sum + value;
    }) === 10
  ); // 0 + 1 + 2 + 3 + 4
}

function generateNRandomNumbers(n, max) {
  const numbers = [];
  for (let i = 0; i < n; i++) {
    numbers.push(Math.round(max * Math.random()));
  }
  return numbers;
}

function filterMapReduce() {
  // return !generateNRandomNumbers(4, 10)
  //   .concat(generateNRandomNumbers(3, 5))
  //   .filter(function(item) {
  //     return item > 5;
  //   })
  //   .map(function(item) {
  //     return item * item;
  //   })
  //   .find(function(item) {
  //     return item < 25;
  //   });
  const samples = generateNRandomNumbers(4, 10).concat(
    generateNRandomNumbers(3, 5)
  );
  const samplesOver5 = samples.filter(function(item) {
    return item > 5;
  });
  const squaresOfSamplesOver5 = samplesOver5.map(function(item) {
    return item * item;
  });
  return !squaresOfSamplesOver5.find(function(item) {
    return item < 25;
  });
}

// Hint: use destructuring for more readable code :)
function generateCompanyEmail({ fullName, company }) {
  const [firstName] = fullName.split(' ');
  return `${firstName}@${company}.com`;
}

// Use arrow functions and class syntax to make this work
function getUserFoo() {
  class User {
    constructor(username) {
      this.username = username;
    }

    fetchUser = () => {
      return new Promise(resolve => {
        resolve({
          username: this && this.username,
        });
      });
    };
  }
  const user = new User('foo');
  const { fetchUser } = user;
  return fetchUser();
}

function shallowClone(object) {
  if (Array.isArray(object)) {
    return [...object];
  }
  return { ...object };
}

export default async function runAll() {
  (await varLetConst()) || console.log('FAIL!');
  filterMapReduce() || console.log('FAIL!');
  generateCompanyEmail({
    fullName: 'Scott R. Mellow',
    company: 'foobar',
  }) === 'Scott@foobar.com' || console.log('FAIL!');
  (await getUserFoo()).username === 'foo' || console.log('FAIL!');
  const arr = [1];
  const cloneOfArr = shallowClone(arr);
  arr[0] === cloneOfArr[0] || console.log('FAIL!');
  cloneOfArr.pop();
  arr[0] !== cloneOfArr[0] || console.log('FAIL!');
  const user = { username: 'foo' };
  const cloneOfUser = shallowClone(user);
  user.username === cloneOfUser.username || console.log('FAIL!');
  cloneOfUser.username = 'bar';
  user.username !== cloneOfUser.username || console.log('FAIL!');
}
