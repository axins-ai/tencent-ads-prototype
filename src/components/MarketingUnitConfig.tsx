'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { MarketingUnitConfig as ConfigType } from '@/types'

interface Props {
  data: ConfigType
  onChange: (data: ConfigType) => void
}

const regions = ['北京','上海','广州','深圳','成都','杭州','武汉','西安','南京','重庆','天津','苏州','长沙','郑州','东莞','青岛']

export function MarketingUnitConfig({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState(true)
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold text-sm">2</div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">营销单元配置</h3>
            <p className="text-sm text-gray-500">配置广告投放的基本信息和定向设置</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 ${expanded ? '' : 'transform -rotate-90'}`} />
      </button>
      
      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">营销目的</label>
              <select value={data.marketingPurpose} onChange={e => onChange({...data, marketingPurpose: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option>线索留资</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">具体产品</label>
              <input value={data.productType} onChange={e => onChange({...data, productType: e.target.value})} placeholder="请输入具体产品" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">地域（可多选）</label>
            <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto p-2 border border-gray-300 rounded-lg">
              {regions.map(r => (
                <label key={r} className="flex items-center space-x-2">
                  <input type="checkbox" checked={data.targetingRegions.includes(r)} onChange={e => {
                    const newR = e.target.checked ? [...data.targetingRegions, r] : data.targetingRegions.filter(x => x !== r)
                    onChange({...data, targetingRegions: newR})
                  }} className="rounded text-blue-600" />
                  <span className="text-xs">{r}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">出价（元）</label>
              <input type="number" step="0.01" value={data.bidAmount} onChange={e => onChange({...data, bidAmount: parseFloat(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">日预算</label>
              <select value={data.dailyBudget} onChange={e => onChange({...data, dailyBudget: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>不限</option>
                <option>100</option>
                <option>500</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">营销单元名称</label>
            <input value={data.unitName} onChange={e => onChange({...data, unitName: e.target.value})} placeholder="请输入营销单元名称" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      )}
    </div>
  )
}
