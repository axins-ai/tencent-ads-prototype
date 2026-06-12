interface Props {
  progress: number
  onClose: () => void
}

export function ProgressToast({ progress, onClose }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-80">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">后台搭建中</span>
        </div>
        <button onClick={onClose} className="text-gray-400">✕</button>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span>搭建进度</span>
          <span className="font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
