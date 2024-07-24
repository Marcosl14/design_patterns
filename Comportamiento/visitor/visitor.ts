// Interfaz para el Visitor
interface Visitor {
  visitNumberExpression(expr: NumberExpression): void;
  visitAdditionExpression(expr: AdditionExpression): void;
  visitSubtractionExpression(expr: SubtractionExpression): void;
}

// Interfaz para la expresión
interface Expression {
  accept(visitor: Visitor): void;
}

// Implementación de expresión numérica
class NumberExpression implements Expression {
  constructor(private value: number) {}

  getValue(): number {
    return this.value;
  }

  accept(visitor: Visitor): void {
    visitor.visitNumberExpression(this);
  }
}

// Implementación de expresión de suma
class AdditionExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  getLeft(): Expression {
    return this.left;
  }

  getRight(): Expression {
    return this.right;
  }

  accept(visitor: Visitor): void {
    visitor.visitAdditionExpression(this);
  }
}

// Implementación de expresión de resta
class SubtractionExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  getLeft(): Expression {
    return this.left;
  }

  getRight(): Expression {
    return this.right;
  }

  accept(visitor: Visitor): void {
    visitor.visitSubtractionExpression(this);
  }
}

// Implementación concreta de Visitor que realiza operaciones sobre las expresiones
class ExpressionPrinter implements Visitor {
  private result: string = '';

  getResult(): string {
    return this.result;
  }

  visitNumberExpression(expr: NumberExpression): void {
    this.result += expr.getValue().toString();
  }

  visitAdditionExpression(expr: AdditionExpression): void {
    this.result += '(';
    expr.getLeft().accept(this);
    this.result += '+';
    expr.getRight().accept(this);
    this.result += ')';
  }

  visitSubtractionExpression(expr: SubtractionExpression): void {
    this.result += '(';
    expr.getLeft().accept(this);
    this.result += '-';
    expr.getRight().accept(this);
    this.result += ')';
  }
}

// Uso del patrón Visitor
const expression = new AdditionExpression(
  new NumberExpression(5),
  new SubtractionExpression(new NumberExpression(10), new NumberExpression(3))
);

const printer = new ExpressionPrinter();
expression.accept(printer);
console.log('Expresión: ', printer.getResult()); // Salida: (5+(10-3))
