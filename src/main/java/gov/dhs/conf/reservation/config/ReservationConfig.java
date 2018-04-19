package gov.dhs.conf.reservation.config;

import gov.dhs.conf.reservation.service.ReservationService;
import gov.dhs.conf.reservation.validators.ReservationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class ReservationConfig extends RepositoryRestConfigurerAdapter {

  @Autowired private ReservationService reservationService;

  @Override
  public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener v) {
    v.addValidator("beforeCreate", new ReservationValidator(reservationService));
  }
}
