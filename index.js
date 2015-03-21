var fs = require('fs');

/**
 * forEachFileIn
 *   finds all files in the given directory, reads their contents, and passes
 *   it to the callback.
 * @param {String} directory
 * @paran {Function} callback
 */
var forEachFileIn = function(directory, callback) {
  console.log('Starting to read files in ' + directory);
  var files = fs.readdirSync(directory);
  files.forEach(function(file) {
    var data = fs.readFileSync(directory + file, { encoding: 'utf8' });
    console.log('Read "' + file + '" successfully!');
    callback(data);
  });
  console.log('Done reading files in ' + directory);
};

/**
 * parseBlogPost
 * @param {String} data
 * @return {Object}
 * @example
 *   {
 *     post_title: 'My Blog Post',
 *     post_content: 'Foo bar baz',
 *     post_date: '9/1/1999'
 *   }
 */
var parseBlogPost = function(data) {
  var postTitle = data.match(/TITLE: (.+)/)[1];
  var postDate = data.match(/DATE: (.+)/)[1];
  var postContent = data.match(/CONTENT: ([\s\S]+)/)[1];

  if (!postTitle || !postDate || !postContent) {
    throw new Error("Missing data for blog post!")
  }

  return {
    post_title: postTitle,
    post_content: postContent,
    post_date: postDate
  };
};

/**
 * createSQLInsertStatement
 * @param {Object} postObject
 * @return {String}
 */
var createSQLInsertStatement = function(postObject) {
  return "insert into posts (post_date, post_date_gmt, post_content, post_title)\n"
  + "  values (\n" +
  "    to_date('" + postObject.post_date + "', 'YYYY-MM-DD'),\n" +
  "    to_date('" + postObject.post_date + "', 'YYYY-MM-DD'),\n" +
  "    '" + postObject.post_content + "',\n" +
  "    '" + postObject.post_title + "'\n" +
  '  );\n\n';
};

/**
 * buildSQLScript
 *   - Uses command line argument or 'posts/' directory
 *   - Reads post text files
 *   - Conversts post text files into values for db
 *   - Creates series of SQL 'insert' commands
 *   - Writes the series of commands into an output file.
 */
var buildSQLScript = function() {
  var directory = (process.argv[2].length) ? process.argv[2] : 'posts/';
  var sqlStatements = [];
  forEachFileIn(directory, function(data) {
    var postObject = parseBlogPost(data);
    var sqlInsertStatement = createSQLInsertStatement(postObject);
    sqlStatements.push(sqlInsertStatement);
  });

  fs.writeFileSync('insertPosts-' + Date.now() + '.sql', sqlStatements.join(''));
};

buildSQLScript();
