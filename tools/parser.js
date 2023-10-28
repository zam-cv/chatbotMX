import fs from "fs";

function parseFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf8", (err) => {
      if (err) reject(err);
      resolve();
    })
  })
}

(async () => {
  var content = await parseFile("content.txt");

  content = content.replace(/\r\n/g, "\n");
  content = content.replace(/\\/g, "\\\\");
  content = content.replace(/"/g, '\\"');
  content = content.replace(/\n/g, "\\n");
  content = content.replace(/\t/g, "\\t");
  content = content.replace(/\v/g, "\\v");
  content = content.replace(/\f/g, "\\f");
  content = content.replace(/\r/g, "\\r");
  content = content.replace(/\0/g, "\\0");
  content = content.replace(/\x08/g, "\\b");

  await writeFile("output.txt", content);
})();
