// move "Office of the [divisionLeader]" to the top of the list
export const mainOfficeFirst = (list, divisionLeader) => {
  // find matching office in array
  const mainOffice = list.filter(item => {
    return item.fields.name === `Office of the ${divisionLeader}`
  })
  // if it exists move it to the front
  if (mainOffice.length > 0 && list.indexOf(mainOffice[0]) > 0) {
    // remove from list
    list.splice(list.indexOf(mainOffice[0]), 1);
    // add to start of list
    list.unshift(mainOffice[0]);
  }
  return list
}
