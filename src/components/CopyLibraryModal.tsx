'use client'

import { X, Check, BarChart3 } from 'lucide-react'
import { CopyTemplate } from '@/types'
import { MockData } from '@/lib/mock-data'

interface Props {
  onSelect: (c: CopyTemplate) => void
  onClose: () => void
}

export function CopyLibraryModal({ onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold">文案库（近7日数据）</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {MockData.copyTemplates.map(c => (
            <button key={c.id} onClick={() => onSelect(c)} 
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50">
              <h4 className="font-medium text-gray-900 mb-1">{c.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{c.content}</p>
              <div className="flex space-x-4 text-xs">
                <span>曝光: {c.stats7d.impressions.toLocaleString()}</span>
                <span>CTR: {(c.stats7d.ctr * 100).toFixed(2)}%</span>
              </div>
            </button>
          ))}
        </div>
        <div className="px-6 py-4 border-t bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">关闭</button>
        </div>
      </div>
    </div>
  )
}
