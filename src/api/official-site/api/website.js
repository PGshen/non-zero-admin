import request from '@/utils/request'

export function fetchCarousel() {
  return request({
    url: '/api/official/website/carousel',
    method: 'get'
  })
}

export function fetchFirstScreen(query) {
  return request({
    url: '/api/official/website/first/screen',
    method: 'post',
    data: query
  })
}

export function fetchContact() {
  return request({
    url: '/api/official/website/contact',
    method: 'get'
  })
}

export function fetchAboutUs(query) {
  return request({
    url: '/api/official/website/about/us',
    method: 'post',
    data: query
  })
}

export function fetchCulture() {
  return request({
    url: '/api/official/website/culture',
    method: 'get'
  })
}

export function fetchNews(query) {
  return request({
    url: '/api/official/website/news',
    method: 'post',
    data: query
  })
}

export function fetchNewsDetail(id) {
  return request({
    url: '/api/official/website/news/' + id,
    method: 'get'
  })
}

export function fetchSolution(query) {
  return request({
    url: '/api/official/website/solution',
    method: 'post',
    data: query
  })
}

export function fetchSolutionDetail(id) {
  return request({
    url: '/api/official/website/solution/' + id,
    method: 'get'
  })
}

export function fetchProduct(query) {
  return request({
    url: '/api/official/website/product',
    method: 'post',
    data: query
  })
}

export function fetchProductDetail(id) {
  return request({
    url: '/api/official/website/product/' + id,
    method: 'get'
  })
}

export function fetchCustomerCase(query) {
  return request({
    url: '/api/official/website/case',
    method: 'post',
    data: query
  })
}

export function fetchCustomerCaseDetail(id) {
  return request({
    url: '/api/official/website/case/' + id,
    method: 'get'
  })
}

