import { useState } from 'react'
import Canvas from './Canvas'
import { Point } from '../../models/canvas.ts'

const toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180)
}

const getRandomPoint = (): Point => {
  const x = Math.floor(Math.random() * 1000)
  const y = Math.floor(Math.random() * 1000)
  return [x, y]
}

const percentDistanceBetweenPoints = (
  pointA: Point,
  pointB: Point,
  percent: number,
): Point => {
  let newX = Math.abs(pointA[0] - pointB[0]) * percent
  let newY = Math.abs(pointA[1] - pointB[1]) * percent

  pointA[0] < pointB[0] ? (newX = pointA[0] + newX) : (newX = pointA[0] - newX)
  pointA[1] < pointB[1] ? (newY = pointA[1] + newY) : (newY = pointA[1] - newY)

  return [newX, newY]
}

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

    const drawPoint = (point: Point) => {
      canvasContext.fillRect(point[0], point[1], 1, 1)
    }

    const drawBigPoint = (point: Point) => {
      canvasContext.fillRect(point[0] - 5, point[1] - 5, 10, 10)
    }

    const cornerPoints = []
    const angleBetweenCorners = 360 / numberOfPoints
    let currentAngle = -90

    for (let i = 0; i < numberOfPoints; i++) {
      const newCornerPoint = [
        Math.round(500 + 450 * Math.cos(toRadians(currentAngle))),
        Math.round(500 + 450 * Math.sin(toRadians(currentAngle))),
      ] as Point

      cornerPoints.push(newCornerPoint)
      drawPoint(newCornerPoint)
      currentAngle += angleBetweenCorners
    }

    let currentPoint = getRandomPoint()

    const percentTravelDistance = (numberOfPoints - 2) / (numberOfPoints - 1)

    for (let i = 0; i < 500000; i++) {
      drawPoint(currentPoint)
      const rand = Math.floor(Math.random() * numberOfPoints)

      currentPoint = percentDistanceBetweenPoints(
        currentPoint,
        cornerPoints[rand],
        percentTravelDistance,
      )
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
