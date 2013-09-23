drop table app.messages;
create table app.messages
(
	ID INT GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),
	TWEETID BIGINT DEFAULT -1,
	TEXT LONG VARCHAR,
	LASTSAVE DATE,
	PRIMARY KEY (ID)
)

delete from app.messages;
