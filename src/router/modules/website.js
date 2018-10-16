import Layout from '@/views/official-website/Layout'

const websiteRouter = {
  path: '/website',
  component: Layout,
  redirect: '/website/index',
  name: 'official-website',
  meta: {
    title: 'officialWebsite',
    icon: 'web-info'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/official-website/index/index'),
      name: 'index',
      meta: { title: 'index' }
    },
    {
      path: 'news/enterprise',
      component: () => import('@/views/official-website/news/enterprise'),
      name: 'enterprise',
      meta: { title: 'enterprise' }
    },
    {
      path: 'news/industry',
      component: () => import('@/views/official-website/news/industry'),
      name: 'industry',
      meta: { title: 'industry' }
    },
    {
      path: 'news/detail/:id',
      component: () => import('@/views/official-website/news/detail'),
      name: 'detail',
      meta: { title: 'detail' }
    },
    {
      path: 'about/contact',
      component: () => import('@/views/official-website/about-us/contact'),
      name: 'contact',
      meta: { title: 'contact' }
    },
    {
      path: 'about/culture',
      component: () => import('@/views/official-website/about-us/culture'),
      name: 'culture',
      meta: { title: 'culture' }
    },
    {
      path: 'about/introduction',
      component: () => import('@/views/official-website/about-us/introduction'),
      name: 'introduction',
      meta: { title: 'introduction' }
    },
    {
      path: 'business/product',
      component: () => import('@/views/official-website/business/product'),
      name: 'products',
      meta: { title: 'product' }
    },
    {
      path: 'business/solution',
      component: () => import('@/views/official-website/business/solution'),
      name: 'solutions',
      meta: { title: 'solution' }
    },
    {
      path: 'business/customerCase',
      component: () => import('@/views/official-website/business/customerCase'),
      name: 'customerCases',
      meta: { title: 'customerCase' }
    },
    {
      path: 'business/:type/detail/:id',
      component: () => import('@/views/official-website/business/detail'),
      name: 'businessDetail',
      meta: { title: 'businessDetail' }
    },
    {
      path: 'recruitment/index',
      component: () => import('@/views/official-website/recruitment/index'),
      name: 'recruitment',
      meta: { title: 'recruitment' }
    }
  ]
}

export default websiteRouter
