export const advancedFieldOptions = [
  { value: 'triggerEvent', label: 'Trigger Event' },
  { value: 'disposition', label: 'Disposition' },
  { value: 'dispositionMethod', label: 'Disposition Method' },
  { value: 'referenceCopy', label: 'Reference Copy' },
  { value: 'referenceCopyDisposition', label: 'Reference Copy Disposition' },
  { value: 'referenceCopyDispositionMethod', label: 'Reference Copy Disposition Method' },
]

const returnOptions = (type) => {
  return type.map(option => {
    return { value: option, label: option }
  })
}

const triggerEventValues = [
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
  'Maintain until superseded or obsolete',
]
export const triggerEventOptions = returnOptions(triggerEventValues)

const dispositionValues = [
  'Destroy',
  'Transfer to the University Archives',
  'Transfer to the University Archives for appraisal',
  'Deposit into CurateND',
]
export const dispositionOptions = returnOptions(dispositionValues)

const dispositionMethodValues = [
  'Recycle',
  'Shred',
  'Secure Shred',
]
export const dispositionMethodOptions = returnOptions(dispositionMethodValues)

const referenceCopyValues = [
  'Maintain in office until no longer needed for reference',
]
export const referenceCopyOptions = returnOptions(referenceCopyValues)

const referenceCopyDispositionValues = [
  'Destroy',
]
export const referenceCopyDispositionOptions = returnOptions(referenceCopyDispositionValues)

const referenceCopyDispositionMethodValues = [
  'Recycle',
  'Shred',
  'Secure Shred',
]
export const referenceCopyDispositionMethodOptions = returnOptions(referenceCopyDispositionMethodValues)
