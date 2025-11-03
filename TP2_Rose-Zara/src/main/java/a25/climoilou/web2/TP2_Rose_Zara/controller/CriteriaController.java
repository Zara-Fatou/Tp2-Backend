package a25.climoilou.web2.TP2_Rose_Zara.controller;


import a25.climoilou.web2.TP2_Rose_Zara.repository.CitereRepository;
import a25.climoilou.web2.TP2_Rose_Zara.validation.CriteriaValidateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class CriteriaController {

    private Logger log = LoggerFactory.getLogger(CriteriaController.class);

    @Autowired
    private CitereRepository critereRepository;

    @Autowired
    private CriteriaValidateur criteriaValidateur;




}
