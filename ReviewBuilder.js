const fs = require("fs");
const { readFile, produceResult } = require("./helpers");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  buildReviewsPromises() {
    return Promise.all([
      readFile("./data/products.json", "utf8"),
      readFile("./data/reviews.json", "utf8"),
      readFile("./data/users.json", "utf8"),
    ]).then((dataArray) => {
      let dataContainer = [];
      let reviewObject = {};
      dataArray.forEach((dataObject) => {
        dataContainer.push(JSON.parse(dataObject));
      });

      reviewObject.products = dataContainer[0];
      reviewObject.reviews = dataContainer[1];
      reviewObject.users = dataContainer[2];

      return produceResult(reviewObject);
    });
  }

  async buildReviewsAsyncAwait() {
    let dataArray = await Promise.all([
      readFile("./data/products.json", "utf8"),
      readFile("./data/reviews.json", "utf8"),
      readFile("./data/users.json", "utf8"),
    ]);

    let dataContainer = [];
    let reviewObject = {};

    dataArray.forEach((dataObject) => {
      dataContainer.push(JSON.parse(dataObject));
    });

    reviewObject.products = dataContainer[0];
    reviewObject.reviews = dataContainer[1];
    reviewObject.users = dataContainer[2];

    return produceResult(reviewObject);
  }
}

module.exports = ReviewBuilder;
