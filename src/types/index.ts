export interface WorkspaceData {
  product: string
  channel: string
  accounts: string[]
  marketingUnit: MarketingUnitConfig
  creatives: CreativeConfig[]
}

export interface MarketingUnitConfig {
  marketingPurpose: string
  productCategory: string
  productType: string
  marketingCarrier: string
  conversionType: string
  adPlacement: string
  placementScenario: string
  targetingRegions: string[]
  targetingAgeMin: number
  targetingAgeMax: number
  targetingGender: string
  customAudience: string
  excludeConverted: boolean
  billingMethod: string
  bidScenario: string
  bidAmount: number
  firstPartyBoost: boolean
  oneClickBoost: boolean
  dailyBudget: string
  deliveryStartDate: string
  deliveryEndDate: string
  deliveryTime: string
  firstDayStartTime: boolean
  unitName: string
}

export interface CreativeConfig {
  id: string
  materials: Material[]
  copyTemplate: CopyTemplate | null
  landingPage: string
}

export interface Material {
  id: string
  name: string
  type: 'video' | 'image'
  url: string
  size: number
  duration?: number
  stats7d: {
    impressions: number
    clicks: number
    conversions: number
    spend: number
    ctr: number
    cvr: number
  }
  thumbnail?: string
}

export interface CopyTemplate {
  id: string
  title: string
  content: string
  stats7d: {
    impressions: number
    clicks: number
    ctr: number
  }
}
