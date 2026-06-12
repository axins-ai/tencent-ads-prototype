'use client'

import { useState } from 'react'
import { MarketingUnitForm } from '@/components/MarketingUnitForm'
import { CreativeManagement } from '@/components/CreativeManagement'
import { PreviewSubmit } from '@/components/PreviewSubmit'
import { CheckCircle, Sparkles, Layers } from 'lucide-react'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [marketingUnitData, setMarketingUnitData] = useState<any>(null)
  const [creativeData, setCreativeData] = useState<any[]>([])

  const steps = [
    { id: 1, name: '新建营销单元', icon: Sparkles },
    { id: 2, name: '新建创意', icon: Layers },
    { id: 3, name: '预览并提交', icon: CheckCircle },
  ]

  const handleMarketingUnitSubmit = (data: any) => {
    setMarketingUnitData(data)
    setCurrentStep(2)
  }

  const handleCreativeSubmit = (data: any[]) => {
    setCreativeData(data)
    setCurrentStep(3)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">腾讯广告批量计划管理</h1>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex justify-center mb-8">
          <ol className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <li key={step.id}>
                <div className="flex items-center">
                  {index > 0 && (
                    <div className="hidden sm:block w-16 h-0.5 bg-gray-200 mr-4" />
                  )}
                  <button
                    onClick={() => {
                      if (step.id < currentStep) {
                        setCurrentStep(step.id)
                      }
                    }}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentStep === step.id
                        ? 'bg-primary-600 text-white'
                        : currentStep > step.id
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <step.icon className="w-4 h-4 mr-2" />
                    {step.name}
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </nav>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {currentStep === 1 && (
            <MarketingUnitForm
              onSubmit={handleMarketingUnitSubmit}
              initialData={marketingUnitData}
            />
          )}
          
          {currentStep === 2 && (
            <CreativeManagement
              onSubmit={handleCreativeSubmit}
              onBack={handleBack}
              marketingUnitData={marketingUnitData}
              initialData={creativeData}
            />
          )}
          
          {currentStep === 3 && (
            <PreviewSubmit
              marketingUnitData={marketingUnitData}
              creativeData={creativeData}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </main>
  )
}
