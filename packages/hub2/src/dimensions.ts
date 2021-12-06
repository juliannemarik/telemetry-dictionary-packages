const dimensions = {
  CATEGORY: "category",
  ACTION: "action",
  LABEL: "label",
  DETAILS: "details",
  USER_TYPE: "userType",
  ID: "id",
  TYPE: "type",
  ORGANIZATION_ID: "organizationId",
  GROUP_ID: "groupId",
  GROUP_ACCESS: "groupAccess",
  GROUP_TYPE: "groupType",
  SEARCH: "search",
  GROUP_ORG_ID: "groupOrgId",
  SITE_ID: "siteId",
  ACCESS: "access",
  CONTENT_ORG_ID: "contentOrgId",
  ELEMENT: "element",
  RESPONSE: "response"
}

export const dictionaryDimensions = [ dimensions.CATEGORY, dimensions.ACTION, dimensions.LABEL, dimensions.DETAILS ];

export const constantDimensions = [ ...dictionaryDimensions, dimensions.ELEMENT ];

export const customDimensionsMap = {
  [dimensions.DETAILS]: 1,
  [dimensions.USER_TYPE]: 2,
  [dimensions.ID]: 3,
  [dimensions.TYPE]: 4,
  [dimensions.ORGANIZATION_ID]: 5,
  [dimensions.GROUP_ID]: 6,
  [dimensions.GROUP_ACCESS]: 7,
  [dimensions.GROUP_TYPE]: 8,
  [dimensions.SEARCH]: 9,
  [dimensions.GROUP_ORG_ID]: 10,
  [dimensions.SITE_ID]: 11,
  [dimensions.ACCESS]: 12,
  [dimensions.CONTENT_ORG_ID]: 13,
  [dimensions.ELEMENT]: 14,
  [dimensions.RESPONSE]: 15
}