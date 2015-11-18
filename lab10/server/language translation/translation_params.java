package com.ibm.watson.developer_cloud.language_translation.v2;

import java.net.URL;
import java.net.URLEncoder;
import org.xml.sax.SAXException;

import com.ibm.watson.developer_cloud.language_translation.v2.model.TranslationResult;
import com.ibm.watson.developer_cloud.visual_recognition.v1.model.LabelSet;
import com.ibm.watson.developer_cloud.visual_recognition.v1.model.VisualRecognitionImages;

import org.apache.commons.io.FileUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Document;
import java.io.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

@Path("/translate")
public class translation_params {
	public static final String OUTPUT_XML = "json";// change the format here
	private String outputMode = OUTPUT_XML;
//	private String url;
//	
//	public String getUrl() {
//		System.out.println("Get Url is" + url);
//		return url;
//	}
//
//	public void setUrl(String url) {
//		this.url = url;
//		System.out.println("setUrl is " + url);
//	}


	public String getOutputMode() {
		return outputMode;
	}
		
	
	@GET
	@Path("/{source}/{target}/{text}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Response data(@PathParam("source") String Source, @PathParam("target") String Target, @PathParam("text") String Text)
			throws JSONException, XPathExpressionException, IOException, SAXException, ParserConfigurationException {
		System.out.println("Source language is" + Source);
		System.out.println("Target language is" + Target);
		System.out.println("Text is" + Text);
		LanguageTranslation service = new LanguageTranslation();
		service.setUsernameAndPassword("d2d05dfd-8dde-4caa-b5db-c9f77e981c44", "dLIpSpKI28gO");
		
		
		 TranslationResult obj = null;
		
		obj = service.translate(Text, Source, Target);
		System.out.println("object is:" + obj);

		JSONObject object = new JSONObject(obj);

		return Response.ok(object.toString()).header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
				.header("Access-Control-Allow-Credentials", "true")
				.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
				.header("Access-Control-Max-Age", "1209600").build();
	}




	public String getParameterString() {
		String retString = "";
		if (outputMode != null)
			retString += "&outputMode=" + outputMode;
		return retString;
	}
}