const createLog = require('../config/logger');
const { Product, Cart, CartItem, Order, OrderItem } = require('../models');
const logger = createLog('shop');
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  } catch (error) {
    logger.error(error, { controller: 'getProducts' });
  }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findByPk(prodId);
  res.render('shop/product-detail', {
    product: product,
    pageTitle: product.title,
    path: '/products',
  });
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  } catch (error) {
    logger.error(error, { controller: 'getIndex' });
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        state: false,
      },
      order: [['createdAt', 'DESC']],
    });
    let products = [];
    if (cart) products = await cart.getProducts();
    return res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products,
    });
  } catch (error) {
    logger.error(error);
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;

    let cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        state: false,
      },
      order: [['createdAt', 'DESC']],
    });

    if (!cart)
      cart = await req.user.createCart({
        state: false,
      });
    [isProductAdded] = await cart.getProducts({ where: { id: prodId } });

    if (!isProductAdded) {
      const product = await Product.findByPk(prodId);
      await cart.addProduct(product, { through: { quantity: 1 } });
    } else {
      const product = isProductAdded;
      const oldQty = product.cartItem.quantity;

      await product.cartItem.update({ quantity: oldQty + 1 });
      await product.cartItem.save();
    }

    return res.redirect('/cart');
  } catch (error) {
    logger.error(error, { controller: 'postCart' });
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    let cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        state: false,
      },
      order: [['createdAt', 'DESC']],
    });

    let cartItem = await CartItem.findOne({
      where: {
        productId: prodId,
        cartId: cart.id,
      },
    });
    await cartItem.destroy();
    return res.redirect('/cart');
  } catch (error) {
     logger.error(error, { controller: 'postCartDeleteProduct' });
  }
};

exports.getOrders = async (req, res, next) => {
  const user = req.user;
  const orders =await user.getOrders({
    include: [{model:Product}],
    order: [
      ['createdAt', 'DESC'],
      ['state', 'DESC'],
    ],
  });
  return res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
    orders
  });
};

exports.postOrders = async (req, res, next) => {
  try {
    const user = req.user;
    const cart = await user.getCart({
      where: { state: false },
      order: [['createdAt', 'DESC']],
    });
    const products = await cart.getProducts();
    const order = await user.createOrder({ state: false });
    order.addProducts(
      products.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );
    await order.save();
    await cart.update({ state: true });
    await cart.save();
    return res.redirect('/orders');
  } catch (error) {
     logger.error(error, { controller: 'postOrders' });
  }
  
};
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
