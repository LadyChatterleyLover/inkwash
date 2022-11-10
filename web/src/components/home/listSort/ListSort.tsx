import { useState, useEffect } from 'react'
import { Doc } from '@/types'
import cloneDeep from 'lodash/cloneDeep'
import Setting from '../setting/Setting'

interface Props {
  list: Doc[]
  getList: () => void
}
const ListSort = (props: Props) => {
  const { list, getList } = props
  const [docList, setDocsList] = useState<Doc[]>(cloneDeep(list))
  const [current, setCurrent] = useState<Doc | null>(null)

  useEffect(() => {
    setDocsList(cloneDeep(list))
  }, [list])

  const setShowSetting = (item: Doc, isShow: boolean) => {
    item.showSetting = isShow
    setCurrent(isShow ? item : null)
    setDocsList([...docList])
  }

  return (
    <div className='flex items-center flex-wrap mt-3'>
      {docList.map((item) => {
        return (
          <div
            key={item._id}
            className='relative px-[28px] py-[14px] cursor-pointer hover:bg-[#f3f3f3] hover:rounded-sm'
            onMouseEnter={() => setShowSetting(item, true)}
            onMouseLeave={() => setShowSetting(item, false)}
          >
            <div className='cursor-pointer  flex justify-center items-center'>
              {item.type === 'docs' ? (
                <img
                  src='data:image/png;base64,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'
                  alt=''
                  style={{
                    width: 80,
                    height: 80,
                  }}
                ></img>
              ) : null}
              {item.type === 'sheet' ? (
                <img
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAXVBMVEUAAAAAAADA0MTd7uHQ4dQAAADa697O39LZ6t0AAADX6NvV5tnT5NfG1cnJ2M2/z8PQ0ND4+Pj09PTt7e36+vrq6ur////x8fHf39/h4eHc3Nzl5eXa2toAAAAAAADxNh2oAAAAH3RSTlMABP///wr///8N/////////////////////////xUaA5Py7gAABDBJREFUeAHswTEBAAAAATD6l1bCuS0AAAAAAADw0TFXBioKxDAQBbcmMe3k/v9vjzhEEPe6gvTWocQAAzwnCXuyjvkup4qEc8BtV22biYbPLW8AXi+b7EllrieDsdyfiaWyqh1ou1wPAW+fA5IukQqSegfwth6QUNVXetnJVwBSzI6Vvyb/nKB3mxq8925ETMK9EbsPXweoGH8aEmogAK0FzCqmbEoKIHwRoCFiOuIBEYe7MEKTlx3sGGahiwBHOHxqgPeWljva3ogVWVclGCrR5oARUE86q/I8Yo2FR+KIQNg0YhH+B8K9XvHIBHtbA9ii944+TVDEMZwLyFNWcpag7rEGkNGo2gwQgLrUkbxesadFfQ2gHRkeqg3MRsWe5YuO5E2DVTGpBOX8T90+IykzQZGvAnxkaPkqQfkmQGbGTtl/mOBP09PUfpmxA9RGjiCMwlfYl/6U8Uq+/zlDTGgGEOzKHmfr75lmAAOPV9XtQr8D+KO/nmV5HiIsqCqlJ7n1i/z94zsAIS0lUvaaAohFEqpSlQwADJaUKlFJ57T+ZIktkKBIZVKJS6SoKpVMAURKZ9QhJcaKIEmqlAwBRKISRWWGwbRIClVJKpnTg0gJSakyo8RJSarsV8mEHhQkRIo5BglCZ4WUbwE8jhPgr/K2futPbrd1+/f9+Pr4PuV4DfB4e3vNYABKqlL6plO8bi8CIiJElErk+hKv1wEhkiISVY0BFESqvX8H4M8XAUNEkqKKIdfMTmdQFZkDGEmbjjLK4JlTlWYZDMl+Ms5gkVDaBmUCYEKykRhm8EknLoMAOwtU+5C4EvD4+ilGQteXeN3fHp8HDJFQlasBb+u4Xz4PfuT233Y7z4evzIN7ILx9pcQSSEmrcqHB4/325VMcJSpLJckVgI/3+8+vnWKRSGqVMuseDCWySCVDAM906WxQMsEgEGUlZY5BSNugkkom9aCIlmw4mdGDkiKrSkYZ3CkrUWnHgB6khFOJ7TXAYECWiEyYZthJSitVco3BtaeZSwxqKS68Ztb7NQaRWClFFRfMg+/Xz4NPsufD4w/1IEhLxJW/sF4DGLAoJfY25aKO1jOyKYBiIZSzyIwApFVUUqkyzWBCISkZAoglUlQiVeYAUigpJUoGAGYF2ess0AyDIVAk+oLB++1iwAhVlFSqkpcBH29XAyIFkpJPG7w9HtcDhlTZXHyuB+8/3+/Xl5hAolClvAx4HI/H5QaBUvq8wY34v8yDO8eAixqQtJ9J/0mIECglkiGAkDyZXOcAIpJQVYMMBqRURTLJYAQSKmVaiUukqGQUIEjtbRpgBNlrnMFEJYph96CkUL0wLHia45/27cACYAAGomiDIEBAUdL9x+wALXcogf8A8XEL5BRkYCTOwOzr0/vsB37SKQdGzdxLZir0wMhak86L9rLjRwAAAAAeyAQfsr8pr7UAAAAASUVORK5CYII='
                  alt=''
                  style={{
                    width: 80,
                    height: 80,
                  }}
                ></img>
              ) : null}
              {item.type === 'folder' ? (
                <img
                  src='data:image/png;base64,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'
                  alt=''
                  style={{
                    width: 80,
                    height: 80,
                  }}
                ></img>
              ) : null}
            </div>
            <div className='text-center mt-2'>{item.title}</div>
            {item.showSetting ? <Setting current={current} getList={getList} type='0' /> : null}
          </div>
        )
      })}
    </div>
  )
}

export default ListSort
