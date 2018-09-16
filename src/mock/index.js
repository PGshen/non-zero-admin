import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import carouselConfAPI from './official-site/base-info/carouselConf'
import firstScreenConfAPI from './official-site/base-info/firstScreenConf'
import product from './official-site/product/product'
import solution from './official-site/solution/solution'
import customerCase from './official-site/customer-case/customerCase'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)
Mock.mock(/\/search\/product/, 'get', product.searchProduct)
Mock.mock(/\/search\/solution/, 'get', solution.searchSolution)
Mock.mock(/\/search\/customer-case/, 'get', customerCase.searchCustomerCase)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 轮播图
Mock.mock(/\/base-info\/carousel\/list/, 'get', carouselConfAPI.getCarousel)
Mock.mock(/\/base-info\/carousel\/create/, 'post', carouselConfAPI.createCarousel)
Mock.mock(/\/base-info\/carousel\/update/, 'post', carouselConfAPI.updateCarousel)

// 首屏
Mock.mock(/\/base-info\/first-screen\/list/, 'get', firstScreenConfAPI.getFirstScreen)
Mock.mock(/\/base-info\/first-screen\/create/, 'post', firstScreenConfAPI.createFirstScreen)
Mock.mock(/\/base-info\/first-screen\/update/, 'post', firstScreenConfAPI.updateFirstScreen)

// 产品
Mock.mock(/\/official-site\/product\/list/, 'get', product.getList)
Mock.mock(/\/official-site\/product\/detail/, 'get', product.getProduct)
Mock.mock(/\/official-site\/product\/create/, 'get', product.createProduct)
Mock.mock(/\/official-site\/product\/update/, 'get', product.updateProduct)

// 解决方案
Mock.mock(/\/official-site\/solution\/list/, 'get', solution.getList)
Mock.mock(/\/official-site\/solution\/detail/, 'get', solution.getSolution)
Mock.mock(/\/official-site\/solution\/create/, 'get', solution.createSolution)
Mock.mock(/\/official-site\/solution\/update/, 'get', solution.updateSolution)

// 客户案例
Mock.mock(/\/official-site\/customer-case\/list/, 'get', customerCase.getList)
Mock.mock(/\/official-site\/customer-case\/detail/, 'get', customerCase.getCustomerCase)
Mock.mock(/\/official-site\/customer-case\/create/, 'get', customerCase.createCustomerCase)
Mock.mock(/\/official-site\/customer-case\/update/, 'get', customerCase.updateCustomerCase)

export default Mock
