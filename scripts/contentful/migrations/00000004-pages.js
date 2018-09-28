const forward = (migration) => {
  // Page content type
  const page = migration.createContentType('page')
    .name('Page')
    .description('Title and body text to accompany specific pages.')
    .displayField('name')

  page.createField('name')
      .name('Page Title')
      .type('Symbol').required(true)

  page.createField('slug')
    .name('Slug')
    .type('Symbol').required(true)
    .validations([{'unique': true}, {'in': ['home', 'recordTypes', 'categories']}])
  page.changeEditorInterface('slug', 'dropdown', {'helpText': 'This is the page url that will utilize these fields.'})

  page.createField('mainText')
    .name('Main Body Text')
    .type('Text')
  page.changeEditorInterface('mainText', 'markdown', {'helpText': 'This text will appear at the top of the page above programatic content.'})

  page.createField('afterText')
    .name('After Text')
    .type('Text')
  page.changeEditorInterface('afterText', 'markdown', {'helpText': 'This text will appear at the bottom of the page after programatic content.'})
}

const reverse = (migration) => {
  migration.deleteContentType('page')
}

module.exports = forward
