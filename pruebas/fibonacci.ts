class Fibonacci {
  private calculation: number;

  constructor(value: number) {
    if (value <= 1) {
      this.calculation = value;
      return;
    }

    this.calculation =
      new Fibonacci(value - 1).calculation +
      new Fibonacci(value - 2).calculation;
  }

  public getValue() {
    return this.calculation;
  }
}

class PerformantFibonacci {
  static calculatedValues: Record<number, number> = {};
  private calculation: number;

  constructor(value: number) {
    if (value <= 1) {
      this.calculation = value;
      return;
    }

    let valueAtMinus1: number = PerformantFibonacci.calculatedValues[value - 1];
    if (!valueAtMinus1) {
        valueAtMinus1 = new PerformantFibonacci(value-1).calculation;
      PerformantFibonacci.calculatedValues[value-1] = valueAtMinus1;
    }

    let valueAtMinus2: number = PerformantFibonacci.calculatedValues[value - 2];
    if (!valueAtMinus2) {
        valueAtMinus2 = new PerformantFibonacci(value-2).calculation;
      PerformantFibonacci.calculatedValues[value-2] = valueAtMinus2;
    }

    this.calculation = valueAtMinus1 + valueAtMinus2;
  }

  public getValue() {
    return this.calculation;
  }
}
const value1 = 40; // max 45
const value2 = 101;

console.time('Fibonacci');
console.log(new Fibonacci(value1).getValue());
console.timeEnd('Fibonacci');

console.time('PerformantFibonacci');
console.log(new PerformantFibonacci(value2).getValue());
console.timeEnd('PerformantFibonacci');

console.time('PerformantFibonacci second time');
console.log(new PerformantFibonacci(value2).getValue());
console.timeEnd('PerformantFibonacci second time');