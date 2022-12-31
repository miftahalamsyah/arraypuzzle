import { useSelector } from "react-redux"

const Header = () => {
  const { moves } = useSelector((state) => state.game)

  return (
    <div className="header">
      <h1>Puzzle Array 4x4</h1>
        <div className="p">
            <p>Implementasi Array dengan Mengurutkan array secara ascending dengan ukuran 4x4</p>
        </div>
      <div className="point-container">
        <div>
          <p>Banyaknya Gerakan:</p>
          <span>{moves}</span>
        </div>
        <div>
          <p>Gerakan Tersisa: </p>
          <span>{500 - moves}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
