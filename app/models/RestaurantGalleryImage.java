package models;

import play.*;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.mvc.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static play.data.Form.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="restaurantgalleryimages")
public class RestaurantGalleryImage {
    @Id @GeneratedValue long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="idrestaurant")
    @JsonIgnore
    private Restaurant galleryimages;

    private String imageFileName;


    public RestaurantGalleryImage() {}

    public void save() { JPA.em().persist(this); }

    public void update() { JPA.em().merge(this); }

    public void delete() {
        JPA.em().remove(this);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Restaurant getGalleryimages() {
        return galleryimages;
    }

    public void setGalleryimages(Restaurant galleryimages) {
        this.galleryimages = galleryimages;
    }

    public String getImageFileName() {
        return imageFileName;
    }

    public void setImageFileName(String imageFileName) {
        this.imageFileName = imageFileName;
    }

    @Transactional
    public static RestaurantGalleryImage findById(long id){
        try {
            return JPA.em().find(RestaurantGalleryImage.class, id);
        } catch(NoResultException noresult) { //If there is no
            return null;
        }
    }

    public static class RestaurantGalleryImageDto {
        public long imagesNumber;
        public List<RestaurantGalleryImage> galleryImages = new ArrayList<RestaurantGalleryImage>();

        public long getImagesNumber() {
            return imagesNumber;
        }

        public void setImagesNumber(long imagesNumber) {
            this.imagesNumber = imagesNumber;
        }

        public List<RestaurantGalleryImage> getGalleryImages() {
            return galleryImages;
        }

        public void setGalleryImages(List<RestaurantGalleryImage> galleryImages) {
            this.galleryImages = galleryImages;
        }
    }

    public static class RestaurantImagesFileNamesDto {
        public long idRestaurant;
        public List<String> fileNames = new ArrayList<String>();
        public long limitImages;

        public long getIdRestaurant() {
            return idRestaurant;
        }

        public void setIdRestaurant(long idRestaurant) {
            this.idRestaurant = idRestaurant;
        }

        public List<String> getFileNames() {
            return fileNames;
        }

        public void setFileNames(List<String> fileNames) {
            this.fileNames = fileNames;
        }

        public long getLimitImages() {
            return limitImages;
        }

        public void setLimitImages(long limitImages) {
            this.limitImages = limitImages;
        }
    }

    public static class RestaurantImagesIdListDto {
        public List<Long> idList = new ArrayList<Long>();

        public List<Long> getIdList() {
            return idList;
        }

        public void setIdList(List<Long> idList) {
            this.idList = idList;
        }
    }
}
