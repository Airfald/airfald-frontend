import { ICampusItem } from '@/services/org/typing'
import { ITeacherItem } from '@/services/teacher/typing'

export interface IModelData {
  campusPage: {
    current: number
    size: number
  }
  teacherPage: {
    current: number
    size: number
  }
  campusList: ICampusItem[]
  teacherList: ITeacherItem[]
  resetCampusPage?: Function
  resetTeacherPage?: Function
  listCampusList?: Function
  listTeacherList?: Function
  loadMoreCampusList?: Function
  loadMoreTeacherList?: Function
}
