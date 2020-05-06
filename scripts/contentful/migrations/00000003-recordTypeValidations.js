const forward = (migration) => {
  const recordType = migration.editContentType('recordType')

  recordType.changeFieldControl('retention', 'builtin', 'singleLine', {'helpText': '1, 3, 5, 7, 10, 15, 20, etc. years, No less than 10 years, Permanent, Reference'})

  recordType.editField('triggerEvent')
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
      'After resolution/disposition of collection matter',
      'Maintain according to the requirements of the grant agency for the projects referenced on the effort certification report',
      'Maintain in office until all administrative and legal issues are resolved and until no longer needed for reference',
      'Maintain in office until no longer needed for reference',
      'Maintain until superseded or obsolete',
      'None'
    ]}])

  recordType.editField('disposition')
    .validations([{'in': [
      'Destroy',
      'Transfer to the University Archives',
      'Transfer to the University Archives for appraisal',
      'Deposit into CurateND',
      'Maintain in office'
    ]}])

  recordType.editField('referenceCopyDisposition')
    .validations([{'in': [
      '',
      'Destroy',
      'Secure Shred'
    ]}])

  recordType.editField('dateApprovedByGeneralCounsel')
    .required(false)

  // The following fields got empty string added to the validations. This is because a field with validations requires
  // a value, even if that field is not marked "required". Allowing a validation value of '' will bypass this and allow
  // an empty value to pass validation, while also not adding anything extra to the dropdown. Win-win. :)
  recordType.editField('dispositionMethod')
    .validations([{'in': [
      '',
      'Recycle',
      'Shred',
      'Secure Shred'
    ]}])

  recordType.editField('referenceCopy')
    .validations([{'in': [
      '',
      'Maintain in office until no longer needed for reference'
    ]}])

  recordType.editField('referenceCopyDispositionMethod')
    .validations([{'in': [
      '',
      'Recycle',
      'Shred',
      'Secure Shred'
    ]}])

  recordType.editField('dataClassification')
    .validations([{'in': [
      '',
      'Public',
      'Internal',
      'Sensitive',
      'Highly Sensitive'
    ]}])
}

const reverse = (migration) => {
  const recordType = migration.editContentType('recordType')

  recordType.changeFieldControl('retention', 'builtin', 'singleLine', {'helpText': '1, 3, 5, 7, 10, 15, 20, etc. years, Permanent, Reference'})

  recordType.editField('triggerEvent')
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

  recordType.editField('disposition')
    .validations([{'in': [
      'Destroy',
      'Transfer to the University Archives',
      'Transfer to the University Archives for appraisal',
      'Deposit into CurateND'
    ]}])

  recordType.editField('referenceCopyDisposition')
    .validations([{'in': [
      'Destroy'
    ]}])

  recordType.editField('dispositionMethod')
    .validations([{'in': [
      'Recycle',
      'Shred',
      'Secure Shred'
    ]}])

  recordType.editField('referenceCopy')
    .validations([{'in': [
      'Maintain in office until no longer needed for reference'
    ]}])

  recordType.editField('referenceCopyDispositionMethod')
    .validations([{'in': [
      'Recycle',
      'Shred',
      'Secure Shred'
    ]}])

  recordType.editField('dataClassification')
    .validations([{'in': [
      'Public',
      'Internal',
      'Sensitive',
      'Highly Sensitive'
    ]}])
}

module.exports = forward
