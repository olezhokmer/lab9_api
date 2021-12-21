module.exports = xml => new Promise((resolve, reject) => {
    require('xml2js').parseString(xml, (err, result) =>
      (err ? reject(err) : resolve(result)));
});