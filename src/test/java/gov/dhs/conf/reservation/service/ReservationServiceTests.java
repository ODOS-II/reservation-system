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

    r.setStartTime(LocalDateTime.now().withMinute(15));
    r.setEndTime(LocalDateTime.now().withMinute(15));
    assertThat(service.meetingTimeIsValid(r), is(false));
  }
}
