package gov.dhs.conf.reservation.repos;

import gov.dhs.conf.reservation.entities.AVEquipment;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "/avEquipment", collectionResourceRel = "avEquipment")
public interface AVEquipmentRepository extends PagingAndSortingRepository<AVEquipment, Long> {}
