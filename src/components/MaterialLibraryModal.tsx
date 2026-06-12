'use client'

import { useState } from 'react'
import { X, Check, BarChart3 } from 'lucide-react'
import { Material } from '@/types'
import { MockData } from '@/lib/mock-data'

interface Props {
  onSelect: (m: Material[]) => void
  onClose: () => void
}

export function MaterialLibraryModal({ onSelect, onClose }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'ctr' | 'cvr'>('ctr')
  
  const sorted = [...MockData.materials].sort((a, b) => 
    sortBy === 'ctr' ? b.stats7d.ctr - a.stats7d.ctr : b.stats7d.cvr - a.stats7d.cvr
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold">素材库（近7日数据）</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        
        <div className="px-6 py-3 border-b bg-gray-50 flex items-center space-x-3">
          <div className="flex space-x-2">
            {['ctr', 'cvr'].map(key => (
              <button key={key} onClick={() => setSortBy(key as any)}
                className={`px-3 py-1 rounded text-sm ${sortBy === key ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                {key === 'ctr' ? '按CTR排序' : '按CVR排序'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            {sorted.map(m => (
              <div key={m.id} onClick={() => {
                const s = new Set(selected)
                s.has(m.id) ? s.delete(m.id) : s.add(m.id)
                setSelected(s)
              }} className={`border-2 rounded-lg p-4 cursor-pointer ${selected.has(m.id) ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selected.has(m.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                    {selected.has(m.id) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">{m.name}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-500">CTR</p>
                        <p className="font-bold text-green-600">{(m.stats7d.ctr * 100).toFixed(2)}%</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-500">CVR</p>
                        <p className="font-bold text-blue-600">{(m.stats7d.cvr * 100).toFixed(2)}%</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-500">消耗</p>
                        <p className="font-bold">¥{m.stats7d.spend.toFixed(0)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
          <span className="text-sm">已选择 {selected.size} 个素材</span>
          <div className="flex space-x-3">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg">取消</button>
            <button onClick={() => onSelect(MockData.materials.filter(m => selected.has(m.id)))} 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg">确认选择</button>
          </div>
        </div>
      </div>
    </div>
  )
}
