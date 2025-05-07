import { useState } from 'react'
import Canvas from './Canvas'

export default function ChaosGame() {
  const [showCanvas, setShowCanvas] = useState(false)

  const toggleShowCanvas = () => {
    setShowCanvas(!showCanvas)
  }

  const handleDraw = (canvasContext: CanvasRenderingContext2D) => {
    canvasContext.fillRect(30, 30, 10, 10)
  }

  return (
    <>
      <div>
        <button onClick={toggleShowCanvas}>Draw</button>
      </div>
      <div>
        {showCanvas && <Canvas draw={handleDraw} width={1000} height={1000} />}
      </div>
    </>
  )
}
