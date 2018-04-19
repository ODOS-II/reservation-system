package gov.dhs.conf.reservation.service;

import gov.dhs.conf.reservation.entities.Reservation;
import gov.dhs.conf.reservation.entities.Room;
import gov.dhs.conf.reservation.entities.User;
import gov.dhs.conf.reservation.repos.ReservationRepository;
import java.time.Duration;
import java.time.LocalDateTime;
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

    boolean startReservation =
        reservationRepository.existsByRoomIdAndStartTimeBetween(room.getId(), startTime, endTime);

    boolean endReservation =
        reservationRepository.existsByRoomIdAndEndTimeBetween(room.getId(), startTime, endTime);

    return !startReservation && !endReservation;
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

    boolean startReservation =
        reservationRepository.existsByUserIdAndStartTimeBetween(user.getId(), startTime, endTime);

    boolean endReservation =
        reservationRepository.existsByUserIdAndEndTimeBetween(user.getId(), startTime, endTime);

    return startReservation || endReservation;
  }

  @Override
  public boolean meetingTimeIsValid(final Reservation reservation) {
    LocalDateTime startTime = reservation.getStartTime();
    LocalDateTime endTime = reservation.getEndTime();

    return startTime.getMinute() % 15 == 0 && endTime.getMinute() % 15 == 0;
  }
}
