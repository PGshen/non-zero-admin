import Mock from 'mockjs'
import { param2Obj } from '../../../utils/index'

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
    'type|1': ['ABOUT_US', 'NEWS', 'PRODUCT', 'CASE', 'SOLUTION', 'CONTACT_US', 'RECRUIT'],
    created_time: +Mock.Random.date('T'),
    heading: '@title(2,5)',
    sub_heading: '@title(2,5)',
    description: '@title(10,35)',
    pic: img_url[i % 8],
    enable: '@integer(0,1)'
  }))
}

export default {
  getFirstScreen: config => {
    const { type, page = 1, size = 10 } = param2Obj(config.url)

    const mockList = List.filter(item => {
      if (type && item.type + '' !== type) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  createFirstScreen: () => ({
    data: 'success'
  }),
  updateFirstScreen: () => ({
    data: 'success'
  })
}
