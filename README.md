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

CONTENT: Content of the blog post here.

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

##How To Use

Put the blog posts in a directory called 'posts' and omit the directory name in
the following command, or use the name of your directory of blog posts if it is
different:

> node index.js directory_containing_blog_posts/

That will generate a file with the prefix 'insert-posts' and a date-in-ms number
appended to the end to make it unique. Use that file to add your blog posts to
the database, like so:

> cat insertPosts-1426965702734.sql | psql my_database

That's it!
