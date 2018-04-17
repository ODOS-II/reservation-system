FROM openjdk:8-jre

ENTRYPOINT ["/usr/bin/java", "-jar", "/usr/share/reservation-system/reservation-system.jar"]

ARG JAR_FILE
ADD target/${JAR_FILE} /usr/share/reservation-system/reservation-system.jar
