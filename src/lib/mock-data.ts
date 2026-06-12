export const MockData = {
  accounts: [
    { id: 'acc_001', name: '账户A-运营商', product: '运营商产品', channel: '微信视频号' },
    { id: 'acc_002', name: '账户B-运营商', product: '运营商产品', channel: '微信视频号' },
    { id: 'acc_003', name: '账户C-电商', product: '电商产品', channel: '微信视频号' },
    { id: 'acc_004', name: '账户D-运营商', product: '运营商产品', channel: '朋友圈' },
    { id: 'acc_005', name: '账户E-运营商', product: '运营商产品', channel: '微信视频号' },
  ],

  materials: [
    { 
      id: 'mat_001', name: '产品介绍视频-15s.mp4', type: 'video' as const, 
      url: '', size: 2048000, duration: 15,
      stats7d: { impressions: 125000, clicks: 3200, conversions: 156, spend: 480.5, ctr: 0.0256, cvr: 0.0488 }
    },
    { 
      id: 'mat_002', name: '促销视频-30s.mp4', type: 'video' as const, 
      url: '', size: 5120000, duration: 30,
      stats7d: { impressions: 98000, clicks: 4500, conversions: 230, spend: 620.0, ctr: 0.0459, cvr: 0.0511 }
    },
    { 
      id: 'mat_003', name: '品牌宣传图-1200x628.jpg', type: 'image' as const, 
      url: '', size: 512000,
      stats7d: { impressions: 200000, clicks: 5800, conversions: 310, spend: 350.2, ctr: 0.0290, cvr: 0.0534 }
    },
    { 
      id: 'mat_004', name: '产品特写视频-10s.mp4', type: 'video' as const, 
      url: '', size: 1536000, duration: 10,
      stats7d: { impressions: 156000, clicks: 2800, conversions: 142, spend: 520.8, ctr: 0.0179, cvr: 0.0507 }
    },
    { 
      id: 'mat_005', name: '优惠活动图-1200x628.jpg', type: 'image' as const, 
      url: '', size: 768000,
      stats7d: { impressions: 180000, clicks: 6200, conversions: 340, spend: 480.0, ctr: 0.0344, cvr: 0.0548 }
    },
  ],

  copyTemplates: [
    { 
      id: 'copy_001', title: '运营商产品-优惠版', 
      content: '【限时优惠】办理即享超值套餐，流量翻倍不卡顿！点击立即办理，专属客服为您服务～',
      stats7d: { impressions: 150000, clicks: 4500, ctr: 0.03 }
    },
    { 
      id: 'copy_002', title: '运营商产品-专业版', 
      content: '专业网络服务，覆盖全国98%区域。稳定高速，游戏办公两不误。立即体验！',
      stats7d: { impressions: 120000, clicks: 3600, ctr: 0.03 }
    },
    { 
      id: 'copy_003', title: '运营商产品-简洁版', 
      content: '好网络不贵！超值套餐低至XX元/月，立即办理享优惠！',
      stats7d: { impressions: 180000, clicks: 6300, ctr: 0.035 }
    },
    { 
      id: 'copy_004', title: '运营商产品-信任版', 
      content: '千万用户信赖之选！品牌保障，服务贴心。办理简单，即刻享受高速网络！',
      stats7d: { impressions: 90000, clicks: 2700, ctr: 0.03 }
    },
  ],
}
