public class Singleton {
    // final significa readonly en TS
    // atributo estatico porque el metodo estatico solo puede devolver atributos estaticos
    private static final Singleton instance = new Singleton(); 
    

    // constructor privado
    private Singleton() {} 

    // metodo estatico
    public static Singleton getInstance() {
        return instance;
    }
}

// U otra manera: con lazy loading (solo crea la instancia si es necesario) ->

public class Singleton {
    private static final Singleton instance;

    private Singleton() {} // constructor privado

    // metodo estatico
    // synchronized porque java es multithread, y podria haber colisiones si vienen varias peticiones al mismo tiempo
    public static synchronized Singleton getInstance() { 
        if(instance == null) {
            try {
                instance = new Singleton();
            } catch (Exception e) {
                throw new RuntimeException("Ocurrio un Error");
            }
        }
        return instance;
    }
}
