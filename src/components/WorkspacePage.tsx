'use client'

import { useState } from 'react'
import { AccountSelector } from '@/components/AccountSelector'
import { MarketingUnitConfig } from '@/components/MarketingUnitConfig'
import { CreativeCardGroup } from '@/components/CreativeCardGroup'
import { PreviewPanel } from '@/components/PreviewPanel'
import { ProgressToast } from '@/components/ProgressToast'
import { WorkspaceData, MarketingUnitConfig as MarketingUnitConfigType } from '@/types'

export default function WorkspacePage() {
  const [workspaceData, setWorkspaceData] = useState<Partial<WorkspaceData>>({
    product: '',
    channel: '',
    accounts: [],
    marketingUnit: {
      marketingPurpose: '线索留资',
      productCategory: '运营商产品',
      productType: '',
      marketingCarrier: '页面跳转',
      conversionType: '数据源上报',
      adPlacement: '微信视频号',
      placementScenario: '视频号信息流-视频号入口',
      targetingRegions: [],
      targetingAgeMin: 18,
      targetingAgeMax: 65,
      targetingGender: '不限',
      customAudience: '',
      excludeConverted: true,
      billingMethod: 'oCPM',
      bidScenario: '常规投放',
      bidAmount: 0.5,
      firstPartyBoost: false,
      oneClickBoost: false,
      dailyBudget: '不限',
      deliveryStartDate: new Date().toISOString().split('T')[0],
      deliveryEndDate: '',
      deliveryTime: 'all_day',
      firstDayStartTime: false,
      unitName: '',
    } as MarketingUnitConfigType,
    creatives: [],
  })
  
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildProgress, setBuildProgress] = useState(0)
  const [showProgressToast, setShowProgressToast] = useState(false)
  
  const expectedCount = workspaceData.accounts?.length || 0
  const creativeCount = workspaceData.creatives?.length || 0
  const totalAds = expectedCount * creativeCount
  
  const handleBuild = async () => {
    setIsBuilding(true)
    setBuildProgress(0)
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setBuildProgress(i)
    }
    setIsBuilding(false)
    setBuildProgress(100)
  }
  
  const handleHideToBackground = () => {
    setShowProgressToast(true)
    handleBuild()
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">批量广告创建工作台</h1>
            <div className="flex items-center space-x-3">
              {totalAds > 0 && (
                <span className="text-sm text-gray-600">
                  预计创建 <span className="font-bold text-blue-600">{totalAds}</span> 个广告
                </span>
              )}
              <button
                onClick={handleBuild}
                disabled={isBuilding || totalAds === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isBuilding ? '搭建中...' : '开始搭建'}
              </button>
              {isBuilding && (
                <button
                  onClick={handleHideToBackground}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  隐藏到后台
                </button>
              )}
            </div>
          </div>
          {isBuilding && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${buildProgress}%` }}
              />
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        <AccountSelector
          data={{ product: workspaceData.product || '', channel: workspaceData.channel || '', accounts: workspaceData.accounts || [] }}
          onChange={(data) => setWorkspaceData({ ...workspaceData, ...data })}
        />
        <MarketingUnitConfig
          data={workspaceData.marketingUnit!}
          onChange={(marketingUnit) => setWorkspaceData({ ...workspaceData, marketingUnit })}
        />
        <CreativeCardGroup
          creatives={workspaceData.creatives || []}
          onChange={(creatives) => setWorkspaceData({ ...workspaceData, creatives })}
        />
        <PreviewPanel
          expectedCount={totalAds}
          isBuilding={isBuilding}
          buildProgress={buildProgress}
        />
      </main>

      {showProgressToast && (
        <ProgressToast
          progress={buildProgress}
          onClose={() => setShowProgressToast(false)}
        />
      )}
    </div>
  )
}
