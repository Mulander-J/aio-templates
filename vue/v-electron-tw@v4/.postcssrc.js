module.exports = {
  syntax: 'postcss-less',
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 102.4, // 设定1024宽
      unitPrecision: 5,
      minPixelValue: 5, 
      propList: ['*', '!border*', '!*shadow', '!*backdrop-filter']
    }
  }
}
