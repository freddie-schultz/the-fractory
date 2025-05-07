import { useState } from 'react'
import Canvas from './Canvas'

export default function ChaosGame() {
  const [showCanvas, setShowCanvas] = useState(false)

  const toggleShowCanvas = () => {
    setShowCanvas(!showCanvas)
  }

  const handleDraw = (canvasContext: CanvasRenderingContext2D) => {
    type Point = [number, number]

    const getRandomPoint = (): Point => {
      const x = Math.floor(Math.random() * 1000)
      const y = Math.floor(Math.random() * 1000)
      return [x, y]
    }

    const halfwayToPoint = (currentPoint: Point, newPoint: Point): Point => {
      const newX = (currentPoint[0] + newPoint[0]) / 2
      const newY = (currentPoint[1] + newPoint[1]) / 2
      return [newX, newY]
    }

    const drawPoint = (point: Point) => {
      canvasContext.fillRect(point[0], point[1], 1, 1)
    }

    const point1 = [500, 100] as Point
    const point2 = [100, 793] as Point
    const point3 = [900, 793] as Point

    let currentPoint = getRandomPoint()

    for (let i = 0; i < 1000000; i++) {
      drawPoint(currentPoint)
      const rand = Math.floor(Math.random() * 3)
      switch (rand) {
        case 0:
          currentPoint = halfwayToPoint(currentPoint, point1)
          break
        case 1:
          currentPoint = halfwayToPoint(currentPoint, point2)
          break
        case 2:
          currentPoint = halfwayToPoint(currentPoint, point3)
          break
      }
    }
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
