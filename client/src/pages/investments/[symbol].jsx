import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
let tvScriptLoadingPromise

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef()
  const router = useRouter()
  const stock = router.query.symbol
  console.log(stock)

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = resolve

        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current())

    return () => onLoadScriptRef.current = null

    function createWidget() {
      if (document.getElementById('tradingview_d3fc7') && 'TradingView' in window) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `NASDAQ:${stock}`,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_d3fc7'
        })
      }
    }
  }, [])

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_d3fc7' className='h-96' />
      <div className='tradingview-widget-copyright'>
        <a href='https://www.tradingview.com/symbols/NASDAQ-AAPL/' rel='noopener' target='_blank'><span className='blue-text'>AAPL stock chart</span></a> by TradingView
      </div>
    </div>
  )
}
