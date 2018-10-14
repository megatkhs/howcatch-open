async function hoge() {
  return new Promise(resolve => {
    const foo = [1, 2, 3, 4, 5, 6, 7, 8];

    foo.forEach(v => {
      console.log(v)
    });

    resolve();
  })
}

console.log('おわり')
hoge().then(() => {
  console.log('おわり')
})
console.log('おわり')