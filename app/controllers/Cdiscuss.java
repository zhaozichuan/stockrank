package controllers;

import play.db.ebean.EbeanConfig;
import play.libs.Json;
import models.Discuss;
import models.ResultData;
import models.User;
import play.mvc.Controller;
import play.mvc.Result;
import repository.DatabaseExecutionContext;
import util.ResultRtn;

import java.util.ArrayList;
import java.util.Base64.Decoder;
import java.util.List;

import javax.inject.Inject;

import io.ebean.Ebean;
import io.ebean.EbeanServer;

public class Cdiscuss extends Controller {

	public class MystockView {

		public String stockCode;
		public String stockName;

	}

	private final EbeanServer ebeanServer;

	@Inject
	public Cdiscuss(EbeanConfig ebeanConfig, DatabaseExecutionContext executionContext) {
		this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
	}

	/**
	 * An action that responds with the {@link Counter}'s current count. The result
	 * is plain text. This action is mapped to <code>GET</code> requests with a path
	 * of <code>/count</code> requests by an entry in the <code>routes</code> config
	 * file.
	 */

	public Result addDis(String mid,String title,String content,String userid) {

		ResultRtn resultRtn = new ResultRtn();
		//List<Discuss> sc = ebeanServer.find(User.class).where().eq("name", name).findList();
		int usercount =ebeanServer.find(User.class).where().eq("id", userid).findCount();
	    	if(usercount<=0) {
	    		resultRtn.errCode = 1;
	    		resultRtn.msg ="user is not exsist";
	    		return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
	    	
	    		
	    	}
	    	
	   Discuss  disobj =new Discuss(); 	
	   disobj.title = title;
	   disobj.content = content;
	   disobj.userid = Integer.parseInt(userid);
	   
	   disobj.save();
		

		resultRtn.errCode = 0;
		resultRtn.msg = "ok";

		return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
		// return ok("--->"+Stock.find.query("code").findUnique().name);

	}
	
	
	public Result disList(String mid,int max) {
        
		ResultRtn resultRtn = new ResultRtn();
		//List<Discuss> sc = ebeanServer.find(User.class).where().eq("name", name).findList();
		//List<Discuss> Disobj_list = new arrayList();
		
		
		List Disobj_list =ebeanServer.find(Discuss.class).where()
				                                      .setMaxRows(max)
				                                      .findList();
	    	if(Disobj_list.size()<=0) {
	    		resultRtn.errCode = 1;
	    		resultRtn.msg ="return 0 result";
	    		return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
	    	
	    		
	    	}
	    	

	    	     
	   
//	   disobj.title = title;
//	   disobj.content = content;   
//	   disobj.userid = Integer.parseInt(userid);
//	   
//	   disobj.save();
//		

		resultRtn.errCode = 0;
		resultRtn.msg = "ok";
		resultRtn.business.put("discuss", Disobj_list);
		return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
		// return ok("--->"+Stock.find.query("code").findUnique().name);

	}

	
}
