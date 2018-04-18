package gov.dhs.conf.reservation.repos;

import gov.dhs.conf.reservation.entities.AVEquipment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(
  path = "/avEquipment",
  itemResourceRel = "avEquipment",
  collectionResourceRel = "avEquipment"
)
public interface AVEquipmentRepository extends CrudRepository<AVEquipment, Long> {}
