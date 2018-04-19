package gov.dhs.conf.reservation.service;

import gov.dhs.conf.reservation.entities.Reservation;

public interface ReservationService {
  boolean roomIsAvailable(Reservation reservation);

  boolean meetingLengthIsValid(Reservation reservation);

  boolean userHasAnotherMeeting(Reservation reservation);

  boolean meetingTimeIsValid(Reservation reservation);
}
