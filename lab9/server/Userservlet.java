package edu.umkc.mongorestapp;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bson.Document;
import org.bson.types.ObjectId;
import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.WriteResult;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

@WebServlet("/user")
public class Userservlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	public Userservlet() {
	super();
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Allow-Max-Age", "86400");
		
		
		String name = request.getParameter("username");
		String pass = request.getParameter("password");	
	
		JSONObject params = new JSONObject();
		params.put("username", name);
	    params.put("password", pass);
	    
		BasicDBObject user1 = new BasicDBObject(params);
	
		System.out.println(user1);
		
		MongoClientURI uri = new MongoClientURI("mongodb://root:password@ds037622.mongolab.com:37622/ase");
		MongoClient client = new MongoClient(uri);
		
		DB db = client.getDB(uri.getDatabase());		
		DBCollection collect = db.getCollection("users");
		
		
		DBCursor docs = collect.find(user1);
		response.getWriter().write(docs.toArray().toString());
	}
	
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Allow-Max-Age", "86400");
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		StringBuilder buffer = new StringBuilder();
		BufferedReader reader = request.getReader();
		String line;
		
		while ((line = reader.readLine()) != null) {
			buffer.append(line);
		}
		String data = buffer.toString();
		System.out.println(data);
		
		JSONObject params = (JSONObject) JSON.parse(data);
		BasicDBObject user1 = new BasicDBObject(params);
		
		for(Object key : params.keySet().toArray()) {
			user1.put(key.toString(), params.get(key));
		}
		
		System.out.println(user1.toJson());
		
		
		MongoClientURI uri = new MongoClientURI("mongodb://root:password@ds037622.mongolab.com:37622/ase");
		MongoClient client = new MongoClient(uri);
		
		DB db = client.getDB(uri.getDatabase());
		DBCollection users = db.getCollection("users");
		WriteResult result = users.insert(user1);

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Allow-Max-Age", "86400");

		response.getWriter().write(user1.toJson());
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String name=request.getParameter("username");
		String password=request.getParameter("newpass");
		String id=request.getParameter("id");
		
		System.out.println(name);
		System.out.println(password);
		System.out.println(id);
		
		Document idOfDocumentToUpdate = new Document("_id", new ObjectId(id));
		Document attributeToUpdate = new Document();
		attributeToUpdate.append("password", password);
		
		MongoClientURI uri = new MongoClientURI("mongodb://root:password@ds037622.mongolab.com:37622/ase");
		MongoClient client = new MongoClient(uri);
		
		MongoDatabase db = client.getDatabase(uri.getDatabase());
		MongoCollection users = db.getCollection("users");
		
		Document user = new Document(attributeToUpdate);
		users.updateOne(idOfDocumentToUpdate, new Document("$set", user));
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "PUT");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Allow-Max-Age", "86400");
		response.getWriter().write(user.toJson());
		
	}	
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id=request.getParameter("id");
		Document idOfDocumentToUpdate = new Document("_id", new ObjectId(id));
		
		MongoClientURI uri = new MongoClientURI("mongodb://root:password@ds037622.mongolab.com:37622/ase");
		MongoClient client = new MongoClient(uri);
		
		MongoDatabase db = client.getDatabase(uri.getDatabase());
		MongoCollection users = db.getCollection("users");
	
		final DeleteResult result = users.deleteOne(new Document("_id", new ObjectId(id)));
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "DELETE");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Allow-Max-Age", "86400");
		
	}
}



