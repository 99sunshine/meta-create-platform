import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// 用动态 import 加载主组件，失败时把错误显示在页面上
function LoadApp() {
  const [App, setApp] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    import('./meta-create-platform.jsx')
      .then((m) => setApp(() => m.default))
      .catch((e) => setError(e))
  }, [])

  if (error) {
    return (
      <div style={{ padding: 24, background: '#1e293b', color: '#f1f5f9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#f87171', marginBottom: 16 }}>主应用加载失败</h1>
        <pre style={{ background: '#0f172a', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: 13, whiteSpace: 'pre-wrap' }}>
          {error?.message || String(error)}
        </pre>
      </div>
    )
  }

  if (!App) {
    return (
      <div style={{ minHeight: '100vh', background: '#0F1729', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
        加载中...
      </div>
    )
  }

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadApp />
  </React.StrictMode>,
)
