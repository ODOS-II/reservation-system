package gov.dhs.conf.reservation.repos;

import gov.dhs.conf.reservation.entities.Reservation;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ReservationRepository extends CrudRepository<Reservation, Long> {

  Optional<Reservation> findFirstByRoomIdAndStartTimeBetween(
      long room_id, LocalDateTime startTime, LocalDateTime endTime);

  Optional<Reservation> findFirstByRoomIdAndEndTimeBetween(
      final long room_id, LocalDateTime startTime, LocalDateTime endTime);

  Optional<Reservation> findFirstByUserIdAndStartTimeBetween(
      final long room_id, LocalDateTime startTime, LocalDateTime endTime);

  Optional<Reservation> findFirstByUserIdAndEndTimeBetween(
      final long room_id, LocalDateTime startTime, LocalDateTime endTime);
}
