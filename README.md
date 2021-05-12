#ES6 문법정리 
### (update 2021.05.12)
## const/let 블록 스코프

`var`의 변수스코프는 `function`단위, `const/let`은 `block` 단위, `const`는 상수, `let`는 변수

```
function foo() {
    let a = 1
    if (true) {
        let a = 2
        console.log(a)  // 2
    }
    console.log(a)  // 1
}
```

## 템플릿 / 백틱

```
document.addEventListener('DOMContentLoaded', () => {
    const you = "Chris", name = "Charles", surname = "Barkley"
    const tmp = `<p>Hello, ${you}. My name is ${name} ${surname}</p>`const el = document.getElementById("el")
    el.insertAdjacentHTML('beforeend', tmp)
});
```

## 화살표 함수

```
// #1: 일반적인 화살표 함수
let square = (num) => {
    return num * num
}
console.log(square(4))	// 16

// #2: 화살표 내의 this는 ES5의 function 내의 this와 다름
console.log(this === window)		// true
let basket = {
    _name: "ball",
    _mates: ["rebound", "shoot", "pass"],
    matesCount() {
        console.log(this === window)	// false
        console.log(this)				// basket 객체를 가리킴
        this._mates.forEach(f => console.log(this._name + " is " + f ))
    }
}
basket.matesCount()

// #3: 화살표 함수의 return 값
const even = [2, 4, 6, 8, 10, 12, 14]
const odd  = even.map(n => n + 1)
const num  = even.map((n, i) => n + i)	// map(crruentValue, index, array)
console.log(even)	// [2, 4, 6, 8, 10, 14]
console.log(odd)	// [3, 5, 7, 9, 11, 13, 15]
console.log(num)	// [2, 5, 8, 11, 14, 17, 20]

// #4: 비구조화 지원
const f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
console.log(f())	//	6
```

## 클래스

prototype 기반의 대체재로 쓰임

```
class Shape {
    constructor() {}
}

class Rectangle extends Shape {
    constructor(w, h) {
        super(w, h)
        this.w = 20
        this.h = 10
    }
    getArea(w, h) {
        return w * h
    }
 	// get, set, static 예약어로 메서드를 설정할 수 있음
}
let rect = new Rectangle()
console.log(rect.getArea(30, 20))	// 600
```

## 모듈

```
// js/main.js
export default {
  init() {
    console.log("main.js")
  },
  sum(x, y) {
    return x + y
  }
}
export const PI = 3.14156265

// app.js
import Main from './js/main.js'

document.addEventListener('DOMContentLoaded', () => {
	Main.init()
	console.log(Main.sum(Main.PI * Main.PI))
})

// otherapp.js
import {sum, PI} from "./js/main"
console.log("sum: " + sum(PI, PI));

// index.html
<script type="module" src="app.js"></script>
```

## 배열/객체 할당 확장

```
const [a, b, c] = [1, 2, 3]
console.log(a, b, c)	// 1, 2, 3

const obj = {x: 'banana', y: 'apple'}
let {x, y, z}  = obj
console.log(x, y, z)    // x: 'banana', y: 'apple', z: undefined

function f({name: x}) {
    console.log(x)		// x: 8
}
f({name: 8})

var [u = 1] = []
console.log(u === 1) 	// true
```

## Spread(...) 연산자

```
function sum(x, y = 12) {
    return x + y
}
console.log(sum(4))

function f(x, ...y) {
    return x * y.length
}
console.log(f(3, 'hello', true))

function ff(x, y, z) {
    return x + y + z
}
console.log(ff(...[1, 2, 3]))
```

## Fetch / Promise / Async-await

```
// fetch
fetch('https://hacker-news.firebaseio.com/v0/item/8863.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.title)
    })
    .catch(error => console.log(error))

// promise: pending(대기), fulfilled(이행), reject(실패)
function getData() {
    return new Promise(function (resolve, reject) {
        var data = 100
        resolve(data)
    })
}

getData().then(function (resolvedData) {
    console.log(resolvedData)
}).catch(function (err) {
    console.error(err)
})

// promise pattern in real project
getData(userInfo)
    .then(parseValue)
    .then(auth)
    .then(display)

var userInfo = {
    id: 'user@gmail.com',
    pw: '******'
}

function parseValue() {
    return new Promise() {
        // ...
    })
}
function auth() {
    return new Promise() {
        // ...
    })
}
function display() {
    return new Promise() {
        // ...
    })
}

// async-await: fetch 패턴보다 향상된 패턴
// promise 사용
function logFetch(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log(text);
    }).catch(err => {
      console.error('fetch failed', err);
    });
}
logFetch('https://hacker-news.firebaseio.com/v0/item/8863.json')

// async-await 사용
async function logFetch(url) {
  try {
    const response = await fetch(url)
    console.log(await response.text())
  } catch (err) {
    console.log('fetch failed', err)
  }
}
logFetch('https://hacker-news.firebaseio.com/v0/item/8863.json')
```

## Iterator / Generator

```
// iterable: Array, TypedArray, String, Map, Set
const iterable = {}

iterable[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
}
console.log([...iterable])
for(var value of iterable) {
    console.log(value)
}

// iterator: interface to read
var iterator = '12'[Symbol.iterator]()
iterator.next(); // {value: "1", done: false}
iterator.next(); // {value: "2", done: false}
iterator.next(); // {value: undefined, done: true}

// generator: interface to write (함수이면서 함수와는 다르게 동작함)
function* foo() {
  yield 1
  yield 2
  yield 3
}

for (let i of foo()) {
  console.log(i)
}
```