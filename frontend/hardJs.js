// --------- MAP


const obj = {
  name: 'Nella',
  age: 19,
  job: 'student'
}

const entries = [
  ['name', 'Nella'],
  ['age', 19],
  ['job', 'student'] 
]

// console.log(Object.entries(obj))
// console.log(Object.fromEntries(entries))

const map = new Map(entries)
console.log(map.get('name'))

// map
//   .set('drink', 'cola')
//   .set(obj, 'value')


// map.delete(obj)

console.log(map)

// for (let value of map) {
//   console.log(value)
// }

// const array = [...map]
const array = Array.from(map)
console.log(array)

// -------------- SET

const set = new Set([1, 2, 3, 4, 5, 5])

set.add(10)

console.log(set)
console.log(set.has(9))
console.log(set.size)


console.log(set.values())