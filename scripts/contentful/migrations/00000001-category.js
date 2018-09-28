const forward = (migration) => {
  // Category content type
  const category = migration.createContentType('category')
    .name('Functional Category')
    .description('Top level classification.')
    .displayField('name')

  category.createField('name')
    .name('Name')
    .type('Symbol').required(true)
    .validations([{'unique': true}])
}

const reverse = (migration) => {
  migration.deleteContentType('category')
}

module.exports = forward
