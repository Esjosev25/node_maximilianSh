const { Product } = require('../models');
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
  try {
    const { title, imageUrl, price, description } = req.body;
    const product = await Product.create({
      title,
      imageUrl,
      price,
      description,
      userId: req.user.id,
    });
    product.save();
    logger.info(`Producto ${product.id}: ${product.title} fue añadido`, {
      controller: 'postAddProduct',
    });
    res.redirect('/');
  } catch (error) {
    logger.error(error, { controller: 'postAddProduct' });
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    const product = await Product.findByPk(prodId);
    if (!product) return res.redirect('/');
    return res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    });
  } catch (error) {
    logger.error(error, { controller: 'getEditProduct' });
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const { productId, title, price, imageUrl, description } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.redirect('/');
    product.title = title;
    product.description = description;
    product.imageUrl = imageUrl;
    product.price = price;
    product.save();
    logger.info(`Producto ${prodId}:  fue actualizado`, {
      controller: 'postEditProduct',
    });
    return res.redirect('/admin/products');
  } catch (error) {
    logger.error(error, { controller: 'postEditProduct' });
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  } catch (error) {
    logger.error(error, { controller: 'getProducts' });
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    await Product.destroy({
      where: {
        id: prodId,
      },
    });
    logger.info(`Producto ${prodId}:  fue eliminado`, {
      controller: 'postDeleteProduct',
    });
    return res.redirect('/admin/products');
  } catch (error) {
    logger.error(error, { controller: 'postDeleteProduct' });
  }
};
