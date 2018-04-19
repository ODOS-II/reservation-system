package gov.dhs.conf.reservation.service;

import gov.dhs.conf.reservation.entities.Reservation;
import gov.dhs.conf.reservation.entities.Room;
import gov.dhs.conf.reservation.entities.User;
import gov.dhs.conf.reservation.repos.ReservationRepository;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationServiceImpl implements ReservationService {

  private static final Duration MIN_MEETING_LENGTH = Duration.ofMinutes(15);
  private static final Duration MAX_MEETING_LENGTH = Duration.ofHours(3);

  private ReservationRepository reservationRepository;

  @Autowired
  public ReservationServiceImpl(final ReservationRepository reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  @Override
  public boolean roomIsAvailable(final Reservation reservation) {
    Room room = reservation.getRoom();

    LocalDateTime startTime = reservation.getStartTime();
    LocalDateTime endTime = reservation.getEndTime();

    Optional<Reservation> start =
        reservationRepository.findFirstByRoomIdAndStartTimeBetween(
            room.getId(), startTime, endTime);
    Optional<Reservation> end =
        reservationRepository.findFirstByRoomIdAndEndTimeBetween(room.getId(), startTime, endTime);

    if (start.isPresent()) {
      Reservation startReservation = start.get();
      if (isBetween(startReservation.getStartTime(), startTime, endTime, true)) {
        return false;
      }
    }

    if (end.isPresent()) {
      Reservation endReservation = end.get();
      if (isBetween(endReservation.getEndTime(), startTime, endTime, false)) {
        return false;
      }
    }

    return true;
  }

  @Override
  public boolean meetingLengthIsValid(final Reservation reservation) {
    LocalDateTime startTime = reservation.getStartTime();
    LocalDateTime endTime = reservation.getEndTime();
    long length = Duration.between(startTime, endTime).toMillis();

    return length >= MIN_MEETING_LENGTH.toMillis() && length <= MAX_MEETING_LENGTH.toMillis();
  }

  @Override
  public boolean userHasAnotherMeeting(final Reservation reservation) {
    User user = reservation.getUser();

    LocalDateTime startTime = reservation.getStartTime();
    LocalDateTime endTime = reservation.getEndTime();

    Optional<Reservation> start =
        reservationRepository.findFirstByUserIdAndStartTimeBetween(
            user.getId(), startTime, endTime);
    Optional<Reservation> end =
        reservationRepository.findFirstByUserIdAndEndTimeBetween(user.getId(), startTime, endTime);

    if (start.isPresent()) {
      Reservation startReservation = start.get();
      if (isBetween(startReservation.getStartTime(), startTime, endTime, true)) {
        return true;
      }
    }

    if (end.isPresent()) {
      Reservation endReservation = end.get();
      if (isBetween(endReservation.getEndTime(), startTime, endTime, false)) {
        return true;
      }
    }

    return false;
  }

  @Override
  public boolean meetingTimeIsValid(final Reservation reservation) {
    LocalDateTime startTime = reservation.getStartTime();
    LocalDateTime endTime = reservation.getEndTime();

    return startTime.getMinute() % 15 == 0 && endTime.getMinute() % 15 == 0;
  }

  private boolean isBetween(
      LocalDateTime date, LocalDateTime start, LocalDateTime end, boolean inclusive) {
    return (inclusive && date.equals(start)) || (date.isAfter(start) && date.isBefore(end));
  }
}
