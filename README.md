#PostgreSQL Blogger Script

This node.js script will translate text files containing blog posts into a
script to create a PostgreSQL database with the following structure:

Table: posts
```
post_id SERIAL
post_date DATETIME
post_date_gmt DATETIME
post_content LONGTEXT
post_title TEXT
```
The text files must have the following format:

```
TITLE: Your title here
DATE: 1/9/2005

Content of the blog post here. Make sure to separate the title and date from the
blog post content with a newline.

You can have multiple paragraphs within the blog post.
```

##Setting Up

(For Mac:) Download and install the [Postgres.app][postgres-app], and follow the directions
to add the [command line tools][postgres-clt] to your path.

[postgres-app]: http://postgresapp.com/
[postgres-clt]: http://postgresapp.com/documentation/#toc_1

Make sure that Postgres.app is running.

If you don't have an existing database, create one:
> createdb my_database

Create the 'posts' table in your database:
> cat 'create_table.sql' | psql my_database
