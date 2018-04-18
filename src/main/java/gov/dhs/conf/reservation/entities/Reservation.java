package gov.dhs.conf.reservation.entities;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Reservation {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @ManyToOne private User user;

  private String title;

  private LocalDateTime startTime;

  private LocalDateTime endTime;

  private Room.Configuration roomConfiguration;

  public User getUser() {
    return user;
  }

  public void setUser(final User user) {
    this.user = user;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(final String title) {
    this.title = title;
  }

  public LocalDateTime getStartTime() {
    return startTime;
  }

  public void setStartTime(final LocalDateTime startTime) {
    this.startTime = startTime;
  }

  public LocalDateTime getEndTime() {
    return endTime;
  }

  public void setEndTime(final LocalDateTime endTime) {
    this.endTime = endTime;
  }

  public Room.Configuration getRoomConfiguration() {
    return roomConfiguration;
  }

  public void setRoomConfiguration(final Room.Configuration roomConfiguration) {
    this.roomConfiguration = roomConfiguration;
  }
}
