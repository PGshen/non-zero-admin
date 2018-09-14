import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 20

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
    product_synopsis: '@title(20,45)',
    product_text: '@title(100,300)',
    'product_class|1': ['人工智能', '区块链', '大数据'],
    product_pic: img_url[i % 8],
    is_enable: '@integer(0,1)',
    create_user: '@first'
  }))
}

export default {
  getProduct: config => {
    const { page = 1, size = 5 } = param2Obj(config.url)
    const mockList = List.filter(item => {
      return true
    })

    const pageList = mockList.filter((item, index) => index < size * page && index > size * (page - 1))

    return {
      total: pageList.length,
      items: pageList
    }
  },

  createProduct: () => ({
    data: 'success'
  }),

  updateProduct: () => ({
    data: 'success'
  })
}
