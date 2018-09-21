const forward = (migration) => {
  // Policy content type
  const policy = migration.createContentType('policy')
    .name('Policy')
    .description('Record retention policy')
    .displayField('recordTypeTitle')

  // Fields

  // record type title
  policy.createField('recordTypeTitle')
    .name('Record Type Title')
    .type('Symbol').required(true)

  // functional category
  policy.createField('category')
    .name('Functional Category')
    .type('Symbol').required(true)
    .validations([{'in': [
      'Administrative Records',
      'Alumni and Development Records',
      'Archives, Libraries, and Museums Records',
      'Athletics Records',
      'Audio/Visual Records',
      'Curriculum and Instruction Records',
      'Equipment and Supplies Records',
      'Facilities and Property Records',
      'Financial and Accounting Records',
      'Fire, Safety, and Security Records',
      'Grants and Research Records',
      'Health Services and Medical Records',
      'Human Resources and Personnel Records',
      'Information Technology Records',
      'Legal Records',
      'Publications and Promotions Records',
      'Student Records, Academic',
      'Student Records, Financial Services',
      'Student Records, Residential Life',
      'University Auxiliary Services Records'
    ]}])
  policy.changeEditorInterface('category', 'dropdown')

  // schedule id #
  policy.createField('scheduleId')
    .name('Schedule ID #')
    .type('Symbol').required(true)

  // record type description
  policy.createField('recordTypeDescription')
    .name('Record Type Description')
    .type('Text').required(true)

  // official copy
  policy.createField('officialCopy')
    .name('Official Copy')
    .type('Symbol')

  // retention
  policy.createField('retention')
    .name('Retention')
    .type('Symbol').required(true)
  policy.changeEditorInterface('retention', 'singleLine', {'helpText': '1, 3, 5, 7, 10, 15, 20, etc. years, Permanent, Reference'})

  // trigger event
  policy.createField('triggerEvent')
    .name('Trigger Event')
    .type('Symbol').required(true)
    .validations([{'in': [
      'After completion date of study or grant end date (whichever is later)',
      'After conclusion of study or resolution of complaint (whichever is later)',
      'After date fine was paid',
      'After date forgiven',
      'After date of adverse reaction or situation',
      'After date of application',
      'After date of complaint',
      'After date of event',
      'After date of execution of agreement',
      'After date of expiration of agreement',
      'After date of expiration of license',
      'After date of grant end or receipt of final payment',
      'After date of payment or resolution of issue',
      'After date of purchase OR (for continuing and standing orders) after date order was terminated',
      'After date of record creation',
      'After date of request',
      'After date project is completed (at a minimum, all records should be kept until all subjects have turned 21)',
      'After date reported',
      'After date research is completed',
      'After date student graduates or leaves the University',
      'After date submitted to collection agency',
      'After determination is made, research is complete, or grant end date is reached (whichever is later)',
      'After end of academic year',
      'After end of calendar year',
      'After end of camp',
      'After end of course',
      'After end of residence',
      'After final disposition of tissue is complete',
      'After grant end date',
      'After last date of service',
      'After last effective date',
      'After project completion, or when released from all litigation, claims, or audits',
      'After project end date',
      'Maintain according to the requirements of the grant agency for the projects referenced on the effort certification report',
      'Maintain in office until all administrative and legal issues are resolved and until no longer needed for reference',
      'Maintain in office until no longer needed for reference',
      'Maintain until superseded or obsolete'
    ]}])
    policy.changeEditorInterface('triggerEvent', 'dropdown')

  // disposition
  policy.createField('disposition')
    .name('Disposition')
    .type('Symbol').required(true)
    .validations([{'in': [
      'Destroy',
      'Transfer to the University Archives',
      'Transfer to the University Archives for appraisal',
      'Deposit into CurateND'
    ]}])
  policy.changeEditorInterface('disposition', 'dropdown')

  // disposition method
  policy.createField('dispositionMethod')
    .name('Disposition Method')
    .type('Symbol')
    .validations([{'in': [
      'Recycle',
      'Shred',
      'Secure Shred'
    ]}])
  policy.changeEditorInterface('dispositionMethod', 'dropdown')

  // reference copy
  policy.createField('referenceCopy')
    .name('Reference Copy')
    .type('Symbol')
    .validations([{'in': [
      'Maintain in office until no longer needed for reference'
    ]}])
  policy.changeEditorInterface('referenceCopy', 'dropdown')

  // reference copy disposition
  policy.createField('referenceCopyDisposition')
    .name('Reference Copy Disposition')
    .type('Symbol')
    .validations([{'in': [
      'Destroy'
    ]}])
  policy.changeEditorInterface('referenceCopyDisposition', 'dropdown')

  // reference copy disposition method
  policy.createField('referenceCopyDispositionMethod')
    .name('Reference Copy Disposition Method')
    .type('Symbol')
    .validations([{'in': [
      'Recycle',
      'Shred',
      'Secure Shred'
    ]}])
  policy.changeEditorInterface('referenceCopyDispositionMethod', 'dropdown')

  // data classification
  policy.createField('dataClassification')
    .name('Data Classification')
    .type('Symbol')
    .validations([{'in': [
      'Public',
      'Internal',
      'Sensitive',
      'Highly Sensitive'
    ]}])
  policy.changeEditorInterface('dataClassification', 'dropdown')

  // storage requirements
  policy.createField('storageRequirements')
    .name('Storage Requirements')
    .type('Text')

  // legal reference
  policy.createField('legalReference')
    .name('Legal Reference')
    .type('Text')

  // notes
  policy.createField('notes')
    .name('Notes')
    .type('Text')

  // system of record
  policy.createField('systemOfRecord')
    .name('System of Record')
    .type('Text')
  policy.changeEditorInterface('systemOfRecord', 'multipleLine', {'helpText': '(Internal)'})

  // archives notes
  policy.createField('archivesNotes')
    .name('Archives Notes')
    .type('Text')
  policy.changeEditorInterface('archivesNotes', 'multipleLine', {'helpText': '(Internal)'})

  // general counsel notes
  policy.createField('generalCounselNotes')
    .name('General Counsel Notes')
    .type('Text')
  policy.changeEditorInterface('generalCounselNotes', 'multipleLine', {'helpText': '(Internal)'})

  // date approved by general counsel
  policy.createField('dateApprovedByGeneralCounsel')
    .name('Date Approved By General Counsel')
    .type('Date').required(true)
  policy.changeEditorInterface('dateApprovedByGeneralCounsel', 'datePicker', {'format': 'dateonly'})

  // date reivsed
  policy.createField('dateRevised')
    .name('Date Revised')
    .type('Date')
  policy.changeEditorInterface('dateRevised', 'datePicker', {'format': 'dateonly'})

  // office
  policy.createField('office')
    .name('Office')
    .type('Link').required(true)
    .linkType('Entry')
    .validations([{ linkContentType: ['office']}])
}

const reverse = (migration) => {
  migration.deleteContentType('policy')
}

module.exports = forward
