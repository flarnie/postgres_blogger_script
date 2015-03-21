CREATE TABLE posts
  (post_id serial,
   post_date date not null,
   post_date_gmt date not null,
   post_content text,
   post_title character(150)
  );
