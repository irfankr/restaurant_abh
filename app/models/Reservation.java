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

    public static class UserReservationsDto {
        public String restaurantName;
        public String imageFileName; //Restaurant Image
        public long guests;
        public String reservationDate;
        public String reservationHour;

        public String getRestaurantName() {
            return restaurantName;
        }

        public void setRestaurantName(String restaurantName) {
            this.restaurantName = restaurantName;
        }

        public String getImageFileName() {
            return imageFileName;
        }

        public void setImageFileName(String imageFileName) {
            this.imageFileName = imageFileName;
        }

        public long getGuests() {
            return guests;
        }

        public void setGuests(long guests) {
            this.guests = guests;
        }

        public String getReservationDate() {
            return reservationDate;
        }

        public void setReservationDate(String reservationDate) {
            this.reservationDate = reservationDate;
        }

        public String getReservationHour() {
            return reservationHour;
        }

        public void setReservationHour(String reservationHour) {
            this.reservationHour = reservationHour;
        }
    }

    public static class CheckReservationAvalibilityNumberTimes {
        public long tablesLeft;
        public List<String> bestTime = new ArrayList<String>();
        public long idRestaurant;
        public String restaurantName;
        public String restaurantImageFilename;

        public CheckReservationAvalibilityNumberTimes() {}

        public long getTablesLeft() {
            return tablesLeft;
        }

        public void setTablesLeft(long tablesLeft) {
            this.tablesLeft = tablesLeft;
        }

        public List<String> getBestTime() {
            return bestTime;
        }

        public void setBestTime(List<String> bestTime) {
            this.bestTime = bestTime;
        }

        public void addBestTime(String bestTime){
            this.bestTime.add(bestTime);
        }

        public long getIdRestaurant() {
            return idRestaurant;
        }

        public void setIdRestaurant(long idRestaurant) {
            this.idRestaurant = idRestaurant;
        }

        public String getRestaurantName() {
            return restaurantName;
        }

        public void setRestaurantName(String restaurantName) {
            this.restaurantName = restaurantName;
        }

        public String getRestaurantImageFilename() {
            return restaurantImageFilename;
        }

        public void setRestaurantImageFilename(String restaurantImageFilename) {
            this.restaurantImageFilename = restaurantImageFilename;
        }
    }

    public static class ReservationDto {
        public long idRestaurant;
        public String people;
        public String date;
        public String hour;
        public String searchText;
        public long itemsPerPage;
        public long pageNumber;

        public long getIdRestaurant() {
            return idRestaurant;
        }

        public void setIdRestaurant(long idRestaurant) {
            this.idRestaurant = idRestaurant;
        }

        public String getPeople() {
            return people;
        }

        public void setPeople(String people) {
            this.people = people;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getHour() {
            return hour;
        }

        public void setHour(String hour) {
            this.hour = hour;
        }

        public String getSearchText() {
            return searchText;
        }

        public void setSearchText(String searchText) {
            this.searchText = searchText;
        }

        public long getItemsPerPage() {
            return itemsPerPage;
        }

        public void setItemsPerPage(long itemsPerPage) {
            this.itemsPerPage = itemsPerPage;
        }

        public long getPageNumber() {
            return pageNumber;
        }

        public void setPageNumber(long pageNumber) {
            this.pageNumber = pageNumber;
        }
    }

    public static class FreeTablesForRestaurants {
        public List<CheckReservationAvalibilityNumberTimes> restaurantsFreeTablesTimes = new ArrayList<CheckReservationAvalibilityNumberTimes>();
    }
}
