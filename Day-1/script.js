const container = document.getElementById("container");
document.getElementById("click").addEventListener("click", runHoistingTest);

function runHoistingTest() {
  container.innerHTML += "var variable hosted " + varTesting + "<br>";

  try {
    container.innerHTML += "let before declaration " + letTesting + "<br>";
  } catch (error) {
    container.innerHTML += "let variable error" + error.message + "<br>";
  }

  try {
    container.innerHTML += "const before declaration " + constTesting + "<br>";
  } catch (error) {
    container.innerHTML += "const variable error" + error.message + "<br>";
  }
  var varTesting = " I exist because of var";
  let letTesting = " temporal dead zone";
  const constTesting = " temporal dead zone";
}

// Part 2 : the closure Loop

// the buggy buttons

const buggyButtons = document.getElementById("buggy-buttons");
for (var i = 1; i <= 5; i++) {
  const button = document.createElement("button");
  button.textContent = "Button " + i;
  button.addEventListener("click", function () {
    alert("This is button " + i);
  });
  buggyButtons.appendChild(button);
}

// the fix buttons
const fixedButtons = document.getElementById("fix-buttons");

for (var i = 1; i <= 5; i++) {
  (function (indexValue) {
    const button = document.createElement("button");
    button.textContent = "Button " + indexValue;
    button.addEventListener("click", function () {
      alert("This is button " + indexValue);
    });
    fixedButtons.appendChild(button);
  })(i);
}

// part -3 the private counter

function crateCounter() {
  let count = 0;
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = crateCounter();
const countValue = document.getElementById("count-value");
document.getElementById("increment").addEventListener("click", () => {
  countValue.textContent = counter.increment();
});
document.getElementById("decrement").addEventListener("click", () => {
  countValue.textContent = counter.decrement();
});

// fix block scope
function testBlockScope() {
  try {
    {
      let blockScop = "i am inside block scope";
      alert("inside block " + blockScop);
    }
    alert("outside block " + blockScop);
  } catch (error) {
    alert("inside block error " + error.message);
  }
}
document
  .getElementById("block-scope-btn")
  .addEventListener("click", testBlockScope);

//excutation timer

const stopwatch = (function () {
  const startTime = Date.now();
  return function () {
    const sec = Math.floor((Date.now() - startTime) / 1000);
    alert("Time elapsed: " + sec + " seconds");
  };
})();
document.getElementById("timerBtn").addEventListener("click", stopwatch);
