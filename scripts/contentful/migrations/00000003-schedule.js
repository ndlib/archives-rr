const forward = (migration) => {
  // Schedule content type
  const schedule = migration.createContentType('schedule')
    .name('Schedule')
    .description('Record retention schedule')
    .displayField('scheduleId')

  // Fields
  // record type title
  schedule.createField('recordType')
    .name('Record Type Title')
    .type('Link').required(true)
    .linkType('Entry')
    .validations([{ linkContentType: ['recordType']}])

  // functional category
  // schedule.createField('category')
  //   .name('Functional Category')
  //   .type('Link').required(true)
  //   .linkType('Entry')
  //   .validations([{ linkContentType: ['category']}])

  // schedule id #
  schedule.createField('scheduleId')
    .name('Schedule ID #')
    .type('Symbol').required(true)

  // record type description
  schedule.createField('recordTypeDescription')
    .name('Record Type Description')
    .type('Text').required(true)

  // official copy
  schedule.createField('officialCopy')
    .name('Official Copy')
    .type('Symbol')

  // retention
  schedule.createField('retention')
    .name('Retention')
    .type('Symbol').required(true)
  schedule.changeEditorInterface('retention', 'singleLine', {'helpText': '1, 3, 5, 7, 10, 15, 20, etc. years, Permanent, Reference'})

  // trigger event
  schedule.createField('triggerEvent')
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
      'Maintain in recordType until all administrative and legal issues are resolved and until no longer needed for reference',
      'Maintain in recordType until no longer needed for reference',
      'Maintain until superseded or obsolete'
    ]}])
    schedule.changeEditorInterface('triggerEvent', 'dropdown')

  // disposition
  schedule.createField('disposition')
    .name('Disposition')
    .type('Symbol').required(true)
    .validations([{'in': [
      'Destroy',
      'Transfer to the University Archives',
      'Transfer to the University Archives for appraisal',
      'Deposit into CurateND'
    ]}])
  schedule.changeEditorInterface('disposition', 'dropdown')

  // disposition method
  schedule.createField('dispositionMethod')
    .name('Disposition Method')
    .type('Symbol')
    .validations([{'in': [
      'Recycle',
      'Shred',
      'Secure Shred'
    ]}])
  schedule.changeEditorInterface('dispositionMethod', 'dropdown')

  // reference copy
  schedule.createField('referenceCopy')
    .name('Reference Copy')
    .type('Symbol')
    .validations([{'in': [
      'Maintain in recordType until no longer needed for reference'
    ]}])
  schedule.changeEditorInterface('referenceCopy', 'dropdown')

  // reference copy disposition
  schedule.createField('referenceCopyDisposition')
    .name('Reference Copy Disposition')
    .type('Symbol')
    .validations([{'in': [
      'Destroy'
    ]}])
  schedule.changeEditorInterface('referenceCopyDisposition', 'dropdown')

  // reference copy disposition method
  schedule.createField('referenceCopyDispositionMethod')
    .name('Reference Copy Disposition Method')
    .type('Symbol')
    .validations([{'in': [
      'Recycle',
      'Shred',
      'Secure Shred'
    ]}])
  schedule.changeEditorInterface('referenceCopyDispositionMethod', 'dropdown')

  // data classification
  schedule.createField('dataClassification')
    .name('Data Classification')
    .type('Symbol')
    .validations([{'in': [
      'Public',
      'Internal',
      'Sensitive',
      'Highly Sensitive'
    ]}])
  schedule.changeEditorInterface('dataClassification', 'dropdown')

  // storage requirements
  schedule.createField('storageRequirements')
    .name('Storage Requirements')
    .type('Text')

  // legal reference
  schedule.createField('legalReference')
    .name('Legal Reference')
    .type('Symbol')

  // notes
  schedule.createField('notes')
    .name('Notes')
    .type('Text')

  // system of record
  schedule.createField('systemOfRecord')
    .name('System of Record')
    .type('Text')
  schedule.changeEditorInterface('systemOfRecord', 'markdown', {'helpText': '(Internal)'})

  // archives notes
  schedule.createField('archivesNotes')
    .name('Archives Notes')
    .type('Text')
  schedule.changeEditorInterface('archivesNotes', 'markdown', {'helpText': '(Internal)'})

  // general counsel notes
  schedule.createField('generalCounselNotes')
    .name('General Counsel Notes')
    .type('Text')
  schedule.changeEditorInterface('generalCounselNotes', 'markdown', {'helpText': '(Internal)'})

  // date approved by general counsel
  schedule.createField('dateApprovedByGeneralCounsel')
    .name('Date Approved By General Counsel')
    .type('Date').required(true)
  schedule.changeEditorInterface('dateApprovedByGeneralCounsel', 'datePicker', {'format': 'dateonly'})

  // date reivsed
  schedule.createField('dateRevised')
    .name('Date Revised')
    .type('Date')
  schedule.changeEditorInterface('dateRevised', 'datePicker', {'format': 'dateonly'})

}

const reverse = (migration) => {
  migration.deleteContentType('schedule')
}

module.exports = forward
