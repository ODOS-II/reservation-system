package gov.dhs.conf.reservation.repos;

import gov.dhs.conf.reservation.entities.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface RoomRepository extends CrudRepository<Room, Long> {}
