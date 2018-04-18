package gov.dhs.conf.reservation.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AVEquipment {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String name;
  private Boolean active;

  public String getName() {
    return name;
  }

  public void setName(final String name) {
    this.name = name;
  }

  public Boolean getActive() {
    return active;
  }

  public void setActive(final Boolean active) {
    this.active = active;
  }
}
