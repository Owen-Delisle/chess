import Piece from "../../components/piece/piece"

type PinBoard = { 
    title: string, 
    board: Piece[], 
    subject_piece: Piece, 
    expected_result: string[] 
}

export default PinBoard