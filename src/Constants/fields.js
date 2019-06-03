export const displayFields = [
  'recordType',
  'scheduleId',
  'recordTypeDescription',
  'officialCopy',
  'retention',
  'triggerEvent',
  'disposition',
  'dispositionMethod',
  'referenceCopy',
  'referenceCopyDisposition',
  'referenceCopyDispositionMethod',
  'dataClassification',
  'storageRequirements',
  'legalReference',
  'notes',

  // restricted fields
  'systemOfRecord',
  'archivesNotes',
  'generalCounselNotes',

  // date fields
  'dateApprovedByGeneralCounsel',
  'dateRevised',
]

export const searchableFields = [
  'recordType',
  'schedulId',
  'recordTypeDescription',
  'officialCopy',
  'retention',
  'storageRequirements',
  'legalReference',
  'notes',

  // restricted fields
  'systemOfRecord',
  'archivesNotes',
  'generalCounselNotes',
]

// these fields are symbols with specific predefined validations in Contentful
export const predefinedFields = [
  'retention',
  'triggerEvent',
  'disposition',
  'dispositionMethod',
  'referenceCopy',
  'referenceCopyDisposition',
  'referenceCopyDispositionMethod',
]

export const dateFields = [
  'dateApprovedByGeneralCounsel',
  'dateRevised',
]

// These fields can be hidden if they are empty
export const hideableFields = [
  {
    field: 'officialCopy',
    fillers: [ // These columns are expanded if the "field" is hidden so they will fill the gap
      'retention',
      'triggerEvent',
    ],
  },
  {
    field: 'dispositionMethod',
    fillers: [
      'disposition',
    ],
  },
  { field: 'referenceCopy' },
  { field: 'referenceCopyDisposition' },
  {
    field: 'referenceCopyDispositionMethod',
    fillers: [
      'referenceCopyDisposition',
    ],
  },
]
