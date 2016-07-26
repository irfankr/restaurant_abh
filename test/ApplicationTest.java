import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import controllers.RestaurantController;
import models.Restaurant;
import org.junit.*;

import play.mvc.*;
import play.test.*;
import play.data.DynamicForm;
import play.data.validation.ValidationError;
import play.data.validation.Constraints.RequiredValidator;
import play.i18n.Lang;
import play.libs.F;
import play.libs.F.*;
import play.twirl.api.Content;

import static play.test.Helpers.*;
import static org.junit.Assert.*;


/**
 *
 * Simple (JUnit) tests that can call all parts of a play app.
 * If you are interested in mocking a whole application, see the wiki for more details.
 *
 */
public class ApplicationTest {

    /*
    @Test
    public void renderTemplate() {
        //Content html = views.html.index.render("Your new application is ready.");
        //assertEquals("text/html", html.contentType());
        //assertTrue(html.body().contains("Your new application is ready."));
    }*/

    @Test
    public void generateRestaurantsFilterSQLQueryStringNoFilter(){

        Restaurant.RestaurantsFilterDto newRestaurantFilter = new Restaurant.RestaurantsFilterDto();
        newRestaurantFilter.setPageNumber(1);
        newRestaurantFilter.setItemsPerPage(6);

        //Call function
        Restaurant.FilterRestaurantsQueryBuilderDto newRestaurantsFilterQuery = RestaurantController.FilterRestaurantsQueryBuilder(newRestaurantFilter);

        String filterSqlString = newRestaurantsFilterQuery.getSqlString();
        String filterSqlStringWithLimit = newRestaurantsFilterQuery.getSqlStringWithLimit();
        ArrayList<Object> filterParameters = newRestaurantsFilterQuery.getFilterParameters();

        //Check
        String testString = "SELECT *, st_distance_sphere(st_makepoint(?, ?), st_makepoint(rest.latitude, rest.longitude)) AS distance FROM restaurants rest ORDER BY distance ASC LIMIT 6 OFFSET 0";
        assertEquals(testString, filterSqlStringWithLimit);
    }

    @Test
    public void generateRestaurantsFilterSQLQueryStringPriceRange(){

        Restaurant.RestaurantsFilterDto newRestaurantFilter = new Restaurant.RestaurantsFilterDto();
        newRestaurantFilter.setPageNumber(1);
        newRestaurantFilter.setItemsPerPage(6);

        //Add parameters
        newRestaurantFilter.setPriceRange(2);

        //Call function
        Restaurant.FilterRestaurantsQueryBuilderDto newRestaurantsFilterQuery =
                RestaurantController.FilterRestaurantsQueryBuilder(newRestaurantFilter);

        String filterSqlString = newRestaurantsFilterQuery.getSqlString();
        String filterSqlStringWithLimit = newRestaurantsFilterQuery.getSqlStringWithLimit();
        ArrayList<Object> filterParameters = newRestaurantsFilterQuery.getFilterParameters();

        //Check
        String testString = "SELECT *, st_distance_sphere(st_makepoint(?, ?), st_makepoint(rest.latitude, rest.longitude)) AS distance FROM restaurants rest WHERE rest.priceRange = ? ORDER BY distance ASC LIMIT 6 OFFSET 0";
        assertEquals(testString, filterSqlStringWithLimit);
    }
}
