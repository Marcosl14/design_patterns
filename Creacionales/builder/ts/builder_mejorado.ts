interface PersonObjectInterface { // agregando ésto yo garantizo que PersonObject y el Builder tengan los mismos atributos
    name: string;
    lastName: string;
    age: number;
    country: string;
    city: string;
    hobbies: string[];
}

class PersonObject implements PersonObjectInterface { // solo se utiliza para construir el objeto que luego construye la persona
    readonly name: string;
    readonly lastName: string;
    readonly age: number;
    readonly country: string;
    readonly city: string;
    readonly hobbies: string[];

    constructor(name: string,
        lastName: string,
        age: number,
        country: string,
        city: string,
        hobbies: string[]) {

        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.country = country;
        this.city = city;
        this.hobbies = hobbies;
    }
}

// Product
class Person {
    private person: PersonObject;

    constructor(person: PersonObject) {
        this.person = person;
    }

    getFullName(): string {
        return this.person.name + " " + this.person.lastName;
    }
}

// interface Builder
interface PersonBuilder {
    setName(name: string): PersonBuilder;
    setLastName(lastName: string): PersonBuilder;
    setAge(age: number): PersonBuilder;
    setCountry(country: string): PersonBuilder;
    setCity(city: string): PersonBuilder;
    addHobby(hobby: string): PersonBuilder;
    build(): Person;
}

// ConcreteBuilder
class NormalPersonBuilder implements PersonBuilder, PersonObjectInterface {
    name: string;
    lastName: string;
    age: number;
    country: string;
    city: string;
    hobbies: string[];

    constructor() {
        this.name = "";
        this.lastName = "";
        this.age = 0;
        this.country = "";
        this.city = "";
        this.hobbies = [];
    }

    reset(): void {
        this.name = "";
        this.lastName = "";
        this.age = 0;
        this.country = "";
        this.city = "";
        this.hobbies = [];
    }

    setName(name: string): PersonBuilder {
        this.name = name;
        return this;
    }

    setLastName(lastName: string): PersonBuilder {
        this.lastName = lastName;
        return this;
    }

    setAge(age: number): PersonBuilder {
        this.age = age;
        return this;
    }

    setCountry(country: string): PersonBuilder {
        this.country = country;
        return this;
    }
    setCity(city: string): PersonBuilder {
        this.city = city;
        return this;
    }

    addHobby(hobby: string): PersonBuilder {
        this.hobbies.push(hobby);
        return this;
    }

    build(): Person {
        const personObject = new PersonObject(
            this.name,
            this.lastName,
            this.age,
            this.country,
            this.city,
            this.hobbies);

        const person = new Person(personObject);
        this.reset();
        return person;
    }
}

// director
class PersonDirector {
    private personBuilder: PersonBuilder;

    constructor(personBuilder: PersonBuilder) {
        this.personBuilder = personBuilder;
    }

    setPersonBuilder(personBuilder: PersonBuilder) {
        this.personBuilder = personBuilder;
    }

    createSimplePerson(name: string, lastName: string) {
        this.personBuilder.setName(name)
            .setLastName(lastName);
    }
}

// creación 1

const personBuilder = new NormalPersonBuilder();

const hector = personBuilder.setName("Héctor")
    .setLastName("De León")
    .addHobby("Comer")
    .addHobby("Dormir")
    .build();
console.log(hector);

// creación 2
const juan = personBuilder.setName("Juan")
    .setLastName("Pérez")
    .setAge(20)
    .addHobby("Comer")
    .setCountry("México")
    .setCity("Guadalajara")
    .addHobby("Cerveza")
    .build();
console.log(juan);

// creación con director
const director = new PersonDirector(personBuilder);
director.createSimplePerson("John", "Cena");
const johnCena = personBuilder.build();

console.log(johnCena);

