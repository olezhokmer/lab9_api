module.exports = str => new Promise((resolve, reject) => {
    require('fs').appendFile(process.cwd() + "/results.xml", "<results>" + str + "</results>\n", (err, result) =>
      (err ? reject(err) : resolve(result)));
});