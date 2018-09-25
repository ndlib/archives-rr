// move "Office of the [divisionLeader]" to the top of the list
export const mainOfficeFirst = (list, divisionLeader) => {
  const mainOffice = list.filter(item => {
    return item.fields.name === `Office of the ${divisionLeader}`
  })
  if (mainOffice.length > 0 && list.indexOf(mainOffice[0]) > 0) {
    list.splice(list.indexOf(mainOffice[0]), 1);
    list.unshift(mainOffice[0]);
  }
  return list
}
