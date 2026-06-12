'use client'

import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { MockData } from '@/lib/mock-data'

interface AccountSelectorProps {
  data: { product: string; channel: string; accounts: string[] }
  onChange: (data: { product: string; channel: string; accounts: string[] }) => void
}

export function AccountSelector({ data, onChange }: AccountSelectorProps) {
  const [expanded, setExpanded] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  
  const products = ['运营商产品', '电商产品', '应用产品']
  const channels = ['微信视频号', '微信公众号', '朋友圈']
  
  const filteredAccounts = MockData.accounts.filter(acc => {
    if (data.product && acc.product !== data.product) return false
    if (data.channel && acc.channel !== data.channel) return false
    return true
  })
  
  const toggleAccount = (id: string) => {
    const newAccounts = data.accounts.includes(id)
      ? data.accounts.filter(a => a !== id)
      : [...data.accounts, id]
    onChange({ ...data, accounts: newAccounts })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">1</div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">选择产品、渠道、账户</h3>
            <p className="text-sm text-gray-500">{data.product || '未选择'} / {data.channel || '未选择'} / {data.accounts.length} 个账户</p>
          </div>
        </div>
        {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 transform -rotate-90" />}
      </button>
      
      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">产品</label>
            <div className="flex space-x-2">
              {products.map(p => (
                <button key={p} onClick={() => onChange({ ...data, product: p, accounts: [] })}
                  className={`px-4 py-2 rounded-lg text-sm ${data.product === p ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">渠道</label>
            <div className="flex space-x-2">
              {channels.map(c => (
                <button key={c} onClick={() => onChange({ ...data, channel: c, accounts: [] })}
                  className={`px-4 py-2 rounded-lg text-sm ${data.channel === c ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">账户（可多选）</label>
            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between">
                <span className={data.accounts.length > 0 ? 'text-gray-900' : 'text-gray-400'}>
                  {data.accounts.length > 0 ? `已选择 ${data.accounts.length} 个账户` : '请选择账户'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {filteredAccounts.map(acc => (
                    <label key={acc.id} onClick={() => toggleAccount(acc.id)} className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <div className={`w-5 h-5 rounded border-2 ${data.accounts.includes(acc.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                        {data.accounts.includes(acc.id) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-gray-900">{acc.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
