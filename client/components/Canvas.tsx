import { useEffect, useRef } from 'react'

interface Props {
  draw: (canvasContext: CanvasRenderingContext2D) => void
  width: number
  height: number
}

export default function Canvas(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const canvasContext = canvas.getContext('2d')

    if (!canvasContext) return

    canvasContext.clearRect(0, 0, canvas.width, canvas.height)

    props.draw(canvasContext)
  }, [props])

  return (
    <canvas ref={canvasRef} width={props.width} height={props.height}></canvas>
  )
}
