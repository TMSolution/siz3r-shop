import fs from "fs";

const resultFolder = "./public/images";

const json = JSON.parse(fs.readFileSync("./arr.json", "utf-8"));
console.debug(json[0]);
json.forEach(async (element) => {
  element.images.forEach(async (image) => {
    var filename = image.split("/").pop();
    if (filename.endsWith(".jpg")) {
      await fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
          const destination = `${resultFolder}/${filename}`;
          blob
            .arrayBuffer()
            .then((arrayBuffer) =>
              fs.writeFileSync(destination, Buffer.from(arrayBuffer))
            );
        });
      console.debug(filename);
    }
  });
});
