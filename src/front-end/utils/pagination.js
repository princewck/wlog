export default function (data) {
  return {
    totalPages: data && data.totalPages,
    currentPage: data && data.currentPage,
    total: data && data.totalCount,
  }
}