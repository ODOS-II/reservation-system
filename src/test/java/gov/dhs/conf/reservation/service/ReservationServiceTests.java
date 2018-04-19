package gov.dhs.conf.reservation.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

import gov.dhs.conf.reservation.entities.Reservation;
import java.time.LocalDateTime;
import org.junit.Test;

public class ReservationServiceTests {
  @Test
  public void testMeetingTimeIsValid() {
    ReservationService service = new ReservationServiceImpl(null);
    Reservation r = new Reservation();

    r.setStartTime(LocalDateTime.now().withMinute(0));
    r.setEndTime(LocalDateTime.now().withMinute(15));
    assertThat(service.meetingTimeIsValid(r), is(true));

    r.setStartTime(LocalDateTime.now().withMinute(0));
    r.setEndTime(LocalDateTime.now().withMinute(30));
    assertThat(service.meetingTimeIsValid(r), is(true));

    r.setStartTime(LocalDateTime.now().withMinute(0));
    r.setEndTime(LocalDateTime.now().withMinute(31));
    assertThat(service.meetingTimeIsValid(r), is(false));

    r.setStartTime(LocalDateTime.now().withMinute(1));
    r.setEndTime(LocalDateTime.now().withMinute(30));
    assertThat(service.meetingTimeIsValid(r), is(false));
  }

  @Test
  public void testMeetingLengthIsValid() {
    ReservationService service = new ReservationServiceImpl(null);
    Reservation r = new Reservation();

    LocalDateTime start = LocalDateTime.now().withMinute(0);
    r.setStartTime(start);

    r.setEndTime(start.plusHours(3));
    assertThat(service.meetingLengthIsValid(r), is(true));

    r.setEndTime(start.plusMinutes(15));
    assertThat(service.meetingLengthIsValid(r), is(true));

    r.setEndTime(start.plusHours(3).minusMinutes(1));
    assertThat(service.meetingLengthIsValid(r), is(true));

    r.setEndTime(start.plusHours(3).plusMinutes(1));
    assertThat(service.meetingLengthIsValid(r), is(false));

    r.setEndTime(start.plusMinutes(14));
    assertThat(service.meetingLengthIsValid(r), is(false));
  }

  @Test
  public void testUserHasAnotherMeeting() {}
}
