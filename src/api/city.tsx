import { Fetch } from "../fetch";

interface GetListCityParams {
  locale: string,
} // khai bao cac param duoc phep truyen vao

export const requestGetListCity = async (params: GetListCityParams) => {
  // ko được làm như này
  // cái này ?locale=vi là params
  // cái này là domain "https://admin.vntravelguideapp.com/ a đã khai báo rồi
  const data = await Fetch.get("api/public/place/list", {
    params: params // truyền vào đây là đc
  })
  // có thấy cái result kia ko, thì mình phải return ra result chứ
  if (data.data && data.data.result ) {
    return data.data.result // cần phải thêm result vào tại vì api nó thế
  }
  return []
}

interface GetDetailCityParams {
  locale: string,
  id: string
} // khai bao cac param duoc phep truyen vao

export const requestGetDetailCity = async (params: GetDetailCityParams) => {
  const data = await Fetch.get("api/public/place", {
    params: params
  })
  if (data.data) {
    return data.data // do thằng chi tiết này nó ko có result nên mình trả luôn data.data
  }
  return null
}
