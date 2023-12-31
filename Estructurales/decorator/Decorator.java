interface Coffee {
    String getDescription();
    double cost();
}

class SimpleCoffee implements Coffee {
    @Override
    public String getDescription() {
        return "Simple coffee";
    }

    @Override
    public double cost() {
        return 2.0;
    }
}

abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee coffe) {
        this.decoratedCoffee = coffe;
    }

    @Override
    public String getDescription() {
        return this.decoratedCoffee.getDescription();
    }

    @Override
    public double cost() {
        return this.decoratedCoffee.cost();
    }
}

class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffe) {
        super(coffe);
    }

    @Override
    public String getDescription() {
        return this.decoratedCoffee.getDescription() + ", with milk";
    }

    @Override
    public double cost() {
        return this.decoratedCoffee.cost() + 0.5;
    }
}


class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffe) {
        super(coffe);
    }

    @Override
    public String getDescription() {
        return this.decoratedCoffee.getDescription() + ", with sugar";
    }

    @Override
    public double cost() {
        return this.decoratedCoffee.cost() + 0.5;
    }
}

public class Main {
    public static void main(String args[]) {
      Coffee newSimpleCoffee = new SimpleCoffee();
      Coffee coffeWithMilk = new MilkDecorator(newSimpleCoffee);
      Coffee coffeWithSugar = new SugarDecorator(coffeWithMilk);
      Coffee coffeWithDoubleSugar = new SugarDecorator(coffeWithSugar);

      System.out.println(coffeWithDoubleSugar.cost());
      System.out.println(coffeWithDoubleSugar.getDescription());
    }
}
