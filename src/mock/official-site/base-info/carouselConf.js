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
    created_time: +Mock.Random.date('T'),
    heading: '@title(2,5)',
    sub_heading: '@title(2,5)',
    description: '@title(10,35)',
    pic: img_url[i % 5],
    enable: '@integer(0,1)'
  }))
}

export default {
  getCarousel: config => {
    const { enable, heading, page = 1, size = 10 } = param2Obj(config.url)

    const mockList = List.filter(item => {
      if (heading && !item.heading.indexOf(heading)) return false
      if (enable && enable === '-1') return true
      if (enable && item.enable + '' !== enable) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  createCarousel: () => ({
    data: 'success'
  }),
  updateCarousel: () => ({
    data: 'success'
  })
}
