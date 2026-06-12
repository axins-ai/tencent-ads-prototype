'use client'

interface Props {
  expectedCount: number
  isBuilding: boolean
  buildProgress: number
}

export function PreviewPanel({ expectedCount, isBuilding, buildProgress }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">预览</h3>
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-2xl font-bold text-blue-600">{expectedCount}</p>
        <p className="text-xs text-gray-600">预计创建广告数量</p>
      </div>
      {isBuilding && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>搭建进度</span>
            <span className="font-bold text-blue-600">{buildProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${buildProgress}%` }} 
            />
          </div>
        </div>
      )}
    </div>
  )
}
