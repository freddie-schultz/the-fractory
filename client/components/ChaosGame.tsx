import { useState } from 'react'
import Canvas from './Canvas'
import { Point } from '../../models/canvas.ts'

export default function ChaosGame() {
  const [showCanvas, setShowCanvas] = useState(false)

  const toggleShowCanvas = () => {
    setShowCanvas(!showCanvas)
  }

  const drawChaosGame = (
    canvasContext: CanvasRenderingContext2D,
    numberOfPoints: number,
  ) => {
    if (numberOfPoints < 3) return

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

    const drawBigPoint = (point: Point) => {
      canvasContext.fillRect(point[0] - 5, point[1] - 5, 10, 10)
    }

    const toRadians = (degrees: number) => {
      return degrees * (Math.PI / 180)
    }

    const cornerPoints = []
    const angleBetweenCorners = 360 / numberOfPoints
    let currentAngle = angleBetweenCorners

    for (let i = 0; i < numberOfPoints; i++) {
      const newCornerPoint = [
        Math.round(500 + 450 * Math.cos(toRadians(currentAngle))),
        Math.round(500 + 450 * Math.sin(toRadians(currentAngle))),
      ] as Point

      cornerPoints.push(newCornerPoint)
      drawBigPoint(newCornerPoint)
      currentAngle += angleBetweenCorners
    }

    let currentPoint = getRandomPoint()

    for (let i = 0; i < 500000; i++) {
      drawPoint(currentPoint)
      const rand = Math.floor(Math.random() * numberOfPoints)

      currentPoint = halfwayToPoint(currentPoint, cornerPoints[rand])
    }
  }

  const handleDraw = (canvasContext: CanvasRenderingContext2D) => {
    drawChaosGame(canvasContext, 3)
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
