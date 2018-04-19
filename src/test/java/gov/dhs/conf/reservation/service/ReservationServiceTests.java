package gov.dhs.conf.reservation.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

import gov.dhs.conf.reservation.entities.AVEquipment;
import gov.dhs.conf.reservation.entities.Reservation;
import gov.dhs.conf.reservation.entities.Room;
import gov.dhs.conf.reservation.entities.User;
import gov.dhs.conf.reservation.repos.AVEquipmentRepository;
import gov.dhs.conf.reservation.repos.ReservationRepository;
import gov.dhs.conf.reservation.repos.RoomRepository;
import gov.dhs.conf.reservation.repos.UserRepository;
import java.time.LocalDateTime;
import java.util.Collections;
import javax.annotation.PostConstruct;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ReservationServiceTests {

  private static final LocalDateTime NOW = LocalDateTime.now();

  @Autowired ReservationRepository reservationRepository;

  @Autowired UserRepository userRepository;

  @Autowired RoomRepository roomRepository;

  @Autowired AVEquipmentRepository avEquipmentRepository;

  @Autowired ReservationService reservationService;

  @PostConstruct
  public void populateTestData() {
    User user = new User();
    user.setUsername("user1");
    user.setFirstName("firstname");
    user.setLastName("lastname");
    user.setEmail("user@domain.com");
    user.setPassword("hunter2");
    user.setType(User.UserType.ADMIN);

    AVEquipment av = new AVEquipment();
    av.setName("slide projector");
    av.setActive(true);

    Room room = new Room();
    room.setBuildingId(1);
    room.setName("conference room 1");
    room.setOccupancy(10);
    room.setAvEquipment(Collections.singletonList(av));

    Reservation reservation = new Reservation();
    reservation.setUser(user);
    reservation.setRoom(room);
    reservation.setTitle("scrum");
    reservation.setStartTime(NOW);
    reservation.setEndTime(NOW.plusMinutes(30));
    reservation.setRoomConfiguration(Room.Configuration.CLASSROOM);

    userRepository.save(user);
    avEquipmentRepository.save(av);
    roomRepository.save(room);
    reservationRepository.save(reservation);
  }

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
  public void testUserHasAnotherMeeting() {
    User user = userRepository.findAll().iterator().next();
    Reservation r = new Reservation();
    r.setUser(user);

    r.setStartTime(NOW.plusMinutes(15));
    r.setEndTime(NOW.plusMinutes(45));
    assertThat(reservationService.userHasAnotherMeeting(r), is(true));

    r.setStartTime(NOW.plusMinutes(30));
    r.setEndTime(NOW.plusMinutes(45));
    assertThat(reservationService.userHasAnotherMeeting(r), is(false));
  }

  @Test
  public void testRoomIsAvailable() {
    Room room = roomRepository.findAll().iterator().next();
    Reservation r = new Reservation();
    r.setRoom(room);

    r.setStartTime(NOW.plusMinutes(15));
    r.setEndTime(NOW.plusMinutes(45));
    assertThat(reservationService.roomIsAvailable(r), is(false));

    r.setStartTime(NOW.plusMinutes(30));
    r.setEndTime(NOW.plusMinutes(45));
    assertThat(reservationService.roomIsAvailable(r), is(true));
  }
}
