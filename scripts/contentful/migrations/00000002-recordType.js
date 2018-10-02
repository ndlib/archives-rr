const forward = (migration) => {
  // Schedule content type
  const record = migration.createContentType('record')
    .name('Record Type')
    .description('Record retention record')
    .displayField('recordType')

  // Fields
  // record type title
  record.createField('recordType')
    .name('Record Type Title')
    .type('Symbol').required(true)

  // functional category
  record.createField('category')
    .name('Functional Category')
    .type('Link').required(true)
    .linkType('Entry')
    .validations([{ linkContentType: ['category']}])

  // record id #
  record.createField('scheduleId')
    .name('Schedule ID #')
    .type('Symbol').required(true)

  // record type description
  record.createField('recordTypeDescription')
    .name('Record Type Description')
    .type('Text').required(true)

  // official copy
  record.createField('officialCopy')
    .name('Official Copy')
    .type('Symbol')

  // retention
  record.createField('retention')
    .name('Retention')
    .type('Symbol').required(true)
  record.changeEditorInterface('retention', 'singleLine', {'helpText': '1, 3, 5, 7, 10, 15, 20, etc. years, Permanent, Reference'})

  // trigger event
  record.createField('triggerEvent')
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
    record.changeEditorInterface('triggerEvent', 'dropdown')

  // disposition
  record.createField('disposition')
    .name('Disposition')
    .type('Symbol').required(true)
    .validations([{'in': [
      'Destroy',
      'Transfer to the University Archives',
      'Transfer to the University Archives for appraisal',
      'Deposit into CurateND'
    ]}])
  record.changeEditorInterface('disposition', 'dropdown')

  // disposition method
  record.createField('dispositionMethod')
    .name('Disposition Method')
    .type('Symbol')
    .validations([{'in': [
      'Recycle',
      'Shred',
      'Secure Shred'
    ]}])
  record.changeEditorInterface('dispositionMethod', 'dropdown')

  // reference copy
  record.createField('referenceCopy')
    .name('Reference Copy')
    .type('Symbol')
    .validations([{'in': [
      'Maintain in office until no longer needed for reference'
    ]}])
  record.changeEditorInterface('referenceCopy', 'dropdown')

  // reference copy disposition
  record.createField('referenceCopyDisposition')
    .name('Reference Copy Disposition')
    .type('Symbol')
    .validations([{'in': [
      'Destroy'
    ]}])
  record.changeEditorInterface('referenceCopyDisposition', 'dropdown')

  // reference copy disposition method
  record.createField('referenceCopyDispositionMethod')
    .name('Reference Copy Disposition Method')
    .type('Symbol')
    .validations([{'in': [
      'Recycle',
      'Shred',
      'Secure Shred'
    ]}])
  record.changeEditorInterface('referenceCopyDispositionMethod', 'dropdown')

  // data classification
  record.createField('dataClassification')
    .name('Data Classification')
    .type('Symbol')
    .validations([{'in': [
      'Public',
      'Internal',
      'Sensitive',
      'Highly Sensitive'
    ]}])
  record.changeEditorInterface('dataClassification', 'dropdown')

  // storage requirements
  record.createField('storageRequirements')
    .name('Storage Requirements')
    .type('Text')

  // legal reference
  record.createField('legalReference')
    .name('Legal Reference')
    .type('Symbol')

  // notes
  record.createField('notes')
    .name('Notes')
    .type('Text')

  // system of record
  record.createField('systemOfRecord')
    .name('System of Record')
    .type('Symbol')
  record.changeEditorInterface('systemOfRecord', 'singleLine', {'helpText': '(Internal)'})

  // archives notes
  record.createField('archivesNotes')
    .name('Archives Notes')
    .type('Text')
  record.changeEditorInterface('archivesNotes', 'markdown', {'helpText': '(Internal)'})

  // general counsel notes
  record.createField('generalCounselNotes')
    .name('General Counsel Notes')
    .type('Text')
  record.changeEditorInterface('generalCounselNotes', 'markdown', {'helpText': '(Internal)'})

  // date approved by general counsel
  record.createField('dateApprovedByGeneralCounsel')
    .name('Date Approved By General Counsel')
    .type('Date').required(true)
  record.changeEditorInterface('dateApprovedByGeneralCounsel', 'datePicker', {'format': 'dateonly'})

  // date reivsed
  record.createField('dateRevised')
    .name('Date Revised')
    .type('Date')
  record.changeEditorInterface('dateRevised', 'datePicker', {'format': 'dateonly'})

}

const reverse = (migration) => {
  migration.deleteContentType('record')
}

module.exports = forward
