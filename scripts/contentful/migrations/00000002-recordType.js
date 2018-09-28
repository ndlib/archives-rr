const forward = (migration) => {
  // RecordType content type
  const recordType = migration.createContentType('recordType')
    .name('Record Type')
    .description('An record type that belongs to a Functional Category.')
    .displayField('name')

  recordType.createField('name')
    .name('Name')
    .type('Symbol').required(true)

  recordType.createField('category')
    .name('Functional Category')
    .type('Link').required(true)
    .linkType('Entry')
    .validations([{ linkContentType: ['category']}])
}

const reverse = (migration) => {
  migration.deleteContentType('recordType')
}

module.exports = forward
