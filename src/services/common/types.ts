export interface ILoginQueryDTO {
  username: string,
  password: string
}

export interface userInfo {
  id: number
  name: string
}

export interface IPaginationParams {
  current: number
  size: number
}
