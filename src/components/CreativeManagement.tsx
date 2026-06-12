'use client'

import { useState } from 'react'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Plus, Trash2, Upload, Image as ImageIcon, Video, ArrowLeft, ArrowRight } from 'lucide-react'

const creativeSchema = z.object({
  creatives: z.array(z.object({
    id: z.string(),
    videoFile: z.any().optional(),
    videoName: z.string().optional(),
    copy: z.string().min(1, '请输入文案'),
    landingPage: z.string().min(1, '请输入落地页链接'),
  })).min(1, '至少添加一个创意'),
  
  // 共用设置
  creativeEnhancementMax: z.boolean().default(false),
  brandImage: z.string().default('视频号'),
  marketingComponent: z.string().default('浮层卡片'),
})

type CreativeFormData = z.infer<typeof creativeSchema>

export function CreativeManagement({ 
  onSubmit, 
  onBack, 
  marketingUnitData,
  initialData 
}: { 
  onSubmit: (data: any[]) => void
  onBack: () => void
  marketingUnitData: any
  initialData: any[]
}) {
  const { control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CreativeFormData>({
    resolver: zodResolver(creativeSchema),
    defaultValues: initialData ? { creatives: initialData } : {
      creatives: [
        { id: '1', videoName: '', copy: '', landingPage: '' }
      ],
      creativeEnhancementMax: false,
      brandImage: '视频号',
      marketingComponent: '浮层卡片',
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'creatives',
  })

  const [uploadingVideo, setUploadingVideo] = useState<string | null>(null)

  const handleVideoUpload = (index: number, file: File) => {
    setValue(`creatives.${index}.videoFile`, file)
    setValue(`creatives.${index}.videoName`, file.name)
  }

  const addCreative = () => {
    append({
      id: Date.now().toString(),
      videoName: '',
      copy: '',
      landingPage: '',
    })
  }

  const handleFormSubmit = (data: CreativeFormData) => {
    // 为每个创意添加共用设置
    const creativesWithShared = data.creatives.map(creative => ({
      ...creative,
      brandImage: data.brandImage,
      marketingComponent: data.marketingComponent,
      creativeEnhancementMax: data.creativeEnhancementMax,
    }))
    onSubmit(creativesWithShared)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">新建创意</h2>
        <p className="mt-1 text-sm text-gray-600">上传视频、编写文案、配置落地页</p>
      </div>

      {/* 共用设置 */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h3 className="font-medium text-gray-900">共用设置（所有创意共用）</h3>
        
        {/* 创意增强max */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-700">创意增强max</label>
          <button
            type="button"
            onClick={() => setValue('creativeEnhancementMax', !watch('creativeEnhancementMax'))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              watch('creativeEnhancementMax') ? 'bg-primary-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                watch('creativeEnhancementMax') ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* 品牌形象 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            品牌形象
          </label>
          <select
            {...register('brandImage')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="视频号">视频号</option>
            <option value="公众号">公众号</option>
            <option value="品牌Logo">品牌Logo</option>
          </select>
        </div>

        {/* 营销组件 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            营销组件
          </label>
          <select
            {...register('marketingComponent')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="浮层卡片">浮层卡片</option>
            <option value="按钮">按钮</option>
            <option value="表单">表单</option>
          </select>
        </div>
      </div>

      {/* 创意列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">
            创意列表
            <span className="ml-2 text-sm text-gray-500">
              （{fields.length}个创意，一个视频+一个文案=一个创意）
            </span>
          </h3>
          <button
            type="button"
            onClick={addCreative}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>添加创意</span>
          </button>
        </div>

        {errors.creatives && (
          <p className="text-sm text-red-600">{errors.creatives.message}</p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">创意 {index + 1}</h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 上传视频 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                上传视频 <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                {watch(`creatives.${index}.videoName`) ? (
                  <div className="space-y-2">
                    <Video className="w-8 h-8 text-green-500 mx-auto" />
                    <p className="text-sm text-gray-700">{watch(`creatives.${index}.videoName`)}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setValue(`creatives.${index}.videoFile`, undefined)
                        setValue(`creatives.${index}.videoName`, '')
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      删除视频
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">点击上传视频</p>
                    <p className="text-xs text-gray-500 mt-1">支持 MP4、MOV 格式</p>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleVideoUpload(index, file)
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* 文案 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                文案 <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register(`creatives.${index}.copy`)}
                rows={3}
                placeholder="请输入广告文案..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.creatives?.[index]?.copy && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.creatives[index]?.copy?.message}
                </p>
              )}
            </div>

            {/* 落地页 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                落地页 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  {...register(`creatives.${index}.landingPage`)}
                  placeholder="卡博士链接 + 宏参数（如：https://example.com?click_id={CLICK_ID}）"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500">常用宏参数：</span>
                  {['{CLICK_ID}', '{IP}', '{UA}', '{TIME}'].map(macro => (
                    <button
                      key={macro}
                      type="button"
                      onClick={() => {
                        const current = watch(`creatives.${index}.landingPage`) || ''
                        setValue(`creatives.${index}.landingPage`, current + macro)
                      }}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                    >
                      {macro}
                    </button>
                  ))}
                </div>
              </div>
              {errors.creatives?.[index]?.landingPage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.creatives[index]?.landingPage?.message}
                </p>
              )}
            </div>
          </div>
        ))}
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
          type="submit"
          className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <span>下一步：预览并提交</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}
