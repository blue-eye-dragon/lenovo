module.exports = file => () => {
  return import ('@/' + file) //引入 file 文件中的模块
}
