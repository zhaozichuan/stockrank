package controllers;

import models.Computer;
import play.data.Form;
import play.data.FormFactory;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Results;
import repository.CompanyRepository;
import repository.ComputerRepository;
import repository.NewsRepository;

import javax.inject.Inject;
import javax.persistence.PersistenceException;
import java.util.Map;
import java.util.concurrent.CompletionStage;
import util.ResultRtn;
import play.libs.Json;
/**
 * Manage a database of computers
 */
public class TController extends Controller {

    private final NewsRepository newsRepository;
    private final FormFactory formFactory;
    private final HttpExecutionContext httpExecutionContext;

    @Inject
    public TController(FormFactory formFactory,
    					  NewsRepository newsRepository,
                          HttpExecutionContext httpExecutionContext) {
        this.newsRepository = newsRepository;
        this.formFactory = formFactory;
        this.httpExecutionContext = httpExecutionContext;
        System.out.println("--->");
    }

    /**
     * This result directly redirect to application home.
     */
    private Result GO_HOME = Results.redirect(
            routes.HomeController.list(0, "name", "asc", "")
    );

    /**
     * Handle default path requests, redirect to computers list
     */
    public Result index() {
        return GO_HOME;
    }
    
//    public Result help() {
//    	
//    	
//           return render("aaa","content"));
//         
//    	
//        
//       
//    }

   
    
    
    

//    public CompletionStage<Result> list1(int page, String sortBy, String order, String filter) {
//        // Run a db operation in another thread (using DatabaseExecutionContext)
//        return computerRepository.page(page, 10, sortBy, order, filter).thenApplyAsync(list -> {
//            // This is the HTTP rendering thread context
//            return ok(views.html.list1.render(list, sortBy, order, filter));
//        }, httpExecutionContext.current());
//    }
//    
    
    /**
     * Display the paginated list of computers.
     *
     * @param page   Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order  Sort order (either asc or desc)
     * @param filter Filter applied on computer names
     */
    public CompletionStage<Result> list1(int page, String sortBy, String order, String filter) {
        // Run a db operation in another thread (using DatabaseExecutionContext)
        return newsRepository.page(page, 20, sortBy, order, filter).thenApplyAsync(list -> {
        	
        	System.out.println("===="+list.getPageSize());
            // This is the HTTP rendering thread context
            return ok(views.html.list1.render(list, sortBy, order, filter));
        }, httpExecutionContext.current());
        
        
    }

    
    
    
    /**
     * Display the paginated list of computers.
     *
     * @param page   Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order  Sort order (either asc or desc)
     * @param filter Filter applied on computer names
     */
    public Result help1() {
            // This is the HTTP rendering thread context
           // return ok(views.html.help1.render());
    	//ok(views.html.list1.render(list, sortBy, order, filter));
              // This is the HTTP rendering thread context
           //   return ok(views.html.list1.render(newsRepository.page1(), sortBy, order, filter));
    	
    	// return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
    	 return ok(views.html.list1.render(newsRepository.page1(), "time", "desc", ""));
    }
    
    /**
     * Display the paginated list of computers.
     *
     * @param page   Current page number (starts from 0)
     * @param sortBy Column to be sorted
     * @param order  Sort order (either asc or desc)
     * @param filter Filter applied on computer names
     */
   

}