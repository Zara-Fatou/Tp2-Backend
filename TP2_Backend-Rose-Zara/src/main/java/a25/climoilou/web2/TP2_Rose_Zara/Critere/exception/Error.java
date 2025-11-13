package a25.climoilou.web2.TP2_Rose_Zara.Critere.exception;

public class Error {
    private String message;

    public Error(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
