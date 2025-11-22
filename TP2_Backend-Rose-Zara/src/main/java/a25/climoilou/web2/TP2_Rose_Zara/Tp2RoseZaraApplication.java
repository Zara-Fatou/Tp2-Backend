package a25.climoilou.web2.TP2_Rose_Zara;

import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.entity.Nouvelle;
import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.repository.NouvelleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class Tp2RoseZaraApplication {

    public static void main(String[] args) {
        SpringApplication.run(Tp2RoseZaraApplication.class, args);
    }
}

