exports.primeNumber = () => {
  const number = this.randomize(10);

  return {
    number,
    prime: isPrime(number),
  };
};

exports.randomize = (max) => {
  return Math.round(Math.random() * max);
};

exports.fibonacci = (pos) => {
  if (pos < 0) {
    return 0;
  }

  if (pos <= 1) {
    return pos;
  }

  return this.fibonacci(pos - 1) + this.fibonacci(pos - 2);
};

const isPrime = (num) => {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};
