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
  form: ChaosGameForm,
) => {
  if (form.numberOfCorners < 3) return
  if (form.numberOfIterations > 1000000) return

  const drawPoint = (point: Point) => {
    canvasContext.fillRect(point[0], point[1], 1, 1)
  }

  const cornerPoints = []
  const angleBetweenCorners = 360 / form.numberOfCorners
  let currentAngle = -90 + Number(form.angleOfRotation)

  for (let i = 0; i < form.numberOfCorners; i++) {
    const newCornerPoint = [
      Math.round(500 + 450 * Math.cos(toRadians(currentAngle))),
      Math.round(500 + 450 * Math.sin(toRadians(currentAngle))),
    ] as Point

    cornerPoints.push(newCornerPoint)
    currentAngle += angleBetweenCorners
  }

  let currentPoint = getRandomPoint()

  const percentTravelDistance =
    (form.numberOfCorners - 2) / (form.numberOfCorners - 1)

  for (let i = 0; i < form.numberOfIterations; i++) {
    drawPoint(currentPoint)
    const rand = Math.floor(Math.random() * form.numberOfCorners)

    currentPoint = percentDistanceBetweenPoints(
      currentPoint,
      cornerPoints[rand],
      percentTravelDistance,
    )
  }
}

interface ChaosGameForm {
  numberOfCorners: number
  numberOfIterations: number
  angleOfRotation: number
}

export default function ChaosGame() {
  const [formState, setFormState] = useState<ChaosGameForm>({
    numberOfCorners: 3,
    numberOfIterations: 200000,
    angleOfRotation: 0,
  })

  const handleDraw = (canvasContext: CanvasRenderingContext2D) => {
    drawChaosGame(canvasContext, formState)
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
            {`Number of corners: ${formState.numberOfCorners} `}
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
          <label htmlFor="numberOfIterations">{`Number of iterations: `}</label>
          <input
            id="numberOfIterations"
            type="text"
            value={formState.numberOfIterations}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="angleOfRotation">
            {`Angle of rotation: ${formState.angleOfRotation} `}
          </label>
          <input
            id="angleOfRotation"
            type="range"
            min="0"
            max="359"
            value={formState.angleOfRotation}
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
