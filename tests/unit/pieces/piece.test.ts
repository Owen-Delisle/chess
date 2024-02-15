import { PieceType } from '../../../src/components/piece/piece_types'
import { Color } from '../../../src/components/piece/color'

import piece_factory from '../../../src/components/piece/piece_factory/piece_factory'

jest.mock('../../../src/components/piece/piece_factory/piece_factory', () => ({
    __esModule: true,
    default: jest.fn()
  }));

describe('Bishop', () => {
    const bishop = piece_factory("", "", PieceType.bishop, Color.white)
    it("should be", () => {
        expect(1).toBe(1)
    })
});

describe('Queen', () => {
    const queen = piece_factory("", "", PieceType.queen, Color.white)
    it("should be", () => {
        expect(1).toBe(1)
    })
});

describe('Knight', () => {
    const knight = piece_factory("", "", PieceType.knight, Color.white)
    it("should be", () => {
        expect(1).toBe(1)
    })
});

describe('King', () => {
    const king = piece_factory("", "", PieceType.king, Color.white)
    it("should be", () => {
        expect(1).toBe(1)
    })
});

describe('Pawn', () => {
    const pawn = piece_factory("", "", PieceType.pawn, Color.white)
    it("should be", () => {
        expect(1).toBe(1)
    })
});

describe('Rook', () => {
    const rook = piece_factory("", "", PieceType.rook, Color.white)
    it("should be", () => {
        expect(1).toBe(1)
    })   
});
