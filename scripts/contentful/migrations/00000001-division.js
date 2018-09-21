const forward = (migration) => {
  // Division content type
  const division = migration.createContentType('division')
    .name('Division')
    .description('University Division')
    .displayField('name')

  division.createField('name')
    .name('Name')
    .type('Symbol').required(true)
    .validations([{'unique': true}])

  division.createField('divisionLeader')
    .name('Division Leader')
    .type('Symbol').required(true)
    .validations([{'in': ['President', 'Provost', 'Executive Vice President']}])
  division.changeEditorInterface('divisionLeader', 'dropdown')
}

const reverse = (migration) => {
  migration.deleteContentType('division')
}

module.exports = forward
