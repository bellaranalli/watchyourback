import config from "../config/index.js"

export default class CommonsUtils {
  static buildResult(opts) {
    const {
      docs,
      limit,
      totalPages,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      sort,
    } = opts
    return {
      status: 'success',
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: !hasPrevPage ? null : `${config.baseUrl}/productos?page=${prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}`,
      nextLink: !hasNextPage ? null : `${config.baseUrl}/productos?page=${nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}`,
      sort,
      sortLink: `${config.baseUrl}/productos?page=${page}&limit=${limit}&sort=${sort === 'asc' ? 'desc' : 'asc'}`
    }
  }}