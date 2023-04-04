const models = require('../models');
const createLog = require('../config/logger');
const logger = createLog('admin');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  console.log(req.user)
  const product = await models.Product.create({
    title,
    imageUrl,
    price,
    description,
    userId: req.user.id
  });
  product.save();
  logger.info(`Producto ${product.id}: ${product.title} fue añadido`);
  res.redirect('/');
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  const product = await models.Product.findByPk(prodId);
  if (!product) return res.redirect('/');
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, title, price, imageUrl, description } =
    req.body;
  const product = await models.Product.findByPk(productId);
  if(!product)
  return res.redirect('/');
  product.title = title;
  product.description = description;
  product.imageUrl = imageUrl;
  product.price = price;
  product.save();
  logger.info(`Producto ${prodId}:  fue actualizado`);
  res.redirect('/admin/products');
};

exports.getProducts = async (req, res, next) => {
  const products = await models.Product.findAll();
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products',
  });
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  await models.Product.destroy({
    where: {
      id: prodId,
    },
  });
  logger.info(`Producto ${prodId}:  fue eliminado`);
  res.redirect('/admin/products');
};
