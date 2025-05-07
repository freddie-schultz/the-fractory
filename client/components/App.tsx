import ChaosGame from './ChaosGame'

export default function App() {
  return (
    <>
      <div className="app">
        <h1>The Fractory</h1>
        {/* <canvas
          id="chaosGameCanvas"
          width="1000"
          height="1000"
          style={{ border: '1px solid black' }}
        ></canvas> */}
        <ChaosGame />
      </div>
    </>
  )
}
