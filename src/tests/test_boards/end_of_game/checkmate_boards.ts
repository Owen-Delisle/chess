import piece_factory from "../../../components/piece/piece_factory/piece_factory"
import { PieceType } from "../../../components/piece/piece_types"
import { Color } from "../../../components/piece/color"
import { RookType } from "../../../components/piece/pieces/rook"
import CheckmateBoard from "../../types/check_mate_board"

const list_of_checkmate_boards: CheckmateBoard[] = [
    anastasias_mate(),
    anderssens_mate(),
    arabian_mate(),
    backrank_mate(),
    belstra_mate(),
    blackburns_mate(),
    blind_swine_mate(),
    bodens_mate(),
    corner_mate(),
    corridor_mate(),
    diagonal_corridor_mate(),
    cozios_mate(),
    damianos_mate(),
    david_and_goliath_mate(),
    epaulette_mate(),
    fools_mate(),
    grecos_mate(),
    h_file_mate(),
    hook_mate(),
    kill_box_mate(),
    lawn_mower_mate(),
    legals_mate(),
    lollis_mate(),
    max_langes_mate(),
    mayets_mate(),
    morphys_mate(),
    opera_mate(),
    pillsburys_mate(),
    retis_mate(),
    scholars_mate(),
    smothered_mate(),
    suffocation_mate(),
    swallows_tail_mate(),
    triangle_mate(),
    vukovic_mate()
]

function anastasias_mate(): CheckmateBoard {
    return {
        title: 'Anastasias Mate', board: [
            piece_factory('king_w', 'H7', PieceType.king, Color.white),
            piece_factory('king_b', 'G1', PieceType.king, Color.black),

            piece_factory('rook_b2', 'H3', PieceType.rook, Color.black, RookType.short_rook),

            piece_factory('knight_b1', 'E7', PieceType.knight, Color.black),

            piece_factory('pawn_b1', 'G7', PieceType.pawn, Color.white),
        ]
    }
}

function anderssens_mate(): CheckmateBoard {
    return {
        title: 'Anderssens Mate', board: [
            piece_factory('king_w', 'G1', PieceType.king, Color.white),
            piece_factory('king_b', 'F3', PieceType.king, Color.black),

            piece_factory('pawn_b1', 'G2', PieceType.pawn, Color.black),

            piece_factory('rook_b2', 'H1', PieceType.rook, Color.black, RookType.short_rook),
        ]
    }
}

function arabian_mate(): CheckmateBoard {
    return {
        title: 'Arabian Mate', board: [
            piece_factory('king_w', 'H1', PieceType.king, Color.white),
            piece_factory('king_b', 'F3', PieceType.king, Color.black),

            piece_factory('knight_w1', 'F3', PieceType.knight, Color.black),

            piece_factory('rook_b2', 'H2', PieceType.rook, Color.black, RookType.short_rook),
        ]
    }
}

function backrank_mate(): CheckmateBoard {
    return {
        title: 'BackRank Mate', board: [
            piece_factory('king_w', 'F1', PieceType.king, Color.white),
            piece_factory('king_b', 'F8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'E2', PieceType.pawn, Color.white),
            piece_factory('pawn_w2', 'F2', PieceType.pawn, Color.white),
            piece_factory('pawn_w3', 'G2', PieceType.pawn, Color.white),

            piece_factory('rook_b2', 'D1', PieceType.rook, Color.black, RookType.short_rook),
        ]
    }
}

function belstra_mate(): CheckmateBoard {
    return {
        title: 'Belstra Mate', board: [
            piece_factory('king_w', 'D1', PieceType.king, Color.white),
            piece_factory('king_b', 'F8', PieceType.king, Color.black),

            piece_factory('queen_b', 'C3', PieceType.queen, Color.black),
            piece_factory('bishop_b1', 'F3', PieceType.bishop, Color.black),
        ]
    }
}

function blackburns_mate(): CheckmateBoard {
    return {
        title: 'Blackburns Mate', board: [
            piece_factory('king_w', 'B1', PieceType.king, Color.white),
            piece_factory('king_b', 'F8', PieceType.king, Color.black),

            piece_factory('bishop_b1', 'A2', PieceType.bishop, Color.black),
            piece_factory('bishop_b2', 'G7', PieceType.bishop, Color.black),

            piece_factory('knight_b1', 'B4', PieceType.knight, Color.black),

            piece_factory('rook_w1', 'C1', PieceType.rook, Color.white, RookType.long_rook),
        ]
    }
}

function blind_swine_mate(): CheckmateBoard {
    return {
        title: 'Blind Swine Mate', board: [
            piece_factory('king_w', 'B1', PieceType.king, Color.white),
            piece_factory('king_b', 'F8', PieceType.king, Color.black),

            piece_factory('rook_w1', 'C1', PieceType.rook, Color.white, RookType.long_rook),

            piece_factory('rook_b1', 'A2', PieceType.rook, Color.black, RookType.long_rook),
            piece_factory('rook_b2', 'B2', PieceType.rook, Color.black, RookType.short_rook),
        ]
    }
}


function bodens_mate(): CheckmateBoard {
    return {
        title: 'Bodens Mate', board: [
            piece_factory('king_w', 'C1', PieceType.king, Color.white),
            piece_factory('king_b', 'F8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'D2', PieceType.pawn, Color.white),

            piece_factory('rook_w1', 'D1', PieceType.rook, Color.white, RookType.long_rook),

            piece_factory('bishop_b1', 'A3', PieceType.bishop, Color.black),
            piece_factory('bishop_b2', 'E4', PieceType.bishop, Color.black),
        ]
    }
}

function corner_mate(): CheckmateBoard {
    return {
        title: 'Corner Mate', board: [
            piece_factory('king_w', 'A1', PieceType.king, Color.white),
            piece_factory('king_b', 'A8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),

            piece_factory('rook_b1', 'B8', PieceType.rook, Color.black, RookType.long_rook),

            piece_factory('knight_b1', 'C2', PieceType.knight, Color.black),
        ]
    }
}

function corridor_mate(): CheckmateBoard {
    return {
        title: 'Corridor Mate', board: [
            piece_factory('king_w', 'C2', PieceType.king, Color.white),
            piece_factory('king_b', 'G8', PieceType.king, Color.black),

            piece_factory('rook_b1', 'B8', PieceType.rook, Color.black, RookType.long_rook),
            piece_factory('rook_b2', 'D8', PieceType.rook, Color.black, RookType.short_rook),

            piece_factory('queen_b', 'C4', PieceType.queen, Color.black),
        ]
    }
}

function diagonal_corridor_mate(): CheckmateBoard {
    return {
        title: 'Diagonal Corridor Mate', board: [
            piece_factory('king_w', 'A1', PieceType.king, Color.white),
            piece_factory('king_b', 'G8', PieceType.king, Color.black),

            piece_factory('bishop_w1', 'B1', PieceType.bishop, Color.white),

            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),

            piece_factory('bishop_b1', 'E5', PieceType.bishop, Color.black),
        ]
    }
}

function cozios_mate(): CheckmateBoard {
    return {
        title: 'Cozios Mate', board: [
            piece_factory('king_w', 'B3', PieceType.king, Color.white),
            piece_factory('king_b', 'B5', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'B2', PieceType.pawn, Color.white),
            piece_factory('queen_w', 'C3', PieceType.queen, Color.white),

            piece_factory('queen_b', 'A4', PieceType.queen, Color.black),
        ]
    }
}

function damianos_mate(): CheckmateBoard {
    return {
        title: 'Damianos Mate', board: [
            piece_factory('king_w', 'B1', PieceType.king, Color.white),
            piece_factory('king_b', 'B8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'B2', PieceType.pawn, Color.white),
            piece_factory('rook_w1', 'C1', PieceType.rook, Color.white, RookType.long_rook),

            piece_factory('pawn_b1', 'B3', PieceType.pawn, Color.black),
            piece_factory('queen_b', 'A2', PieceType.queen, Color.black),
        ]
    }
}

function david_and_goliath_mate(): CheckmateBoard {
    return {
        title: 'David and Goliath Mate', board: [
            piece_factory('king_w', 'B3', PieceType.king, Color.white),
            piece_factory('king_b', 'C5', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'A3', PieceType.pawn, Color.white),
            piece_factory('pawn_w1', 'C3', PieceType.pawn, Color.white),

            piece_factory('pawn_b1', 'A4', PieceType.pawn, Color.black),
            piece_factory('pawn_b1', 'B5', PieceType.pawn, Color.black),

            piece_factory('rook_b1', 'G2', PieceType.rook, Color.black, RookType.long_rook),
        ]
    }
}

function epaulette_mate(): CheckmateBoard {
    return {
        title: 'Epaulette Mate', board: [
            piece_factory('king_w', 'E1', PieceType.king, Color.white),
            piece_factory('king_b', 'B8', PieceType.king, Color.black),

            piece_factory('rook_w1', 'D1', PieceType.rook, Color.white, RookType.long_rook),
            piece_factory('rook_w2', 'F1', PieceType.rook, Color.white, RookType.short_rook),

            piece_factory('queen_b', 'E3', PieceType.queen, Color.black),
        ]
    }
}

function fools_mate(): CheckmateBoard {
    return {
        title: 'Fools Mate', board: [
            piece_factory('king_b', 'E8', PieceType.king, Color.black),
            piece_factory('king_w', 'E1', PieceType.king, Color.white),

            piece_factory('queen_b', 'H4', PieceType.queen, Color.black),
            piece_factory('queen_w', 'D1', PieceType.queen, Color.white),

            piece_factory('bishop_b1', 'C8', PieceType.bishop, Color.black),
            piece_factory('bishop_w1', 'C1', PieceType.bishop, Color.white),
            piece_factory('bishop_b2', 'F8', PieceType.bishop, Color.black),
            piece_factory('bishop_w2', 'F1', PieceType.bishop, Color.white),

            piece_factory('knight_w1', 'B1', PieceType.knight, Color.white),
            piece_factory('knight_b1', 'B8', PieceType.knight, Color.black),
            piece_factory('knight_b2', 'G8', PieceType.knight, Color.black),
            piece_factory('knight_w2', 'G1', PieceType.knight, Color.white),

            piece_factory('rook_b1', 'A8', PieceType.rook, Color.black, RookType.long_rook),
            piece_factory('rook_w1', 'A1', PieceType.rook, Color.white, RookType.long_rook),
            piece_factory('rook_b2', 'H8', PieceType.rook, Color.black, RookType.short_rook),
            piece_factory('rook_w2', 'H1', PieceType.rook, Color.white, RookType.short_rook),

            piece_factory('pawn_b1', 'A7', PieceType.pawn, Color.black),
            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),
            piece_factory('pawn_b2', 'B7', PieceType.pawn, Color.black),
            piece_factory('pawn_w2', 'B2', PieceType.pawn, Color.white),
            piece_factory('pawn_b3', 'C7', PieceType.pawn, Color.black),
            piece_factory('pawn_w3', 'C2', PieceType.pawn, Color.white),
            piece_factory('pawn_b4', 'D7', PieceType.pawn, Color.black),
            piece_factory('pawn_w4', 'D2', PieceType.pawn, Color.white),
            piece_factory('pawn_b5', 'E5', PieceType.pawn, Color.black),
            piece_factory('pawn_w5', 'E2', PieceType.pawn, Color.white),
            piece_factory('pawn_b6', 'F7', PieceType.pawn, Color.black),
            piece_factory('pawn_w6', 'F3', PieceType.pawn, Color.white),
            piece_factory('pawn_b7', 'G7', PieceType.pawn, Color.black),
            piece_factory('pawn_w7', 'G4', PieceType.pawn, Color.white),
            piece_factory('pawn_b8', 'H7', PieceType.pawn, Color.black),
            piece_factory('pawn_w8', 'H2', PieceType.pawn, Color.white),
        ]
    }
}

function grecos_mate(): CheckmateBoard {
    return {
        title: 'Grecos Mate', board: [
            piece_factory('king_w', 'A1', PieceType.king, Color.white),
            piece_factory('king_b', 'F8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'B2', PieceType.pawn, Color.white),

            piece_factory('rook_b1', 'A8', PieceType.rook, Color.black, RookType.long_rook),

            piece_factory('bishop_b1', 'F5', PieceType.bishop, Color.black),
        ]
    }
}

function h_file_mate(): CheckmateBoard {
    return {
        title: 'H-File Mate', board: [
            piece_factory('king_w', 'B1', PieceType.king, Color.white),
            piece_factory('king_b', 'C3', PieceType.king, Color.black),

            piece_factory('pawn_b1', 'B2', PieceType.pawn, Color.black),

            piece_factory('rook_b1', 'A1', PieceType.rook, Color.black, RookType.long_rook),
        ]
    }
}

function hook_mate(): CheckmateBoard {
    return {
        title: 'Hook Mate', board: [
            piece_factory('king_w', 'A2', PieceType.king, Color.white),
            piece_factory('king_b', 'B8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'B2', PieceType.pawn, Color.white),

            piece_factory('knight_b1', 'B3', PieceType.knight, Color.black),

            piece_factory('pawn_b1', 'C4', PieceType.pawn, Color.black),

            piece_factory('rook_b1', 'A1', PieceType.rook, Color.black, RookType.long_rook),
        ]
    }
}

function kill_box_mate(): CheckmateBoard {
    return {
        title: 'Kill Box Mate', board: [
            piece_factory('king_w', 'B1', PieceType.king, Color.white),
            piece_factory('king_b', 'G8', PieceType.king, Color.black),

            piece_factory('queen_b', 'A3', PieceType.queen, Color.black),

            piece_factory('rook_b1', 'C1', PieceType.rook, Color.black, RookType.long_rook)
        ]
    }
}

function lawn_mower_mate(): CheckmateBoard {
    return {
        title: 'Lawn Mower Mate', board: [
            piece_factory('king_w', 'A1', PieceType.king, Color.white),
        piece_factory('king_b', 'B8', PieceType.king, Color.black),

        piece_factory('rook_b2', 'G2', PieceType.rook, Color.black, RookType.short_rook),
        piece_factory('rook_b1', 'H1', PieceType.rook, Color.black, RookType.long_rook),
        ]
    }
}

function legals_mate(): CheckmateBoard {
    return {
        title: 'Legals Mate', board: [
            piece_factory('king_b', 'E8', PieceType.king, Color.black),
            piece_factory('king_w', 'E2', PieceType.king, Color.white),
        
            piece_factory('queen_w', 'D1', PieceType.queen, Color.white),
        
            piece_factory('bishop_b1', 'C8', PieceType.bishop, Color.black),
            piece_factory('bishop_w1', 'D8', PieceType.bishop, Color.white),
            piece_factory('bishop_b2', 'F2', PieceType.bishop, Color.black),
            piece_factory('bishop_w2', 'F1', PieceType.bishop, Color.white),
        
            piece_factory('knight_w1', 'C3', PieceType.knight, Color.white),
            piece_factory('knight_b1', 'D4', PieceType.knight, Color.black),
            piece_factory('knight_b2', 'E4', PieceType.knight, Color.black),
            piece_factory('knight_w2', 'G1', PieceType.knight, Color.white),
        
            piece_factory('rook_b1', 'A8', PieceType.rook, Color.black, RookType.long_rook),
            piece_factory('rook_w1', 'A1', PieceType.rook, Color.white, RookType.long_rook),
            piece_factory('rook_b2', 'H8', PieceType.rook, Color.black, RookType.short_rook),
            piece_factory('rook_w2', 'H1', PieceType.rook, Color.white, RookType.short_rook),
        
            piece_factory('pawn_b1', 'A7', PieceType.pawn, Color.black),
            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),
            piece_factory('pawn_b2', 'B7', PieceType.pawn, Color.black),
            piece_factory('pawn_w2', 'B2', PieceType.pawn, Color.white),
            piece_factory('pawn_b3', 'C7', PieceType.pawn, Color.black),
            piece_factory('pawn_w3', 'C2', PieceType.pawn, Color.white),
            piece_factory('pawn_w4', 'D3', PieceType.pawn, Color.white),
            piece_factory('pawn_b6', 'F7', PieceType.pawn, Color.black),
            piece_factory('pawn_b7', 'G7', PieceType.pawn, Color.black),
            piece_factory('pawn_w7', 'G2', PieceType.pawn, Color.white),
            piece_factory('pawn_b8', 'H7', PieceType.pawn, Color.black),
            piece_factory('pawn_w8', 'H2', PieceType.pawn, Color.white),
        ]
    }
}

function lollis_mate(): CheckmateBoard {
    return {
        title: 'Lollis Mate', board: [
            piece_factory('king_w', 'B1', PieceType.king, Color.white),
            piece_factory('king_b', 'B8', PieceType.king, Color.black),
        
            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),
            piece_factory('pawn_w2', 'B3', PieceType.pawn, Color.white),
            piece_factory('pawn_w3', 'C2', PieceType.pawn, Color.white),
            piece_factory('pawn_b1', 'C3', PieceType.pawn, Color.black),
        
            piece_factory('queen_b', 'B2', PieceType.queen, Color.black),
        ]
    }
}

function max_langes_mate(): CheckmateBoard {
    return {
        title: 'Max Langes Mate', board: [
            piece_factory('king_w', 'A2', PieceType.king, Color.white),
            piece_factory('king_b', 'C8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'A3', PieceType.pawn, Color.white),
            piece_factory('pawn_w2', 'B2', PieceType.pawn, Color.white),

            piece_factory('queen_b', 'B1', PieceType.queen, Color.black),

            piece_factory('bishop_b1', 'C2', PieceType.bishop, Color.black),
        ]
    }
}

function mayets_mate(): CheckmateBoard {
    return {
        title: 'Mayets Mate', board: [
            piece_factory('king_w', 'D1', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'C2', PieceType.pawn, Color.white),

            piece_factory('bishop_b1', 'B4', PieceType.bishop, Color.black),

            piece_factory('rook_b1', 'E1', PieceType.rook, Color.black, RookType.long_rook),
        ]
    }
}

function morphys_mate(): CheckmateBoard {
    return {
        title: 'Morphys Mate', board: [
            piece_factory('king_w', 'D1', PieceType.king, Color.white),
            piece_factory('king_b', 'E8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'C2', PieceType.pawn, Color.white),

            piece_factory('bishop_b1', 'B4', PieceType.bishop, Color.black),

            piece_factory('rook_b1', 'E1', PieceType.rook, Color.black, RookType.long_rook),
        ]
    }
}

function opera_mate(): CheckmateBoard {
    return {
        title: 'Opera Mate', board: [
            piece_factory('king_b', 'C8', PieceType.king, Color.black),
            piece_factory('king_w', 'E1', PieceType.king, Color.white),

            piece_factory('queen_w', 'E3', PieceType.queen, Color.white),

            piece_factory('bishop_b1', 'G4', PieceType.bishop, Color.black),
            piece_factory('bishop_w1', 'F1', PieceType.bishop, Color.white),

            piece_factory('knight_w1', 'B1', PieceType.knight, Color.white),

            piece_factory('rook_b1', 'D1', PieceType.rook, Color.black, RookType.long_rook),
            piece_factory('rook_w2', 'H1', PieceType.rook, Color.white, RookType.short_rook),

            piece_factory('pawn_b1', 'A7', PieceType.pawn, Color.black),
            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),
            piece_factory('pawn_b2', 'B7', PieceType.pawn, Color.black),
            piece_factory('pawn_b3', 'C7', PieceType.pawn, Color.black),
            piece_factory('pawn_b6', 'F7', PieceType.pawn, Color.black),
            piece_factory('pawn_w6', 'F2', PieceType.pawn, Color.white),
            piece_factory('pawn_b7', 'G7', PieceType.pawn, Color.black),
            piece_factory('pawn_w7', 'G2', PieceType.pawn, Color.white),
            piece_factory('pawn_b8', 'H7', PieceType.pawn, Color.black),
            piece_factory('pawn_w8', 'H2', PieceType.pawn, Color.white),
        ]
    }
}

function pillsburys_mate(): CheckmateBoard {
    return {
        title: 'Pillsburys Mate', board: [
            piece_factory('king_w', 'B1', PieceType.king, Color.white),
            piece_factory('king_b', 'F8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),
            piece_factory('pawn_w2', 'C2', PieceType.pawn, Color.white),
            
            piece_factory('bishop_b1', 'F6', PieceType.bishop, Color.black),

            piece_factory('rook_b1', 'B8', PieceType.rook, Color.black, RookType.long_rook),
            piece_factory('rook_w1', 'C1', PieceType.rook, Color.white, RookType.long_rook),
        ]
    }
}

function retis_mate(): CheckmateBoard {
    return {
        title: 'Retis Mate', board: [
            piece_factory('king_w', 'F2', PieceType.king, Color.white),
            piece_factory('king_b', 'F8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'H2', PieceType.pawn, Color.white),
            piece_factory('pawn_w2', 'G2', PieceType.pawn, Color.white),
            piece_factory('pawn_w3', 'F3', PieceType.pawn, Color.white),
            
            piece_factory('bishop_b1', 'E1', PieceType.bishop, Color.black),
            piece_factory('bishop_w1', 'F1', PieceType.bishop, Color.white),

            piece_factory('rook_b1', 'E8', PieceType.rook, Color.black, RookType.long_rook),
            piece_factory('rook_w1', 'H1', PieceType.rook, Color.white, RookType.long_rook),

            piece_factory('knight_w1', 'G1', PieceType.knight, Color.white),
        ]
    }
}

function scholars_mate(): CheckmateBoard {
    return {
        title: 'Scholars Mate', board: [
            piece_factory('king_b', 'E8', PieceType.king, Color.black),
            piece_factory('king_w', 'E1', PieceType.king, Color.white),

            piece_factory('queen_b', 'F2', PieceType.queen, Color.black),
            piece_factory('queen_w', 'D1', PieceType.queen, Color.white),

            piece_factory('bishop_b1', 'C8', PieceType.bishop, Color.black),
            piece_factory('bishop_w1', 'C1', PieceType.bishop, Color.white),
            piece_factory('bishop_b2', 'C5', PieceType.bishop, Color.black),
            piece_factory('bishop_w2', 'F1', PieceType.bishop, Color.white),

            piece_factory('knight_w1', 'C3', PieceType.knight, Color.white),
            piece_factory('knight_b1', 'B8', PieceType.knight, Color.black),
            piece_factory('knight_b2', 'F8', PieceType.knight, Color.black),
            piece_factory('knight_w2', 'F3', PieceType.knight, Color.white),

            piece_factory('rook_b1', 'A8', PieceType.rook, Color.black, RookType.long_rook),
            piece_factory('rook_w1', 'A1', PieceType.rook, Color.white, RookType.long_rook),
            piece_factory('rook_b2', 'H8', PieceType.rook, Color.black, RookType.short_rook),
            piece_factory('rook_w2', 'H1', PieceType.rook, Color.white, RookType.short_rook),

            piece_factory('pawn_b1', 'A7', PieceType.pawn, Color.black),
            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),
            piece_factory('pawn_b2', 'B7', PieceType.pawn, Color.black),
            piece_factory('pawn_w2', 'B2', PieceType.pawn, Color.white),
            piece_factory('pawn_b3', 'C7', PieceType.pawn, Color.black),
            piece_factory('pawn_w3', 'C2', PieceType.pawn, Color.white),
            piece_factory('pawn_b4', 'D7', PieceType.pawn, Color.black),
            piece_factory('pawn_w4', 'D2', PieceType.pawn, Color.white),
            piece_factory('pawn_b5', 'E5', PieceType.pawn, Color.black),
            piece_factory('pawn_w5', 'E4', PieceType.pawn, Color.white),
            piece_factory('pawn_b6', 'F7', PieceType.pawn, Color.black),
            piece_factory('pawn_b7', 'G7', PieceType.pawn, Color.black),
            piece_factory('pawn_w7', 'G2', PieceType.pawn, Color.white),
            piece_factory('pawn_b8', 'H7', PieceType.pawn, Color.black),
            piece_factory('pawn_w8', 'H2', PieceType.pawn, Color.white),
        ]
    }
}

function smothered_mate(): CheckmateBoard {
    return {
        title: 'Smothered Mate', board: [
            piece_factory('king_w', 'A1', PieceType.king, Color.white),
            piece_factory('king_b', 'F8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),
            piece_factory('pawn_w2', 'B2', PieceType.pawn, Color.white),

            piece_factory('rook_w1', 'B1', PieceType.rook, Color.white, RookType.long_rook),

            piece_factory('knight_b1', 'C2', PieceType.knight, Color.black),
        ]
    }
}

function suffocation_mate(): CheckmateBoard {
    return {
        title: 'Smothered Mate', board: [
            piece_factory('king_w', 'A1', PieceType.king, Color.white),
            piece_factory('king_b', 'F8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),
            piece_factory('pawn_w2', 'B2', PieceType.pawn, Color.white),

            piece_factory('rook_w1', 'B1', PieceType.rook, Color.white, RookType.long_rook),

            piece_factory('knight_b1', 'C2', PieceType.knight, Color.black),
        ]
    }
}

function swallows_tail_mate(): CheckmateBoard {
    return {
        title: 'Swallows Tail Mate', board: [
            piece_factory('king_w', 'B3', PieceType.king, Color.white),
            piece_factory('king_b', 'B5', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'A2', PieceType.pawn, Color.white),
            piece_factory('pawn_w2', 'C2', PieceType.pawn, Color.white),

            piece_factory('queen_b', 'B4', PieceType.queen, Color.black),
        ]
    }
}

function triangle_mate(): CheckmateBoard {
    return {
        title: 'Triangle Mate', board: [
            piece_factory('king_w', 'B3', PieceType.king, Color.white),
            piece_factory('king_b', 'B8', PieceType.king, Color.black),

            piece_factory('pawn_w1', 'B2', PieceType.pawn, Color.white),

            piece_factory('queen_b', 'C4', PieceType.queen, Color.black),

            piece_factory('rook_b1', 'A4', PieceType.rook, Color.black, RookType.long_rook),
        ]
    }
}

function vukovic_mate(): CheckmateBoard {
    return {
        title: 'Vukovic Mate', board: [
            piece_factory('king_w', 'C1', PieceType.king, Color.white),
            piece_factory('king_b', 'B8', PieceType.king, Color.black),

            piece_factory('pawn_b1', 'D3', PieceType.pawn, Color.black),

            piece_factory('rook_b1', 'C2', PieceType.rook, Color.black, RookType.long_rook),

            piece_factory('knight_b1', 'C3', PieceType.knight, Color.black),
        ]
    }
}

export default list_of_checkmate_boards