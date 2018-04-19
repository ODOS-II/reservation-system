package gov.dhs.conf.reservation.service;

import gov.dhs.conf.reservation.entities.Reservation;
import org.springframework.stereotype.Service;

@Service
public interface ReservationService {
  boolean roomIsAvailable(Reservation reservation);

  boolean meetingLengthIsValid(Reservation reservation);

  boolean userHasAnotherMeeting(Reservation reservation);

  boolean meetingTimeIsValid(Reservation reservation);
}
