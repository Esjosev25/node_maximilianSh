const fs = require('fs');
const path = require('path');
 const p = path.join(process.cwd(), 'data', 'products.json');
      
const getProductsFromFile = (cb) => {
  

  fs.readFile(p, (err, fileContent) => {
    if (err) 
      cb([]);
    else
    cb(JSON.parse(fileContent));
  });
};
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    getProductsFromFile((products) => {
     
      products.push(this);
      fs.writeFile(p,JSON.stringify(products), (err,fileContent)=>{
      })
    });
  }

  static fetchAll(cb) {
   getProductsFromFile(cb);

  }
};
