abstract class HouseBuilderTemplate {
    public final void construirCasa() {
        construirCimientos();
        construirParedes();
        construirTecho();
        amoblar();
    }

    protected abstract void construirCimientos();
    protected abstract void construirParedes();
    protected abstract void construirTecho();

    protected void amoblar() {
        System.out.println("Amoblando casa");
    }
}

public class WoodenHouse {
    @Override
    protected void construirCimientos() {
        System.out.println("Cimientos casa de madera");
    };

    @Override
    protected void construirParedes() {
        System.out.println("Paredes casa de madera");
    };

    @Override
    protected void construirTecho() {
        System.out.println("Techo casa de madera");
    };
}

public class ConcreteHouse {
    @Override
    protected void construirCimientos() {
        System.out.println("Cimientos casa de concreto");
    };

    @Override
    protected void construirParedes() {
        System.out.println("Paredes casa de concreto");
    };

    @Override
    protected void construirTecho() {
        System.out.println("Techo casa de concreto");
    };

    @Override
    protected void amoblar() {
        System.out.println("Amoblando de casa de concreto");
    };
}
