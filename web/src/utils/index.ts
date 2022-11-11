import { Doc } from '@/types'

export const sortFn = function (list: Doc[], type: string) {
  let l = list
  if (type === 'name') {
    l = list.sort((a, b) => {
      return a.title < b.title ? 1 : -1
    })
  } else if (type === 'updateTime') {
    l = list.sort((a, b) => {
      return +new Date(a.updated) < +new Date(b.updated) ? 1 : -1
    })
  } else if (type === 'createTime') {
    l = list.sort((a, b) => {
      return +new Date(a.created) < +new Date(b.created) ? 1 : -1
    })
  }
  return l
}
export const sortList = function (documentData: Doc[] = [], sortType: string, isFolderTop: boolean = false) {
  let folderList = documentData.filter((v) => {
    return v.type === 'folder'
  })
  let docsList = documentData.filter((v) => {
    return v.type !== 'folder'
  })
  let resolveList = []
  if (!isFolderTop) {
    resolveList = sortFn(documentData, sortType)
  } else {
    resolveList = [...sortFn(folderList, sortType), ...sortFn(docsList, sortType)]
  }
  console.log('resolveList', resolveList)
  return [...resolveList]
}
