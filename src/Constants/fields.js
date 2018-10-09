export const displayFields = [
  'recordType',
  'recordTypeId',
  'recordTypeDescription',
  'officialCopy',
  'retention',
  'triggerEvent',
  'disposition',
  'dispositionMethod',
  'referenceCopy',
  'referenceCopyDisposition',
  'referenceCopyDispositionMethod',
  'storageRequirements',
  'legalReference',
  'notes',

  // restricted fields
  'systemOfRecord',
  'archivesNotes',
  'generalCounselNotes',

  // date fields
  'dateApprovedByGeneralCounsel',
  'dateRevised'
]

export const searchableFields = [
  'recordType',
  'recordTypeId',
  'recordTypeDescription',
  'officialCopy',
  'storageRequirements',
  'legalReference',
  'notes',

  // restricted fields
  'systemOfRecord',
  'archivesNotes',
  'generalCounselNotes'
]

// these fields are symbols with specific predefined validations in Contentful
export const predefinedFields = [
  'retention',
  'triggerEvent',
  'disposition',
  'dispositionMethod',
  'referenceCopy',
  'referenceCopyDisposition',
  'referenceCopyDispositionMethod'
]

export const dateFields = [
  'dateApprovedByGeneralCounsel',
  'dateRevised'
]
