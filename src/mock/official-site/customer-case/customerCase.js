import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 20
const customerCaseList = []

const img_url = [
  'http://non-zero.space/zero/static/img/dm1.3b5e7bc.jpg',
  'http://non-zero.space/zero/static/img/dm4.c8ba254.jpg',
  'http://non-zero.space/zero/static/img/dm3.2232995.jpg',
  'http://non-zero.space/zero/static/img/dm2.e84475b.jpg',
  'http://non-zero.space/zero/static/img/fj2.d90b262.jpg',
  'http://non-zero.space/zero/static/img/fj1.050137d.jpg',
  'http://non-zero.space/zero/static/img/fj4.d1f2cc4.jpg',
  'http://non-zero.space/zero/static/img/fj5.dc113b1.jpg'
]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    create_time: '@datetime',
    update_time: '@datetime',
    first_heading: '@title(2,5)',
    secondary_heading: '@title(2,5)',
    tertiary_heading: '@title(3,8)',
    case_synopsis: '@title(20,45)',
    case_text: '@title(100,300)',
    'case_class|1': ['人工智能', '区块链', '大数据'],
    case_pic: img_url[i % 8],
    'is_enable|1': ['published', 'draft', 'deleted'],
    create_user: '@first'
  }))
}

for (let i = 0; i < count; i++) {
  customerCaseList.push(Mock.mock({
    name: '@first'
  }))
}

export default {
  getList: config => {
    const { status, page = 1, size = 5 } = param2Obj(config.url)
    const mockList = List.filter(item => {
      if (status && status !== '-1' && item.is_enable !== status) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },

  getCustomerCase: (config) => {
    const { id } = param2Obj(config.url)
    for (const customerCase of List) {
      if (customerCase.id === +id) {
        return customerCase
      }
    }
  },

  createCustomerCase: () => ({
    data: 'success'
  }),

  updateCustomerCase: () => ({
    data: 'success'
  }),

  searchCustomerCase: config => {
    const { name } = param2Obj(config.url)
    const mockCustomerCaseList = customerCaseList.filter(item => {
      const lowerCaseProduct = item.name.toLowerCase()
      if (name && lowerCaseProduct.indexOf(name.toLowerCase()) < 0) return false
      return true
    })
    return { items: mockCustomerCaseList }
  }
}
