 
package service;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import model.Message;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;


@Path("TwitterService")
public class TwitterService {
	/**
     * Default constructor. 
     */
    public TwitterService() {
    }


    /**
     * Retrieves representation of an instance of TwitterService
     * @return an instance of String
     */
	@GET
	@Produces("text/plain")
	public String resourceMethodGET() { 
		throw new UnsupportedOperationException();
	}

	/**
     * PUT method for updating or creating an instance of TwitterService
	 * @return 
     * @content content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
	@PUT
	@Consumes("application/xml")
	public void resourceMethodPUT(Message message) { 
		int id = message.getId();
		MessageEntityREST messageEntityREST = new MessageEntityREST();
		Message msg = messageEntityREST.findMessage(id);
		String text = msg.getText();
        TwitterFactory tf = new TwitterFactory();
        // The factory instance is re-useable and thread safe. 
        Twitter twitter = tf.getInstance();
        Status status;
        try {
			status = twitter.updateStatus(text);
			if (status != null)
			{
				long tweetId = status.getId();
				message.setTweetid(tweetId);
				messageEntityREST.editMessage(message);
			}
		} catch (TwitterException e) {
			throw new RuntimeException(e);
		}
	}
}