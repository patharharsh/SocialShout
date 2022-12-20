ALTER TABLE users
  ADD following integer[] SET DEFAULT array[]::integer[];

  insert into users (follower)
values ( 'ARRAY [2,3]' ) where user_id = 1;

update users set following = ARRAY []::integer[] where user_id=1;

alter table users alter column following set default ARRAY[]::integer[];

update users set follower = array_append(follower, target_id) where user_id = uid;

ALTER TABLE users   
DROP COLUMN token;  


ALTER TABLE users   
ADD COLUMN dp_path VARCHAR,  

UPDATE COMPANY SET dp_path = 15000, email= ,name= ,username= .WHERE ID = 3;

SELECT
	username,
        dp_path
FROM
	users
WHERE
	username LIKE 'q%' OR name LIKE 'q%';

CREATE TABLE comments ( 
    cmnt_id bigserial PRIMARY KEY, 
    user_id int,
    content text,
    created_on TIMESTAMP NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id  ) 
          REFERENCES users(user_id) 
);

ALTER TABLE comments ADD COLUMN post_id INT 
CONSTRAINT fposts REFERENCES posts(post_id); 

ALTER TABLE posts ADD COLUMN comments INT;

ALTER TABLE posts ALTER COLUMN comments SET DEFAULT 0;


SELECT * FROM posts where user_id IN ( select unnest(following) from users where user_id = 1);

