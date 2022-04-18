import DataSource from 'devextreme/data/data_source'
// import ArrayStore from 'devextreme/data/array_store'

export const organizationParams = [
  { key: 'rudium', name: 'Rudium', value: '' },
  { key: 'fambli', name: 'Fambli', value: 'famb' },
  { key: 'yapoly', name: 'Yapoly', value: '' },
  { key: 'kwater', name: 'Kwater', value: '' },
  { key: 'yarilo', name: 'Yarilo', value: '' },
  { key: 'elfing', name: 'Elfing', value: '' },
  { key: 'fimati', name: 'Fimati', value: '' },
  { key: 'sufflo', name: 'Sufflo', value: '' },
  { key: 'loatin', name: 'Loatin', value: '' },
  { key: 'fashri_1', name: 'Fashri 1', value: '' },
  { key: 'fashri_2', name: 'Fashri 2', value: '' },
  { key: 'fashri_3', name: 'Fashri 3', value: '' },
  { key: 'fashri_4', name: 'Fashri 4', value: '' },
  { key: 'fashri_5', name: 'Fashri 5', value: '' },
]

export const bridgingXParams = [
  { key: 'rudium2', name: 'Rudium2', value: '' },
  { key: 'fambli2', name: 'Fambli2', value: 'fambli' },
  { key: 'yapoly2', name: 'Yapoly2', value: '' },
  { key: 'kwater2', name: 'Kwater2', value: '' },
  { key: 'yarilo2', name: 'Yarilo2', value: '' },
  { key: 'elfing2', name: 'Elfing2', value: '' },
  { key: 'fimati2', name: 'Fimati2', value: '' },
  { key: 'sufflo2', name: 'Sufflo2', value: '' },
  { key: 'loatin2', name: 'Loatin2', value: '' },
  { key: 'fashri2', name: 'Fashri2', value: '' },
]

// const getRichEditOptions = (categoryName, arrParams) =>
//   arrParams.map((param, index) => {
//     return { ID: index, key: param.key, Category: categoryName, Name: param.name, data: { ...param } }
//   })

const getRichEditOptions = (categoryName, arrParams) => {
  return { category: categoryName, collection: arrParams }
}

export const richEditSelectBoxOptions = [...organizationParams, ...bridgingXParams].map((param) => param.name)
// export const richEditSelectBoxOptions2 = [
//   ...getRichEditOptions('Organization Parameters', organizationParams),
//   ...getRichEditOptions('BridgingX Parameters', bridgingXParams),
// ]
export const richEditSelectBoxOptions2 = [
  getRichEditOptions('Organization Parameters', organizationParams),
  getRichEditOptions('BridgingX Parameters', bridgingXParams),
] //?

// const dataParams = [
//   { firstName: 'Alex', birthYear: 1991 },
//   { firstName: 'Joe', birthYear: 1990 },
//   { firstName: 'Bob', birthYear: 1995 },
// ]

const apiParams = [
  {
    id: '2f20e315-31e7-49d0-9723-092c87163701',
    key: 'param1',
    tenantId: 'e5248129-c936-428c-8e44-00f854c50f98',
    name: 'sdt',
    value: '0909123456',
    // value: '',
    createdByUserId: '00000000-0000-0000-0000-000000000000',
    createdDate: '2022-01-27T22:15:47.275542Z',
    isBridgingXParameter: false,
  },
  {
    id: '52cb1c0f-e019-432a-9620-f84b1795345a',
    key: 'param2',
    tenantId: 'e5248129-c936-428c-8e44-00f854c50f98',
    name: 'address',
    value: '234 do ba',
    // value: '',
    createdByUserId: '00000000-0000-0000-0000-000000000000',
    createdDate: '2022-01-29T23:26:46.555653Z',
    isBridgingXParameter: false,
  },
  {
    id: '7894673d-a2e0-49b1-bb6e-0c4c81125055',
    key: 'param3',
    tenantId: 'e5248129-c936-428c-8e44-00f854c50f98',
    name: 'username',
    value: 'Na',
    // value: '',
    createdByUserId: '00000000-0000-0000-0000-000000000000',
    createdDate: '2022-01-30T23:26:46.555653Z',
    isBridgingXParameter: true,
  },
]
// options.mailMerge.viewMergedData = false;
// options.mailMerge.dataSource = [
//   { Name: 'Indy', age: 32 },
//   { Name: 'Andy', age: 28 },
// ];
const getParamsCollection = (apiParams) => {
  console.log('>>>>>', apiParams)
  const dataObject = apiParams.reduce((acc, param) => {
    return { ...acc, [param.key]: param.value }
  }, {})

  return [dataObject]
}

// const selector = (dataItem) => {
//   console.log('>>>>>', dataItem)  
//   return {Name: dataItem.name, age:22}  
// }

export const getDataSource = (apiParams) => {
  const dataObject = apiParams.reduce((acc, param) => {
    return { ...acc, [param.key]: param.value }
  }, {})

  return [dataObject]
}

export const newDataSource = new DataSource({
  store: {
    type: 'array',
    data:[
      { Name: 'Indy', age: 32 },
      { Name: 'Andy', age: 28 },
    ]
    // data: getParamsCollection(apiParams),
  },  
})
console.log(`TCL>>> ~ newDataSource`, newDataSource)
