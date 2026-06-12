'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { ChevronRight, ChevronDown, Plus, X } from 'lucide-react'

const marketingUnitSchema = z.object({
  // 营销目的
  marketingPurpose: z.string().min(1, '请选择营销目的'),
  
  // 推广产品
  productCategory: z.string().min(1, '请选择产品类别'),
  productType: z.string().min(1, '请选择具体产品'),
  
  // 营销载体
  marketingCarrier: z.string().min(1, '请选择营销载体'),
  
  // 转化
  conversionType: z.string().min(1, '请选择转化类型'),
  
  // 投放版位
  adPlacement: z.string().min(1, '请选择投放版位'),
  placementScenario: z.string().min(1, '请选择版位定投场景'),
  
  // 定向配置
  targetingRegions: z.array(z.string()).min(1, '请选择投放地域'),
  targetingAgeMin: z.number().min(18).max(65),
  targetingAgeMax: z.number().min(18).max(65),
  targetingGender: z.string().min(1, '请选择性别定向'),
  customAudience: z.string().optional(),
  excludeConverted: z.boolean().default(true),
  
  // 出价与预算
  billingMethod: z.string().min(1, '请选择计费方式'),
  bidScenario: z.string().min(1, '请选择出价场景'),
  bidAmount: z.number().min(0.01, '出价必须大于0'),
  firstPartyBoost: z.boolean().default(false),
  oneClickBoost: z.boolean().default(false),
  dailyBudget: z.string().min(1, '请设置日预算'),
  
  // 投放设置
  deliveryStartDate: z.string().min(1, '请选择开始日期'),
  deliveryEndDate: z.string().optional(),
  deliveryTime: z.string().default('all_day'),
  firstDayStartTime: z.boolean().default(false),
  
  // 营销单元名称
  unitName: z.string().min(1, '请设置营销单元名称'),
})

type MarketingUnitFormData = z.infer<typeof marketingUnitSchema>

const chineseRegions = [
  '北京', '上海', '广州', '深圳', '成都', '杭州', '武汉', '西安',
  '南京', '重庆', '天津', '苏州', '长沙', '郑州', '东莞', '青岛',
  '沈阳', '宁波', '昆明', '无锡', '厦门', '合肥', '大连', '福州',
  '济南', '温州', '哈尔滨', '石家庄', '佛山', '长春', '常州', '泉州'
]

export function MarketingUnitForm({ 
  onSubmit, 
  initialData 
}: { 
  onSubmit: (data: any) => void
  initialData: any 
}) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['basic', 'targeting', 'bidding', 'delivery'])
  )
  
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useForm<MarketingUnitFormData>({
    resolver: zodResolver(marketingUnitSchema),
    defaultValues: initialData || {
      marketingPurpose: '线索留资',
      productCategory: '运营商产品',
      productType: '',
      marketingCarrier: '页面跳转',
      conversionType: '数据源上报',
      adPlacement: '微信视频号',
      placementScenario: '视频号信息流-视频号入口',
      targetingRegions: [],
      targetingAgeMin: 18,
      targetingAgeMax: 65,
      targetingGender: '',
      customAudience: '',
      excludeConverted: true,
      billingMethod: 'oCPM',
      bidScenario: '常规投放',
      bidAmount: 0.5,
      firstPartyBoost: false,
      oneClickBoost: false,
      dailyBudget: '不限',
      deliveryStartDate: new Date().toISOString().split('T')[0],
      deliveryEndDate: '',
      deliveryTime: 'all_day',
      firstDayStartTime: false,
      unitName: '',
    }
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }

  const selectedRegions = watch('targetingRegions')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">新建营销单元</h2>
        <p className="mt-1 text-sm text-gray-600">配置广告投放的基本信息和定向设置</p>
      </div>

      {/* 基本信息 */}
      <div className="border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('basic')}
          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-900">基本信息</span>
          {expandedSections.has('basic') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
        
        {expandedSections.has('basic') && (
          <div className="p-4 space-y-4">
            {/* 营销目的 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                营销目的 <span className="text-red-500">*</span>
              </label>
              <select
                {...register('marketingPurpose')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="线索留资">线索留资</option>
                <option value="品牌推广">品牌推广</option>
                <option value="应用推广">应用推广</option>
                <option value="电商推广">电商推广</option>
              </select>
              {errors.marketingPurpose && (
                <p className="mt-1 text-sm text-red-600">{errors.marketingPurpose.message}</p>
              )}
            </div>

            {/* 推广产品 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  推广产品 <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('productCategory')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="运营商产品">运营商产品</option>
                  <option value="电商产品">电商产品</option>
                  <option value="应用产品">应用产品</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  具体产品 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('productType')}
                  placeholder="请输入具体产品名称"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.productType && (
                  <p className="mt-1 text-sm text-red-600">{errors.productType.message}</p>
                )}
              </div>
            </div>

            {/* 营销载体 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                营销载体 <span className="text-red-500">*</span>
              </label>
              <select
                {...register('marketingCarrier')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="页面跳转">页面跳转</option>
                <option value="应用下载">应用下载</option>
                <option value="微信小程序">微信小程序</option>
              </select>
            </div>

            {/* 转化 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                转化 <span className="text-red-500">*</span>
              </label>
              <select
                {...register('conversionType')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="数据源上报">数据源上报</option>
                <option value="落地页转化">落地页转化</option>
                <option value="应用转化">应用转化</option>
              </select>
            </div>

            {/* 投放版位 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  投放版位 <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('adPlacement')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="微信视频号">微信视频号</option>
                  <option value="微信公众号">微信公众号</option>
                  <option value="朋友圈">朋友圈</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  版位定投场景 <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('placementScenario')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="视频号信息流-视频号入口">视频号信息流-视频号入口</option>
                  <option value="视频号信息流-推荐入口">视频号信息流-推荐入口</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 定向配置 */}
      <div className="border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('targeting')}
          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-900">定向配置</span>
          {expandedSections.has('targeting') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
        
        {expandedSections.has('targeting') && (
          <div className="p-4 space-y-4">
            {/* 地域定向 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                地域 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-3 border border-gray-300 rounded-md">
                {chineseRegions.map(region => (
                  <label key={region} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={region}
                      checked={selectedRegions?.includes(region) || false}
                      onChange={(e) => {
                        const current = watch('targetingRegions') || []
                        if (e.target.checked) {
                          setValue('targetingRegions', [...current, region])
                        } else {
                          setValue('targetingRegions', current.filter(r => r !== region))
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{region}</span>
                  </label>
                ))}
              </div>
              {errors.targetingRegions && (
                <p className="mt-1 text-sm text-red-600">{errors.targetingRegions.message}</p>
              )}
            </div>

            {/* 年龄定向 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  年龄（最小）
                </label>
                <input
                  type="number"
                  {...register('targetingAgeMin', { valueAsNumber: true })}
                  min={18}
                  max={65}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  年龄（最大）
                </label>
                <input
                  type="number"
                  {...register('targetingAgeMax', { valueAsNumber: true })}
                  min={18}
                  max={65}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* 性别定向 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                性别 <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                {['不限', '男', '女'].map(gender => (
                  <label key={gender} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value={gender}
                      {...register('targetingGender')}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{gender}</span>
                  </label>
                ))}
              </div>
              {errors.targetingGender && (
                <p className="mt-1 text-sm text-red-600">{errors.targetingGender.message}</p>
              )}
            </div>

            {/* 自定义人群 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                自定义人群（可选）
              </label>
              <input
                type="text"
                {...register('customAudience')}
                placeholder="请输入自定义人群包ID或名称"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* 排除已转化人群 */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('excludeConverted')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="text-sm text-gray-700">
                排除已转化人群
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 出价与预算 */}
      <div className="border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('bidding')}
          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-900">出价与预算</span>
          {expandedSections.has('bidding') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
        
        {expandedSections.has('bidding') && (
          <div className="p-4 space-y-4">
            {/* 计费方式 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                计费方式 <span className="text-red-500">*</span>
              </label>
              <select
                {...register('billingMethod')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="oCPM">oCPM</option>
                <option value="CPM">CPM</option>
                <option value="CPC">CPC</option>
                <option value="oCPC">oCPC</option>
              </select>
            </div>

            {/* 出价场景 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                出价场景 <span className="text-red-500">*</span>
              </label>
              <select
                {...register('bidScenario')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="常规投放">常规投放</option>
                <option value="优先跑量">优先跑量</option>
                <option value="优先低成本">优先低成本</option>
              </select>
            </div>

            {/* 出价设定 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                出价（元） <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('bidAmount', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.bidAmount && (
                <p className="mt-1 text-sm text-red-600">{errors.bidAmount.message}</p>
              )}
            </div>

            {/* 开关选项 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">一方数据跑量加强</label>
                <button
                  type="button"
                  onClick={() => setValue('firstPartyBoost', !watch('firstPartyBoost'))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    watch('firstPartyBoost') ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      watch('firstPartyBoost') ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">一键起量</label>
                <button
                  type="button"
                  onClick={() => setValue('oneClickBoost', !watch('oneClickBoost'))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    watch('oneClickBoost') ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      watch('oneClickBoost') ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* 日预算 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                营销单元日预算 <span className="text-red-500">*</span>
              </label>
              <select
                {...register('dailyBudget')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="不限">不限</option>
                <option value="100">100元/天</option>
                <option value="300">300元/天</option>
                <option value="500">500元/天</option>
                <option value="1000">1000元/天</option>
                <option value="custom">自定义</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 投放设置 */}
      <div className="border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('delivery')}
          className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-900">投放设置</span>
          {expandedSections.has('delivery') ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
        
        {expandedSections.has('delivery') && (
          <div className="p-4 space-y-4">
            {/* 投放日期 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  开始日期 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register('deliveryStartDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  结束日期（可选）
                </label>
                <input
                  type="date"
                  {...register('deliveryEndDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="mt-1 text-xs text-gray-500">留空表示长期投放</p>
              </div>
            </div>

            {/* 投放时段 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                投放时段
              </label>
              <select
                {...register('deliveryTime')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all_day">全天</option>
                <option value="morning">上午（6:00-12:00）</option>
                <option value="afternoon">下午（12:00-18:00）</option>
                <option value="evening">晚上（18:00-24:00）</option>
                <option value="custom">自定义时段</option>
              </select>
            </div>

            {/* 首日开始时间 */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('firstDayStartTime')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="text-sm text-gray-700">
                首日立即开始（关闭表示次日开始）
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 营销单元名称 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          营销单元名称 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('unitName')}
          placeholder="请输入营销单元名称"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {errors.unitName && (
          <p className="mt-1 text-sm text-red-600">{errors.unitName.message}</p>
        )}
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          下一步：创建创意
        </button>
      </div>
    </form>
  )
}
