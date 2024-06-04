const animal = ['dog', 'cat'];

const [first, second] = animal;

// console.log(first); // dog
// console.log(second); // cat

// setTimeout(() => {
//   console.log(first);
// }, 3000);

// setTimeout(() => {
//   console.log(second);
// }, 2000);

// callback function hell
function badPrint(count, e, e2) {
  setTimeout(() => {
      console.log(e);
      setTimeout(() => {
          console.log(e2);
      }, 2000);
  }, 3000);
}
// badPrint(3, first, second);

// Promise
function goodPrint(count, e, e2) {
  let one = new Promise((res, rej) => {
      setTimeout(() => {
          res(e);
          console.log(e);
      }, 3000);
  });
  let two = new Promise((res, rej) => {
      setTimeout(() => {
          res(e2);
          console.log(e2);
      }, 2000);
  });

  return Promise.race([one, two]);
}

// goodPrint(3, first, second).then((result) => {
//   return first;
// }).then((result) => {
// });

// async/await
async function asyncPrint(count, e, e2) {
  const one = new Promise((res, rej) => {
      setTimeout(() => {
          res(e);
          console.log(e);
      }, 3000);
  });
  const two = new Promise((res, rej) => {
      setTimeout(() => {
          res(e2);
          console.log(e2);
      }, 2000);
  });

  await one;
  await two;
}

asyncPrint(3, first, second);