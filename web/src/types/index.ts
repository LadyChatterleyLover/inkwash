export interface Author {
  avatar: string
  email: string
  name: string
  username: string
  _id: string
}

export interface Doc {
  author: Author
  created: string
  isAuthor: boolean
  isEditor: boolean
  parentId: string
  title: string
  type: string
  updated: string
  _id: string
  showSetting?: boolean
}
