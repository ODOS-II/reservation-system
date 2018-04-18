package gov.dhs.conf.reservation.entities;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import org.springframework.data.rest.core.annotation.RestResource;

@Entity
public class Room {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private int buildingId;
  private String name;
  private int occupancy;

  @OneToMany
  @RestResource(rel = "avEquipment")
  private List<AVEquipment> avEquipment;

  public int getBuildingId() {
    return buildingId;
  }

  public void setBuildingId(final int buildingId) {
    this.buildingId = buildingId;
  }

  public String getName() {
    return name;
  }

  public void setName(final String name) {
    this.name = name;
  }

  public int getOccupancy() {
    return occupancy;
  }

  public void setOccupancy(final int occupancy) {
    this.occupancy = occupancy;
  }

  public List<AVEquipment> getAvEquipment() {
    return avEquipment;
  }

  public void setAvEquipment(final List<AVEquipment> avEquipment) {
    this.avEquipment = avEquipment;
  }
}
