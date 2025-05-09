import React, { useState } from 'react'
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

const drawChaosGame = (
  canvasContext: CanvasRenderingContext2D,
  numberOfPoints: number,
  numberOfIterations: number,
) => {
  if (numberOfPoints < 3) return

  const drawPoint = (point: Point) => {
    canvasContext.fillRect(point[0], point[1], 1, 1)
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
    currentAngle += angleBetweenCorners
  }

  let currentPoint = getRandomPoint()

  const percentTravelDistance = (numberOfPoints - 2) / (numberOfPoints - 1)

  for (let i = 0; i < numberOfIterations; i++) {
    drawPoint(currentPoint)
    const rand = Math.floor(Math.random() * numberOfPoints)

    currentPoint = percentDistanceBetweenPoints(
      currentPoint,
      cornerPoints[rand],
      percentTravelDistance,
    )
  }
}

interface Form {
  numberOfCorners: number
  numberOfIterations: number
}

export default function ChaosGame() {
  const [formState, setFormState] = useState<Form>({
    numberOfCorners: 3,
    numberOfIterations: 200000,
  })

  const handleDraw = (canvasContext: CanvasRenderingContext2D) => {
    drawChaosGame(
      canvasContext,
      formState.numberOfCorners,
      formState.numberOfIterations,
    )
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <div style={{ margin: '20px' }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="numberOfCorners">
            Number of corners: {formState.numberOfCorners}
          </label>
          <input
            id="numberOfCorners"
            type="range"
            min="3"
            max="10"
            value={formState.numberOfCorners}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="numberOfIterations">Number of iterations: </label>
          <input
            id="numberOfIterations"
            type="text"
            value={formState.numberOfIterations}
            onChange={handleChange}
          />
        </form>
      </div>
      <div>
        <Canvas draw={handleDraw} width={1000} height={1000} />
      </div>
    </>
  )
}
