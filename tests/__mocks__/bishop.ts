import Piece from '../../src/components/piece/piece';
import { PieceType } from '../../src/components/piece/piece_types';
import { Color } from '../../src/components/square/color';

// Define a mock implementation for the Bishop class
const mockBishop = jest.fn().mockImplementation((id: string, position: string, svg: string, type: PieceType, color: Color) => {
  return {
    id,
    position,
    svg,
    type,
    color,
    // Implement any other methods or properties needed for testing
  };
});

export default mockBishop;