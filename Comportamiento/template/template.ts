// Clase abstracta que define el Template Method
abstract class ReportTemplate {
  // El método template define la estructura del algoritmo
  public generateReport(): void {
    this.generateHeader();
    this.generateBody();
    this.generateFooter();
  }

  // Métodos abstractos que deben ser implementados por las subclases
  protected abstract generateHeader(): void;
  protected abstract generateBody(): void;
  protected abstract generateFooter(): void;
}

// Subclase que extiende la clase abstracta e implementa los métodos concretos
class PDFReport extends ReportTemplate {
  protected generateHeader(): void {
    console.log('Generando encabezado del informe PDF');
  }

  protected generateBody(): void {
    console.log('Generando cuerpo del informe PDF');
  }

  protected generateFooter(): void {
    console.log('Generando pie de página del informe PDF');
  }
}

// Otra subclase que extiende la clase abstracta e implementa los métodos concretos de manera diferente
class CSVReport extends ReportTemplate {
  protected generateHeader(): void {
    console.log('Generando encabezado del informe CSV');
  }

  protected generateBody(): void {
    console.log('Generando cuerpo del informe CSV');
  }

  protected generateFooter(): void {
    console.log('Generando pie de página del informe CSV');
  }
}

// Crear instancias de las subclases y llamar al método generateReport
const pdfReport = new PDFReport();
pdfReport.generateReport();

console.log();

const csvReport = new CSVReport();
csvReport.generateReport();
