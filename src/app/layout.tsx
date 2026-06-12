import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '腾讯广告批量计划管理 - 工作台',
  description: '多账户批量创建广告工作台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">{children}</body>
    </html>
  )
}
