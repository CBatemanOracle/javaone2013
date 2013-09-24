package service;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import model.Message;



@Path("service.MessageEntityREST")
public class MessageEntityREST {
	@PersistenceContext(unitName = "CrudApp1")
	private EntityManager entityManager;
	private Class<Message> entityClass = Message.class;
	
	/**
     * Default constructor. 
     */
    public MessageEntityREST() {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("CrudApp1");
        this.entityManager = factory.createEntityManager();
    }

	@POST
	@Consumes({"application/xml", "application/json" })
	public void createMessage(Message entity) {
		entityManager.getTransaction().begin();
		try
		{
			entity.setLastsave(new Date());
			entity.setTweetid(-1L);
			entityManager.persist(entity); 
		}
		finally
		{
			entityManager.getTransaction().commit();
		}
	}
	
	@PUT
	@Consumes({"application/xml", "application/json" })
	public void editMessage(Message entity) {
		entityManager.getTransaction().begin();
		try
		{
			entity.setLastsave(new Date());
			entityManager.merge(entity); 
		}
		finally
		{
			entityManager.getTransaction().commit();
		}
	}
	
	@GET
	@Produces({"application/xml", "application/json" })
	public List<Message> findAllMessages() {
		CriteriaQuery<Message> cquery = entityManager.getCriteriaBuilder().createQuery(entityClass);
        cquery.select(cquery.from(entityClass));
        return entityManager.createQuery(cquery).getResultList(); 
	}
	
	@DELETE
	@Path("{id}")
	public void removeMessage(@PathParam("id") long id) {
		entityManager.getTransaction().begin();
		try
		{
			entityManager.remove(entityManager.find(Message.class, Integer.valueOf((int)id))); 
		}
		finally
		{
			entityManager.getTransaction().commit();
		}
	}
	
	@GET
	@Path("{id}")
	@Produces({"application/xml", "application/json" })
	public Message findMessage(@PathParam("id") long id) {
		return entityManager.find(entityClass, Integer.valueOf((int)id)); 
	}
}
