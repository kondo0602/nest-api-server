export type Page<T> = {
  // ページングされたエンティティ
  items: Array<T>

  // ページングに関する情報
  paging: Paging
}

export type Paging = {
  // 指定した条件に該当する全件数
  totalCount: number

  // 1ページあたりの件数
  pageSize: number

  // 取得結果のページ番号
  pageNumber: number
}
