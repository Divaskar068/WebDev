# 🚀 WEB DEV – Intro to JavaScript

---

## Console Output

```javascript
console.log("Hi");
```

---

## JavaScript Basics

### ➕ Concatenation (`+`)

The `+` operator joins two values regardless of type.

```javascript
var x = 12 + "Hello";
// Output: "12Hello"
```

---

## Variables: `var` vs `let`

### `var`
- Global or function-scoped  
- Accessible outside `{ ... }` blocks  

### `let`
- Block-scoped  
- Only accessible inside the `{ ... }` it was defined in  

```javascript
for (var i = 0; i < 5; i++) {
  if (i == 2) {
    continue; // skips iteration
  }
}
```

---

## Arrays

```javascript
var x = [2, 4];
```

---

## Objects

```javascript
let x = {
  age: 25,
  name: "Bob",
  id: 12
};

var z = "age";
console.log(x[z]); // Output: 25
```

---

## Functions

```javascript
function addition(val1, val2) {
  return val1 + val2;
}

addition(5, 2); // 7
```

---

# 📊 Challenge: Find Mean, Median, and Mode

### Given Data

```javascript
var inputArr = [23, 9, 14, 2, 28, 19, 3, 15, 9, 25, 2, 4, 9];
```

---

## Mean 

```javascript
function mean(inputArr) {
  let total = 0;

  for (let i = 0; i < inputArr.length; i++) {
    total += inputArr[i];
  }

  return total / inputArr.length;
}
```

---

## Median

```javascript
function median(inputArr) {
  // numeric sort on a copy (to avoid mutating the original)
  const newArr = [...inputArr].sort((a, b) => a - b);
  const mid = Math.floor(newArr.length / 2);

  if (newArr.length % 2 === 0) {
    return (newArr[mid - 1] + newArr[mid]) / 2;
  } else {
    return newArr[mid];
  }
}
```

---

## Mode 

```javascript
function mode(inputArr) {
  const freq = {};
  let maxFreq = 0;
  let modeVal = null;

  for (let num of inputArr) {
    freq[num] = (freq[num] || 0) + 1;

    if (freq[num] > maxFreq) {
      maxFreq = freq[num];
      modeVal = num;
    }
  }

  return modeVal;
}
```

---

## Test

```javascript
console.log("Input:", inputArr);
console.log("Mean:", mean(inputArr));
console.log("Median:", median(inputArr));
console.log("Mode:", mode(inputArr));
```
