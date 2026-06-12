import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '腾讯广告批量计划管理',
  description: '快速创建和管理腾讯广告批量推广计划',
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
