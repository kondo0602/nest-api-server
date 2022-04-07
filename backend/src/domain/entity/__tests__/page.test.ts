import { PagingCondition, PageSizeVO, PageNumberVO } from '../page'

describe('PageConditionのテスト', () => {
  let pagingCondition: PagingCondition

  beforeEach(() => {
    pagingCondition = new PagingCondition({
      pageSize: 10,
      pageNumber: 1,
    })
  })

  it('getPageSize()で1ページあたりの件数の取得が行えること', () => {
    expect(pagingCondition.getPageSize()).toBe(10)
  })

  it('getPageNumber()でページ番号の取得が行えること', () => {
    expect(pagingCondition.getPageNumber()).toBe(1)
  })
})

describe('PageSizeVOのテスト', () => {
  it('1以上の整数でのみインスタンスが生成できること', () => {
    expect(new PageSizeVO(1)).toBeInstanceOf(PageSizeVO)
    expect(new PageSizeVO(10)).toBeInstanceOf(PageSizeVO)
    expect(() => new PageSizeVO(0)).toThrow()
    expect(() => new PageSizeVO(-1)).toThrow()
    expect(() => new PageSizeVO(1.5)).toThrow()
  })

  it('getValue()で値の取得が行えること', () => {
    expect(new PageSizeVO(1).getValue()).toBe(1)
  })
})

describe('PageNumberVOのテスト', () => {
  it('1以上の整数でのみインスタンスが生成できること', () => {
    expect(new PageNumberVO(1)).toBeInstanceOf(PageNumberVO)
    expect(new PageNumberVO(10)).toBeInstanceOf(PageNumberVO)
    expect(() => new PageNumberVO(0)).toThrow()
    expect(() => new PageNumberVO(-1)).toThrow()
    expect(() => new PageNumberVO(1.5)).toThrow()
  })

  it('getValue()で値の取得が行えること', () => {
    expect(new PageNumberVO(1).getValue()).toBe(1)
  })
})
