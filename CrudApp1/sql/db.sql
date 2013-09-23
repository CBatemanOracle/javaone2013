drop table app.bookmarks;
create table app.bookmarks
(
	ID INT GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),
	TWEETID BIGINT DEFAULT -1,
	MESSAGE LONG VARCHAR,
	LASTSAVE DATE,
	PRIMARY KEY (ID)
)

delete from app.bookmarks;
