exports.primeNumber = () => {
  const number = this.randomize(10);

  return {
    number,
    prime: isPrime(number),
  };
};

exports.randomize = (max) => {
  return Math.floor(Math.random() * max);
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
