interface Logger {
    String getLog();
}

class SimpleLoggerSingleton implements Logger {
    private static final SimpleLoggerSingleton instance = new SimpleLoggerSingleton(); 
    
    private SimpleLoggerSingleton() {} 

    public static SimpleLoggerSingleton getInstance() {
        return instance;
    }

    @Override
    public String getLog() {
        return "Simple log";
    }
}

abstract class LoggerDecorator implements Logger {
    protected Logger decoratedLog;

    public LoggerDecorator(Logger logger) {
        this.decoratedLog = logger;
    }

    @Override
    public String getLog() {
        return this.decoratedLog.getLog();
    }
}

class TimestampDecorator extends LoggerDecorator {
    public TimestampDecorator(Logger logger) {
        super(logger);
    }

    @Override
    public String getLog() {
        return this.decoratedLog.getLog() + " , 2023/12/19:21:43:00";
    }
}

class ErrorDecorator extends LoggerDecorator {
    public ErrorDecorator(Logger logger) {
        super(logger);
    }

    @Override
    public String getLog() {
        return this.decoratedLog.getLog() + " , error";
    }
}

class InfoDecorator extends LoggerDecorator {
    public InfoDecorator(Logger logger) {
        super(logger);
    }

    @Override
    public String getLog() {
        return this.decoratedLog.getLog() + " , info";
    }
}


public class Main {
    public static void main(String args[]) {
      Logger newSimpleLogger = SimpleLoggerSingleton.getInstance();
      Logger logWithTimestamp = new TimestampDecorator(newSimpleLogger);
      Logger errorLogWithTimestamp = new ErrorDecorator(logWithTimestamp);

      System.out.println(errorLogWithTimestamp.getLog());
    }
}

// TODO: el mensaje de log lo deberiamos pasar y que el lo reproduzca -> pensar esa logica
// errorLogWithTimestamp.getLog("mensaje")
