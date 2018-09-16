import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 20
const solutionList = []

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
    solution_synopsis: '@title(20,45)',
    solution_text: '@title(100,300)',
    'solution_class|1': ['人工智能', '区块链', '大数据'],
    solution_pic: img_url[i % 8],
    'is_enable|1': ['published', 'draft', 'deleted'],
    create_user: '@first'
  }))
}

for (let i = 0; i < count; i++) {
  solutionList.push(Mock.mock({
    name: '@first'
  }))
}

export default {
  getList: config => {
    const { page = 1, size = 5 } = param2Obj(config.url)
    const mockList = List.filter(item => {
      return true
    })

    const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },

  getSolution: (config) => {
    const { id } = param2Obj(config.url)
    for (const solution of List) {
      if (solution.id === +id) {
        return solution
      }
    }
  },

  createSolution: () => ({
    data: 'success'
  }),

  updateSolution: () => ({
    data: 'success'
  }),

  searchSolution: config => {
    const { name } = param2Obj(config.url)
    const mockSolutionList = solutionList.filter(item => {
      const lowerCaseProduct = item.name.toLowerCase()
      if (name && lowerCaseProduct.indexOf(name.toLowerCase()) < 0) return false
      return true
    })
    return { items: mockSolutionList }
  }
}
