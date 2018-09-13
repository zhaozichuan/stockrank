package repository;

import io.ebean.Ebean;
import io.ebean.EbeanServer;
import models.News;
import play.db.ebean.EbeanConfig;
import io.ebean.PagedList;
import javax.inject.Inject;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.CompletableFuture.supplyAsync;

/**
 *
 */
public class NewsRepository {

    private final EbeanServer ebeanServer;
    private final DatabaseExecutionContext executionContext;

    @Inject
    public NewsRepository(EbeanConfig ebeanConfig, DatabaseExecutionContext executionContext) {
        this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
        this.executionContext = executionContext;
    }


    /**
     * Return a paged list of computer
     *
     * @param page     Page to display
     * @param pageSize Number of computers per page
     * @param sortBy   Computer property used for sorting
     * @param order    Sort order (either or asc or desc)
     * @param filter   Filter applied on the name column
     */
    public CompletionStage<PagedList<News>> page(int page, int pageSize, String sortBy, String order, String filter) {
        return supplyAsync(() -> {
            return ebeanServer.find(News.class).where()
                    .ilike("title", "%" + filter + "%")
                    .orderBy(sortBy + " " + order)
                    .setFirstRow(page * pageSize)
                    .setMaxRows(pageSize)
                    .findPagedList();
        } , executionContext);
    }
    
    
    public CompletionStage<PagedList<News>> page() {
        return supplyAsync(() -> {
            return ebeanServer.find(News.class).where()
                    .setMaxRows(5)
                    .findPagedList();
        } , executionContext);
    }

    
    public PagedList<News> page1() {
            return ebeanServer.find(News.class).where()
                    .setMaxRows(5)
                    .findPagedList();
    }
}
