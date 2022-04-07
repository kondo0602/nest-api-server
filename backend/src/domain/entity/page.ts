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

// リクエストに使用するページングの条件を示すクラス
export class PagingCondition {
  // 1ページあたりの件数
  private pageSize: PageSizeVO

  // 取得結果のページ番号
  private pageNumber: PageNumberVO

  constructor(props: { pageSize: number; pageNumber: number }) {
    const { pageSize, pageNumber } = props
    ;(this.pageSize = new PageSizeVO(pageSize)),
      (this.pageNumber = new PageNumberVO(pageNumber))
  }

  public getPageSize(): number {
    return this.pageSize.getValue()
  }

  public getPageNumber(): number {
    return this.pageNumber.getValue()
  }
}

export class PageSizeVO {
  private readonly _value: number

  public constructor(value: number) {
    if (value < 1 || !Number.isInteger(value)) {
      throw new Error('1ページあたりの取得件数は1以上の整数を指定してください.')
    }

    this._value = value
  }

  // public equals(pageSize: number): boolean {
  //   return this._value === pageSize
  // }

  public getValue(): number {
    return this._value
  }
}

export class PageNumberVO {
  private readonly _value: number

  public constructor(value: number) {
    if (value < 1 || !Number.isInteger(value)) {
      throw new Error('取得するページ数は1以上の整数を指定してください.')
    }

    this._value = value
  }

  // public equals(pageNumber: number): boolean {
  //   return this._value === pageNumber
  // }

  public getValue(): number {
    return this._value
  }
}
