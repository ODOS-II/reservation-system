package gov.dhs.conf.reservation.repos;

import gov.dhs.conf.reservation.entities.Reservation;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ReservationRepository extends CrudRepository<Reservation, Long> {
  List<Reservation> findAllByUserId(long userId);

  boolean existsByRoomIdAndStartTimeBetween(
      long roomId, LocalDateTime startTime, LocalDateTime endTime);

  boolean existsByRoomIdAndEndTimeBetween(
      long roomId, LocalDateTime startTime, LocalDateTime endTime);

  boolean existsByUserIdAndStartTimeBetween(
      long userId, LocalDateTime startTime, LocalDateTime endTime);

  boolean existsByUserIdAndEndTimeBetween(
      long userId, LocalDateTime startTime, LocalDateTime endTime);
}
