// Interfaz Componente base: Empleado
interface Employee {
    getSalary(): number;
}

// Componente hoja: Empleado individual
class IndividualEmployee implements Employee {
    private salary: number;

    constructor(salary: number) {
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary;
    }
}

// Componente compuesto: Gerente que puede tener subordinados (empleados individuales o gerentes)
class Manager implements Employee {
    private employees: Employee[] = [];
    private salary: number;

    constructor(salary: number) {
        this.salary = salary;
    }

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    getSalary(): number {
        let totalSalary = this.salary;
        for (const employee of this.employees) {
            totalSalary += employee.getSalary();
        }
        return totalSalary;
    }
}

// Crear la estructura de empleados
const developer1 = new IndividualEmployee(5000);
const developer2 = new IndividualEmployee(5500);
const developer3 = new IndividualEmployee(6000);

const devTeamManager = new Manager(8000);
devTeamManager.addEmployee(developer1);
devTeamManager.addEmployee(developer2);
devTeamManager.addEmployee(developer3);

const salesManager = new Manager(9000);
const salesExecutive1 = new IndividualEmployee(6000);
const salesExecutive2 = new IndividualEmployee(6500);
salesManager.addEmployee(salesExecutive1);
salesManager.addEmployee(salesExecutive2);

const ceo = new Manager(20000);
ceo.addEmployee(devTeamManager);
ceo.addEmployee(salesManager);

// Calcular el costo total de la estructura de empleados
console.log(`Costo total de la empresa: $${ceo.getSalary()}`);
