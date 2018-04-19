package gov.dhs.conf.reservation.validators;

import gov.dhs.conf.reservation.entities.Reservation;
import gov.dhs.conf.reservation.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class ReservationValidator implements Validator {

  private ReservationService reservationService;

  @Autowired
  public ReservationValidator(final ReservationService reservationService) {
    this.reservationService = reservationService;
  }

  @Override
  public boolean supports(final Class<?> clazz) {
    return Reservation.class.equals(clazz);
  }

  @Override
  public void validate(final Object target, final Errors errors) {
    Reservation r = (Reservation) target;

    if (!reservationService.roomIsAvailable(r)) {
      //
    }

    if (!reservationService.meetingLengthIsValid(r)) {
      //
    }

    if (!reservationService.userHasAnotherMeeting(r)) {
      //
    }

    if (!reservationService.meetingTimeIsValid(r)) {
      //
    }
  }
}
