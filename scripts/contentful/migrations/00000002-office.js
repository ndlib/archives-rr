const forward = (migration) => {
  // Office content type
  const office = migration.createContentType('office')
    .name('Office')
    .description('An office that belongs to a University division.')
    .displayField('name')

  office.createField('name')
    .name('Name')
    .type('Symbol').required(true)
    .validations([{'unique': true}])

  office.createField('division')
    .name('Division')
    .type('Link').required(true)
    .linkType('Entry')
    .validations([{ linkContentType: ['division']}])
}

const reverse = (migration) => {
  migration.deleteContentType('office')
}

module.exports = forward
