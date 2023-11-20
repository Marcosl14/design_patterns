class Memento {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  getSavedState(): string {
    return this.state;
  }
}

class Caretaker {
  private states: Memento[] = [];

  addMemento(m: Memento): void {
    this.states.push(m);
  }

  getMemento(index: number): Memento | undefined {
    return this.states[index];
  }
}

class Person {
  private name: string;

  saveToMemento(): Memento {
    console.log('Originator: Saving Memento...');
    return new Memento(this.name);
  }

  restoreFromMemento(m: Memento): void {
    this.name = m.getSavedState();
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}

// Testing the example
const caretaker = new Caretaker();
const person = new Person();

person.setName('Maxi');
person.setName('Juan');
caretaker.addMemento(person.saveToMemento());
person.setName('Pedro');
caretaker.addMemento(person.saveToMemento());
person.setName('Diego');

const m1 = caretaker.getMemento(0);
const m2 = caretaker.getMemento(1);

console.log(m1?.getSavedState()); // Output: "Juan"
console.log(m2?.getSavedState()); // Output: "Pedro"
