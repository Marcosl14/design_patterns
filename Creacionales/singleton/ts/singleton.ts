/*
Singleton es un patrón de diseño creacional que nos permite asegurarnos de que una clase tenga una única instancia, 
a la vez que proporciona un punto de acceso global a dicha instancia.
*/

class SingletonTS {
    private static instance: SingletonTS; // muy importante que sea privado este atributo.
    // el atributo estatico pertenece a la clase y no al objeto.

    public random: number;

    private constructor() {
        this.random = Math.random();
    }

    public static getInstance(): SingletonTS {
        if (!this.instance) {

            this.instance = new SingletonTS();
        }

        return this.instance;
    }
}

const pepe = new SingletonTS(); // no nos deja porque el constructor es privado

const singleton1 = SingletonTS.getInstance();
console.log(singleton1.random);
const singleton2 = SingletonTS.getInstance();
console.log(singleton2.random);
singleton1.random = 7;
console.log(singleton1.random);
console.log(singleton2.random);

console.log(singleton1 === singleton2);
