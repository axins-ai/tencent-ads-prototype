'use client'

import { useState } from 'react'
import { Plus, Trash2, ChevronDown } from 'lucide-react'
import { CreativeConfig } from '@/types'
import { MaterialLibraryModal } from './MaterialLibraryModal'
import { CopyLibraryModal } from './CopyLibraryModal'

interface Props {
  creatives: CreativeConfig[]
  onChange: (c: CreativeConfig[]) => void
}

export function CreativeCardGroup({ creatives, onChange }: Props) {
  const [expanded, setExpanded] = useState(true)
  const [showMaterial, setShowMaterial] = useState(false)
  const [showCopy, setShowCopy] = useState(false)
  const [currentIdx, setCurrentIdx] = useState<number | null>(null)

  const add = () => onChange([...creatives, { id: Date.now().toString(), materials: [], copyTemplate: null, landingPage: '' }])
  const remove = (i: number) => onChange(creatives.filter((_, j) => j !== i))
  const update = (i: number, u: Partial<CreativeConfig>) => {
    const nc = [...creatives]; nc[i] = { ...nc[i], ...u }; onChange(nc)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold text-sm">3</div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">创意配置</h3>
            <p className="text-sm text-gray-500">{creatives.length} 个创意</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 ${expanded ? '' : 'transform -rotate-90'}`} />
      </button>
      
      {expanded && (
        <div className="px-6 pb-6 space-y-4">
          {creatives.map((c, i) => (
            <div key={c.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">创意 {i + 1}</span>
                {creatives.length > 1 && <button onClick={() => remove(i)} className="text-red-600"><Trash2 className="w-4 h-4" /></button>}
              </div>
              
              <button onClick={() => { setCurrentIdx(i); setShowMaterial(true) }} className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500">
                <span className="text-sm">{c.materials.length > 0 ? `已选 ${c.materials.length} 个素材` : '点击选择素材（批量）'}</span>
              </button>
              
              <button onClick={() => { setCurrentIdx(i); setShowCopy(true) }} className="w-full p-3 border border-gray-300 rounded-lg text-left hover:border-blue-500">
                <span className="text-sm">{c.copyTemplate ? c.copyTemplate.title : '点击选择文案模板'}</span>
              </button>
              
              <input value={c.landingPage} onChange={e => update(i, { landingPage: e.target.value })} placeholder="落地页链接" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
          ))}
          <button onClick={add} className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500">+ 添加创意</button>
        </div>
      )}
      
      {showMaterial && <MaterialLibraryModal onSelect={(m) => { if (currentIdx !== null) update(currentIdx, { materials: m }); setShowMaterial(false) }} onClose={() => setShowMaterial(false)} />}
      {showCopy && <CopyLibraryModal onSelect={(c) => { if (currentIdx !== null) update(currentIdx, { copyTemplate: c }); setShowCopy(false) }} onClose={() => setShowCopy(false)} />}
    </div>
  )
}
