package models;

import play.*;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.mvc.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

import static play.data.Form.*;
import java.util.*;
import java.util.Date;

@Entity
@Table(name="reservations")
public class Reservation {
    @Id @GeneratedValue long id;
    private long idTable;
    private long idUser;
    private long persons;
    private Date reservationDateTime;

    public Reservation() {}

    public long getId() {
        return id;
    }

    public long getIdTable() {
        return idTable;
    }

    public void setIdTable(long idTable) {
        this.idTable = idTable;
    }

    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public long getPersons() {
        return persons;
    }

    public void setPersons(long persons) {
        this.persons = persons;
    }

    public Date getReservationDateTime() {
        return reservationDateTime;
    }

    public void setReservationDateTime(Date reservationDateTime) {
        this.reservationDateTime = reservationDateTime;
    }

    public void save() { JPA.em().persist(this); }

    public void update() { JPA.em().merge(this); }

    public void delete() {
        JPA.em().remove(this);
    }
}
