'use client'

import { useState } from 'react'
import { CheckCircle, ArrowLeft, Eye, Send, Download } from 'lucide-react'

interface PreviewSubmitProps {
  marketingUnitData: any
  creativeData: any[]
  onBack: () => void
}

export function PreviewSubmit({ marketingUnitData, creativeData, onBack }: PreviewSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showJson, setShowJson] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // 模拟提交过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 这里可以添加实际的API调用
    console.log('提交数据：', {
      marketingUnit: marketingUnitData,
      creatives: creativeData,
    })
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleExportJson = () => {
    const data = {
      marketingUnit: marketingUnitData,
      creatives: creativeData,
      exportTime: new Date().toISOString(),
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ad-campaign-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isSubmitted) {
    return (
      <div className="p-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">提交成功！</h2>
        <p className="text-gray-600 mb-8">
          营销单元和 {creativeData.length} 个创意已成功创建
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            创建新的推广计划
          </button>
          
          <button
            onClick={handleExportJson}
            className="flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>导出配置</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">预览并提交</h2>
        <p className="mt-1 text-sm text-gray-600">请确认以下信息无误后提交</p>
      </div>

      {/* 营销单元信息 */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
          营销单元配置
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">营销单元名称</span>
              <p className="font-medium text-gray-900">{marketingUnitData?.unitName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">营销目的</span>
              <p className="font-medium text-gray-900">{marketingUnitData?.marketingPurpose}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">推广产品</span>
              <p className="font-medium text-gray-900">
                {marketingUnitData?.productCategory} - {marketingUnitData?.productType}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">投放版位</span>
              <p className="font-medium text-gray-900">{marketingUnitData?.adPlacement}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">版位定投场景</span>
              <p className="font-medium text-gray-900">{marketingUnitData?.placementScenario}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">计费方式</span>
              <p className="font-medium text-gray-900">{marketingUnitData?.billingMethod}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">出价</span>
              <p className="font-medium text-gray-900">{marketingUnitData?.bidAmount} 元</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">日预算</span>
              <p className="font-medium text-gray-900">{marketingUnitData?.dailyBudget}</p>
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-500">定向配置</span>
            <div className="mt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                地域：{marketingUnitData?.targetingRegions?.length}个城市
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                年龄：{marketingUnitData?.targetingAgeMin}-{marketingUnitData?.targetingAgeMax}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                性别：{marketingUnitData?.targetingGender}
              </span>
              {marketingUnitData?.excludeConverted && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  排除已转化
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 创意信息 */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 font-medium text-gray-900">
          创意列表（{creativeData.length}个）
        </div>
        <div className="divide-y">
          {creativeData.map((creative, index) => (
            <div key={index} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">创意 {index + 1}</h4>
                {creative.videoName && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                    已上传视频
                  </span>
                )}
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">文案：</span>
                  <p className="text-gray-900 mt-1 line-clamp-2">{creative.copy}</p>
                </div>
                <div>
                  <span className="text-gray-500">落地页：</span>
                  <p className="text-gray-900 mt-1 font-mono text-xs break-all">{creative.landingPage}</p>
                </div>
                <div className="flex space-x-4 text-xs text-gray-500">
                  <span>品牌形象：{creative.brandImage}</span>
                  <span>营销组件：{creative.marketingComponent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JSON预览 */}
      <div className="border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setShowJson(!showJson)}
          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-900 flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>查看JSON数据</span>
          </span>
          <span className="text-gray-500">{showJson ? '收起' : '展开'}</span>
        </button>
        
        {showJson && (
          <div className="p-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {JSON.stringify({ marketingUnit: marketingUnitData, creatives: creativeData }, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-between pt-4 border-t">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>上一步</span>
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>提交中...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>确认提交</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
