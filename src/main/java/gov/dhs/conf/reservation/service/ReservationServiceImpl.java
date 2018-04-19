package gov.dhs.conf.reservation.service;

import gov.dhs.conf.reservation.entities.Reservation;
import gov.dhs.conf.reservation.repos.ReservationRepository;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import org.springframework.beans.factory.annotation.Autowired;

public class ReservationServiceImpl implements ReservationService {

  private ReservationRepository reservationRepository;

  @Autowired
  public ReservationServiceImpl(final ReservationRepository reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  @Override
  public boolean roomIsAvailable(final Reservation reservation) {
    return false;
  }

  @Override
  public boolean meetingLengthIsValid(final Reservation reservation) {
    return false;
  }

  @Override
  public boolean userHasAnotherMeeting(final Reservation reservation) {
    return false;
  }

  @Override
  public boolean meetingTimeIsValid(final Reservation reservation) {
    LocalDateTime startTime = reservation.getStartTime();
    LocalDateTime endTime = reservation.getEndTime();
    long length = startTime.until(endTime, ChronoUnit.MINUTES);

    return length >= 15 && startTime.getMinute() % 15 == 0 && endTime.getMinute() % 15 == 0;
  }
}
