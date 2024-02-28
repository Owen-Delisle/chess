// src/utils/classes/MoveList.ts
class MoveList {
  moves = [];
  constructor() {
  }
  add_move(move) {
    this.moves.push(move);
  }
  remove_last_move() {
    this.moves.pop();
  }
  last_move() {
    if (this.moves.length === 0) {
      return;
    }
    return this.moves[this.moves.length - 1];
  }
}

// src/components/piece/color.ts
function not_color(color) {
  return color == Color.white ? Color.black : Color.white;
}
var Color;
(function(Color2) {
  Color2[Color2["black"] = 0] = "black";
  Color2[Color2["white"] = 1] = "white";
})(Color || (Color = {}));

// src/components/piece/piece_types.ts
var PieceType;
(function(PieceType2) {
  PieceType2[PieceType2["king"] = 0] = "king";
  PieceType2[PieceType2["queen"] = 1] = "queen";
  PieceType2[PieceType2["bishop"] = 2] = "bishop";
  PieceType2[PieceType2["knight"] = 3] = "knight";
  PieceType2[PieceType2["rook"] = 4] = "rook";
  PieceType2[PieceType2["pawn"] = 5] = "pawn";
})(PieceType || (PieceType = {}));

// src/utils/bounds.ts
function are_coors_within_board_bounds(row, col) {
  if (isNaN(row)) {
    throw new Error("row input is NaN");
  }
  if (isNaN(col)) {
    throw new Error("col input is NaN");
  }
  if (row < board_start_index)
    return false;
  if (row >= row_and_column_size)
    return false;
  if (col < board_start_index)
    return false;
  if (col >= row_and_column_size)
    return false;
  return true;
}
var board_start_index = 0;
var row_and_column_size = 8;

// src/models/square_grid.ts
class SquareGrid {
  static square_grid = [];
  static point_by_piece(piece) {
    let piece_id = piece.title;
    let coors = undefined;
    for (let row_index = 0;row_index < this.square_grid.length; row_index++) {
      for (let col_index = 0;col_index < this.square_grid[0].length; col_index++) {
        if (this.piece_title_at_point(row_index, col_index) == piece_id) {
          coors = { row: row_index, col: col_index };
        }
      }
    }
    return coors;
  }
  static piece_title_at_point(row, col) {
    if (this.square_grid[row][col].piece_attached_to_square() !== undefined) {
      return this.square_grid[row][col].piece_attached_to_square().title;
    } else {
      return "";
    }
  }
  static square_by_grid_point(point) {
    return this.square_grid[point.row][point.col];
  }
  static square_by_board_position(id) {
    let square = undefined;
    for (let row_index = 0;row_index < this.square_grid.length; row_index++) {
      for (let col_index = 0;col_index < this.square_grid[0].length; col_index++) {
        if (this.square_grid[row_index][col_index].square_id == id) {
          square = this.square_grid[row_index][col_index];
        }
      }
    }
    return square;
  }
  static piece_by_grid_point(point) {
    if (!are_coors_within_board_bounds(point.row, point.col)) {
      return;
    }
    return SquareGrid.square_grid[point.row][point.col].piece_attached_to_square();
  }
  static point_at_board_position(s) {
    if (GameController.turn === Color.white) {
      return {
        row: 8 - parseInt(`${s[1]}`),
        col: s[0].charCodeAt(0) - 65
      };
    } else {
      return {
        row: parseInt(`${s[1]}`) - 1,
        col: 72 - s[0].charCodeAt(0)
      };
    }
  }
}

// src/components/piece/piece_directions.ts
function piece_direction_modifier(direction) {
  switch (direction) {
    case PieceDirections.north:
      return { row: -1, col: 0 };
    case PieceDirections.north_east:
      return { row: -1, col: 1 };
    case PieceDirections.east:
      return { row: 0, col: 1 };
    case PieceDirections.south_east:
      return { row: 1, col: 1 };
    case PieceDirections.south:
      return { row: 1, col: 0 };
    case PieceDirections.south_west:
      return { row: 1, col: -1 };
    case PieceDirections.west:
      return { row: 0, col: -1 };
    case PieceDirections.north_west:
      return { row: -1, col: -1 };
    case PieceDirections.up_right:
      return { row: -2, col: 1 };
    case PieceDirections.right_up:
      return { row: -1, col: 2 };
    case PieceDirections.right_down:
      return { row: 1, col: 2 };
    case PieceDirections.down_right:
      return { row: 2, col: 1 };
    case PieceDirections.down_left:
      return { row: 2, col: -1 };
    case PieceDirections.left_down:
      return { row: 1, col: -2 };
    case PieceDirections.left_up:
      return { row: -1, col: -2 };
    case PieceDirections.up_left:
      return { row: -2, col: -1 };
  }
}
function direction_by_modifier(modifier) {
  if (modifier.row === -1 && modifier.col === 0)
    return PieceDirections.north;
  if (modifier.row === -1 && modifier.col === 1)
    return PieceDirections.north_east;
  if (modifier.row === 0 && modifier.col === 1)
    return PieceDirections.east;
  if (modifier.row === 1 && modifier.col === 1)
    return PieceDirections.south_east;
  if (modifier.row === 1 && modifier.col === 0)
    return PieceDirections.south;
  if (modifier.row === 1 && modifier.col === -1)
    return PieceDirections.south_west;
  if (modifier.row === 0 && modifier.col === -1)
    return PieceDirections.west;
  if (modifier.row === -1 && modifier.col === -1)
    return PieceDirections.north_west;
  if (modifier.row === -2 && modifier.col === 1)
    return PieceDirections.up_right;
  if (modifier.row === -1 && modifier.col === 2)
    return PieceDirections.right_up;
  if (modifier.row === 1 && modifier.col === 2)
    return PieceDirections.right_down;
  if (modifier.row === 2 && modifier.col === 1)
    return PieceDirections.down_right;
  if (modifier.row === 2 && modifier.col === -1)
    return PieceDirections.down_left;
  if (modifier.row === 1 && modifier.col === -2)
    return PieceDirections.left_down;
  if (modifier.row === -1 && modifier.col === -2)
    return PieceDirections.left_up;
  if (modifier.row === -2 && modifier.col === -1)
    return PieceDirections.up_left;
}
function every_direction() {
  return Object.keys(PieceDirections).filter((key) => !isNaN(parseInt(key, 10))).map((key) => parseInt(key, 10));
}
function knight_directions() {
  return every_direction().slice(index_of_knight_directions);
}
function knight_direction_modifiers() {
  return knight_directions().map((direction) => piece_direction_modifier(direction));
}
var index_of_knight_directions = 8;
var PieceDirections;
(function(PieceDirections2) {
  PieceDirections2[PieceDirections2["north"] = 0] = "north";
  PieceDirections2[PieceDirections2["north_east"] = 1] = "north_east";
  PieceDirections2[PieceDirections2["east"] = 2] = "east";
  PieceDirections2[PieceDirections2["south_east"] = 3] = "south_east";
  PieceDirections2[PieceDirections2["south"] = 4] = "south";
  PieceDirections2[PieceDirections2["south_west"] = 5] = "south_west";
  PieceDirections2[PieceDirections2["west"] = 6] = "west";
  PieceDirections2[PieceDirections2["north_west"] = 7] = "north_west";
  PieceDirections2[PieceDirections2["up_right"] = 8] = "up_right";
  PieceDirections2[PieceDirections2["right_up"] = 9] = "right_up";
  PieceDirections2[PieceDirections2["right_down"] = 10] = "right_down";
  PieceDirections2[PieceDirections2["down_right"] = 11] = "down_right";
  PieceDirections2[PieceDirections2["down_left"] = 12] = "down_left";
  PieceDirections2[PieceDirections2["left_down"] = 13] = "left_down";
  PieceDirections2[PieceDirections2["left_up"] = 14] = "left_up";
  PieceDirections2[PieceDirections2["up_left"] = 15] = "up_left";
})(PieceDirections || (PieceDirections = {}));

// src/utils/grid.ts
function square_is_empty(point) {
  return SquareGrid.piece_by_grid_point(point) === undefined;
}
function surrounding_points(grid_point) {
  const surrounding_points2 = [];
  const offsets = [
    piece_direction_modifier(PieceDirections.north),
    piece_direction_modifier(PieceDirections.north_east),
    piece_direction_modifier(PieceDirections.east),
    piece_direction_modifier(PieceDirections.south_east),
    piece_direction_modifier(PieceDirections.south),
    piece_direction_modifier(PieceDirections.south_west),
    piece_direction_modifier(PieceDirections.west),
    piece_direction_modifier(PieceDirections.north_west)
  ];
  for (const offset of offsets) {
    const neighbor_row = grid_point.row + offset.row;
    const neighbor_col = grid_point.col + offset.col;
    if (are_coors_within_board_bounds(neighbor_row, neighbor_col)) {
      surrounding_points2.push({ row: neighbor_row, col: neighbor_col });
    }
  }
  return surrounding_points2;
}

// src/components/piece/piece.ts
class Piece {
  title;
  type;
  pos;
  svg;
  color;
  image;
  possible_moves = [];
  directions = [];
  position_restrictions = [];
  static position_restrictions = [];
  move_distance = 0;
  piece_value = 0;
  constructor(title, type, pos, svg, color2) {
    this.title = title;
    this.type = type;
    this.pos = pos;
    this.svg = svg;
    this.image = this.image_builder();
    this.color = color2;
  }
  image_builder() {
    let image = new Image;
    image.src = this.svg;
    image.id = this.title;
    image.className = "piece";
    return image;
  }
  move_to(new_square) {
    return new Promise(async (resolve) => {
      this.pos = new_square.square_id;
      this.possible_moves = [];
      resolve();
    });
  }
  calculate_possible_moves() {
    this.directions.forEach((direction) => {
      switch (direction) {
        case PieceDirections.north:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.north));
          break;
        case PieceDirections.north_east:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.north_east));
          break;
        case PieceDirections.east:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.east));
          break;
        case PieceDirections.south_east:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.south_east));
          break;
        case PieceDirections.south:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.south));
          break;
        case PieceDirections.south_west:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.south_west));
          break;
        case PieceDirections.west:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.west));
          break;
        case PieceDirections.north_west:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.north_west));
          break;
        case PieceDirections.up_right:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.up_right));
          break;
        case PieceDirections.right_up:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.right_up));
          break;
        case PieceDirections.right_down:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.right_down));
          break;
        case PieceDirections.down_right:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.down_right));
          break;
        case PieceDirections.down_left:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.down_left));
          break;
        case PieceDirections.left_down:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.left_down));
          break;
        case PieceDirections.left_up:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.left_up));
          break;
        case PieceDirections.up_left:
          this.build_possible_moves_list(SquareGrid.point_at_board_position(this.pos), this.move_distance, piece_direction_modifier(PieceDirections.up_left));
          break;
        default:
          console.log("Direction Not Found");
      }
    });
  }
  build_possible_moves_list(current_pos, distance, modifier) {
    const row_modifier = modifier.row;
    const col_modifier = modifier.col;
    this.add_positions_to_list_in_direction_for_distance(current_pos, distance, row_modifier, col_modifier, this.possible_moves);
  }
  add_positions_to_list_in_direction_for_distance(current_pos, distance, row_modifier, col_modifier, possible_moves) {
    let index = 1;
    let moves_in_direction = [];
    while (this.conditions_to_continue_adding_positions(current_pos, distance, row_modifier, col_modifier, index, moves_in_direction)) {
      let next_row = current_pos.row + row_modifier * index;
      let next_col = current_pos.col + col_modifier * index;
      let pos_at_point = SquareID.pos_at_point({
        row: next_row,
        col: next_col
      });
      moves_in_direction.push(pos_at_point);
      index++;
    }
    this.add_moves_in_direction_to_all_possible_moves(moves_in_direction, possible_moves);
  }
  conditions_to_continue_adding_positions(current_pos, move_distance, row_modifier, col_modifier, distance, moves_in_direction) {
    let new_row = current_pos.row + row_modifier * distance;
    let new_col = current_pos.col + col_modifier * distance;
    if (!are_coors_within_board_bounds(new_row, new_col)) {
      return false;
    }
    if (distance > move_distance) {
      return false;
    }
    if (!square_is_empty({ row: new_row, col: new_col })) {
      const piece_at_square = SquareGrid.piece_by_grid_point({
        row: new_row,
        col: new_col
      });
      if (piece_at_square.color !== this.color) {
        if (this.type !== PieceType.king && this.type !== PieceType.pawn) {
          moves_in_direction.push(SquareID.pos_at_point({ row: new_row, col: new_col }));
        }
      }
      return false;
    }
    return true;
  }
  add_moves_in_direction_to_all_possible_moves(moves_in_direction, possible_moves) {
    if (this.position_restrictions.length > 0 && Piece.position_restrictions.length <= 0) {
      possible_moves.push(...moves_in_direction.filter((move) => this.position_restrictions.includes(move)));
    } else if (Piece.position_restrictions.length > 0 && this.type !== PieceType.king) {
      if (this.position_restrictions.length > 0) {
        this.possible_moves = [];
      } else {
        possible_moves.push(...moves_in_direction.filter((move) => Piece.position_restrictions.includes(move)));
      }
    } else if (Piece.position_restrictions.length > 0 && this.type === PieceType.king) {
      this.possible_moves = this.position_restrictions;
    } else {
      possible_moves.push(...moves_in_direction);
    }
  }
  static update_global_movement_restrictions(restrictions) {
    Piece.position_restrictions = restrictions;
  }
  static read_global_movement_restrictions() {
    return Piece.position_restrictions;
  }
}

// src/components/piece/pieces/bishop.ts
class Bishop extends Piece {
  move_distance = 7;
  piece_value = 3;
  directions;
  constructor(title, pos, svg, type, color2) {
    super(title, type, pos, svg, color2);
    this.type = type;
    this.directions = [
      PieceDirections.north_east,
      PieceDirections.south_east,
      PieceDirections.south_west,
      PieceDirections.north_west
    ];
  }
}

// src/components/piece/pieces/rook.ts
class Rook extends Piece {
  move_distance = 7;
  piece_value = 5;
  directions;
  has_moved = false;
  rook_type;
  constructor(title, pos, svg, type, color2, rook_type) {
    super(title, type, pos, svg, color2);
    this.type = type;
    this.directions = [
      PieceDirections.north,
      PieceDirections.east,
      PieceDirections.south,
      PieceDirections.west
    ];
    this.rook_type = rook_type;
  }
  move_to(new_square) {
    return new Promise(async (resolve) => {
      this.pos = new_square.square_id;
      this.has_moved = true;
      this.possible_moves = [];
      resolve();
    });
  }
}
var RookType;
(function(RookType2) {
  RookType2[RookType2["long_rook"] = 0] = "long_rook";
  RookType2[RookType2["short_rook"] = 1] = "short_rook";
})(RookType || (RookType = {}));

// src/utils/math.ts
function distance_between_aligned_points(point_one, point_two) {
  [point_one, point_two].forEach((point) => {
    if (!are_coors_within_board_bounds(point.row, point.col)) {
      throw new Error(`${point.row}, ${point.col} is out of bounds.`);
    }
  });
  const x1 = point_one.row;
  const x2 = point_two.row;
  const y1 = point_one.col;
  const y2 = point_two.col;
  if (x1 === x2 || y1 === y2 || Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const maxDistance = Math.max(dx, dy);
    return maxDistance;
  } else {
    throw new Error("Points are not aligned vertically, horizontally or diagonally");
  }
}
function distance_between_aligned_positions(pos_one, pos_two) {
  [pos_one, pos_two].forEach((pos) => {
    if (!SquareID.white_board_positions.includes(pos) || !SquareID.black_board_positions.includes(pos)) {
      throw new Error(`${pos}, does not exist on board`);
    }
  });
  const point_one = SquareGrid.point_at_board_position(pos_one);
  const point_two = SquareGrid.point_at_board_position(pos_two);
  return distance_between_aligned_points(point_one, point_two);
}
function is_within_one_knight_move(from, to) {
  let one_move = false;
  knight_direction_modifiers().forEach((modifier) => {
    const next_gp = { row: from.row + modifier.row, col: from.col + modifier.col };
    if (next_gp.row == to.row && next_gp.col === to.col) {
      one_move = true;
    }
  });
  return one_move;
}

// src/utils/types.ts
function are_equal(a, b) {
  if (typeof a !== typeof b) {
    return false;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0;i < a.length; i++) {
      if (!are_equal(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (const key of keysA) {
      if (!are_equal(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a === b;
}

// src/components/piece/piece_factory/assets/king-w-win.svg
var king_w_win_default = "./king-w-win-3dc7cbca4b932de2.svg";

// src/components/piece/piece_factory/assets/king-b-win.svg
var king_b_win_default = "./king-b-win-108be0f8c2581712.svg";

// src/components/piece/piece_factory/assets/king-w-loss.svg
var king_w_loss_default = "./king-w-loss-75106887d0719fce.svg";

// src/components/piece/piece_factory/assets/king-b-loss.svg
var king_b_loss_default = "./king-b-loss-24e9b1fdd29a0d46.svg";

// src/components/piece/pieces/king.ts
class King extends Piece {
  move_distance = 1;
  piece_value = 0;
  directions;
  has_moved = false;
  in_check = false;
  positions_to_be_blocked = [];
  constructor(title, pos, svg, type, color4) {
    super(title, type, pos, svg, color4);
    this.type = type;
    this.directions = [
      PieceDirections.north,
      PieceDirections.north_east,
      PieceDirections.east,
      PieceDirections.south_east,
      PieceDirections.south,
      PieceDirections.south_west,
      PieceDirections.west,
      PieceDirections.north_west
    ];
  }
  points_surrounding_king() {
    return surrounding_points(SquareGrid.point_at_board_position(this.pos));
  }
  moveable_positions_surrounding_king() {
    const list = surrounding_points(SquareGrid.point_at_board_position(this.pos)).filter((point) => {
      const piece4 = SquareGrid.piece_by_grid_point(point);
      if (piece4 === undefined) {
        return true;
      }
      if (!this.check_if_piece_is_covered_in_any_direction(piece4)) {
        this.possible_moves.push(piece4.pos);
        return true;
      }
    }).map((point) => SquareID.pos_at_point(point));
    return list;
  }
  check_for_checkmate() {
    if (!this.any_piece_can_move()) {
      if (this.in_check) {
        return "Game Over: Checkmate";
      } else {
        return "Game Over: Stalemate";
      }
    }
  }
  any_piece_can_move() {
    const any_piece_has_move = PieceList.pieces_by_color(this.color).some((piece4) => piece4.possible_moves.length > 0);
    return any_piece_has_move;
  }
  render_legal_squares_surrounding_king() {
    const positions_surrounding_king = this.moveable_positions_surrounding_king();
    const attacked_points_around_king = this.attacked_points_around_king();
    if (are_equal(positions_surrounding_king, attacked_points_around_king)) {
      this.move_distance = 0;
    } else {
      this.move_distance = 1;
      this.position_restrictions = positions_surrounding_king.filter((position) => !attacked_points_around_king.includes(position));
    }
  }
  attacked_points_around_king() {
    let attacked_positions = [];
    this.points_surrounding_king().forEach((point) => {
      every_direction().forEach((direction) => {
        const row_modifier = piece_direction_modifier(direction).row;
        const col_modifier = piece_direction_modifier(direction).col;
        const initial_row = point.row;
        const initial_col = point.col;
        const next_row = initial_row + row_modifier;
        const next_col = initial_col + col_modifier;
        if (this.check_if_square_is_covered_by_piece_of_color(initial_row, initial_col, next_row, next_col, row_modifier, col_modifier, direction, 1, not_color(this.color))) {
          const next_pos = SquareID.pos_at_point({
            row: initial_row,
            col: initial_col
          });
          if (!attacked_positions.includes(next_pos)) {
            if (PieceList.piece_by_position(next_pos) === undefined) {
              attacked_positions.push(next_pos);
            }
          }
        }
      });
    });
    return attacked_positions;
  }
  check_if_piece_is_covered_in_any_direction(piece4) {
    return every_direction().some((direction) => {
      const gp = SquareGrid.point_at_board_position(piece4.pos);
      const starting_row = gp.row;
      const starting_col = gp.col;
      const next_row = gp.row + piece_direction_modifier(direction).row;
      const next_col = gp.col + piece_direction_modifier(direction).col;
      const row_modifier = piece_direction_modifier(direction).row;
      const col_modifier = piece_direction_modifier(direction).col;
      return this.check_if_square_is_covered_by_piece_of_color(starting_row, starting_col, next_row, next_col, row_modifier, col_modifier, direction, 1, piece4.color);
    });
  }
  check_if_square_is_covered_by_piece_of_color(starting_row, starting_col, next_row, next_col, row_modifier, col_modifier, direction, distance, color4) {
    if (!are_coors_within_board_bounds(next_row, next_col)) {
      return false;
    }
    const piece4 = SquareGrid.piece_by_grid_point({
      row: next_row,
      col: next_col
    });
    if (piece4 !== undefined && piece4.color !== color4 && piece4 !== this) {
      return false;
    }
    if (piece4 !== undefined && piece4.color === color4) {
      let direction2 = direction_by_modifier({
        row: row_modifier,
        col: col_modifier
      });
      if (direction2 !== undefined) {
        if (piece4.type !== PieceType.pawn) {
          if (piece4.directions.includes(direction2)) {
            if (piece4.move_distance >= distance) {
              return true;
            }
            return false;
          }
        } else {
          return this.pawn_attack_square(piece4, direction2, distance);
        }
      }
    }
    if (piece4 === undefined || piece4 === this) {
      next_row = next_row + row_modifier;
      next_col = next_col + col_modifier;
      return this.check_if_square_is_covered_by_piece_of_color(starting_row, starting_col, next_row, next_col, row_modifier, col_modifier, direction, ++distance, color4);
    }
    return false;
  }
  pawn_attack_square(piece4, direction, distance) {
    const pawn = piece4;
    if (distance <= pawn.attack_distance) {
      if (pawn.attack_directions.includes(direction)) {
        return true;
      }
    }
    return false;
  }
  render_check_paths_list() {
    this.in_check = false;
    const check_paths_list = this.check_path_lists_from_every_direction();
    check_paths_list.forEach((path) => {
      this.render_path(path);
    });
  }
  render_path(path) {
    const pieces = path.ordered_pieces_list;
    if (pieces.length < 1) {
      return;
    }
    const first_piece = pieces[0];
    const first_piece_gp = SquareGrid.point_at_board_position(first_piece.pos);
    if (first_piece.color === this.color) {
      if (pieces.length > 1) {
        if (this.piece_in_path_conditions(pieces[1], path.direction)) {
          first_piece.position_restrictions = SquareID.pos_between_points(SquareGrid.point_at_board_position(this.pos), SquareGrid.point_at_board_position(pieces[1].pos));
        }
      }
    }
    if (this.piece_in_path_conditions(first_piece, path.direction)) {
      this.king_in_check();
      if (path.direction < index_of_knight_directions) {
        Piece.update_global_movement_restrictions([
          ...SquareID.pos_between_points(SquareGrid.point_at_board_position(this.pos), first_piece_gp)
        ]);
      } else {
        const attacking_knight_position = SquareID.pos_at_point(first_piece_gp);
        Piece.update_global_movement_restrictions([attacking_knight_position]);
      }
    }
  }
  king_in_check() {
    this.in_check = true;
    SquareGrid.square_by_board_position(this.pos)?.add_check_border();
  }
  piece_in_path_conditions(piece4, direction) {
    try {
      const king_gp = SquareGrid.point_at_board_position(this.pos);
      const piece_gp = SquareGrid.point_at_board_position(piece4.pos);
      let piece_is_within_distance = false;
      if (direction < index_of_knight_directions) {
        if (piece4.move_distance >= distance_between_aligned_points(piece_gp, king_gp)) {
          piece_is_within_distance = true;
        }
      } else {
        if (is_within_one_knight_move(king_gp, piece_gp)) {
          piece_is_within_distance = true;
        } else {
          piece_is_within_distance = false;
        }
      }
      if (piece4.color === not_color(this.color)) {
        if (piece4.type !== PieceType.pawn) {
          if (piece4.directions.includes(direction)) {
            if (piece_is_within_distance) {
              return true;
            }
          }
        } else {
          const pawn = piece4;
          if (pawn.attack_directions.includes(direction)) {
            if (piece_is_within_distance) {
              return true;
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }
  check_path_lists_from_every_direction() {
    let check_path_lists = [];
    every_direction().forEach((direction) => {
      check_path_lists.push({
        direction,
        ordered_pieces_list: this.list_of_pieces_in_direction(direction)
      });
    });
    return check_path_lists;
  }
  list_of_pieces_in_direction(direction) {
    const starting_point = SquareGrid.point_at_board_position(this.pos);
    let current_row = starting_point.row;
    let current_col = starting_point.col;
    let pieces_in_path = [];
    let modifier = piece_direction_modifier(direction);
    while (are_coors_within_board_bounds(current_row + modifier.row, current_col + modifier.col)) {
      current_row = current_row + modifier.row;
      current_col = current_col + modifier.col;
      let piece_at_position = SquareGrid.piece_by_grid_point({
        row: current_row,
        col: current_col
      });
      if (piece_at_position != null) {
        pieces_in_path.push(piece_at_position);
      }
    }
    return pieces_in_path;
  }
  move_to(new_square) {
    return new Promise(async (resolve) => {
      this.pos = new_square.square_id;
      this.has_moved = true;
      this.possible_moves = [];
      resolve();
    });
  }
  rooks_for_king() {
    const pieces = PieceList.piece_list.filter((rook2) => rook2.type === PieceType.rook && rook2.color === this.color);
    const rooks = pieces;
    return rooks;
  }
  add_borders_to_castleable_rooks(rooks) {
    rooks.forEach((piece4) => {
      const rook2 = piece4;
      const rook_gp = SquareGrid.point_at_board_position(rook2.pos);
      if (this.squares_between_king_and_rook_empty(rook2) && !this.has_moved && !rook2.has_moved && !this.in_check && !this.kings_castle_squares_attacked(rook2)) {
        SquareGrid.square_by_grid_point({
          row: rook_gp.row,
          col: rook_gp.col
        }).add_border();
      }
    });
  }
  squares_between_king_and_rook_empty(rook2) {
    const castle_vars = this.castle_vars_for_rook_type(rook2.rook_type);
    const rook_gp = SquareGrid.point_at_board_position(rook2.pos);
    const square_beside_king = {
      row: SquareGrid.point_at_board_position(this.pos).row,
      col: SquareGrid.point_at_board_position(this.pos).col + castle_vars.index_modifier
    };
    const square_beside_rook = {
      row: rook_gp.row,
      col: rook_gp.col - castle_vars.index_modifier
    };
    let positions_between_king_and_rook = SquareID.pos_between_points(square_beside_king, square_beside_rook);
    const any_pieces = positions_between_king_and_rook.some((position) => PieceList.piece_by_position(position) !== undefined);
    return !any_pieces;
  }
  kings_castle_squares_attacked(rook2) {
    const castle_vars = this.castle_vars_for_rook_type(rook2.rook_type);
    const first_point = {
      row: SquareGrid.point_at_board_position(this.pos).row,
      col: SquareGrid.point_at_board_position(this.pos).col + castle_vars.index_modifier
    };
    const second_point = {
      row: first_point.row,
      col: first_point.col + castle_vars.index_modifier
    };
    const first_position = SquareID.pos_at_point(first_point);
    const second_position = SquareID.pos_at_point(second_point);
    const any_piece = PieceList.pieces_by_other_color(this.color).some((piece4) => piece4.possible_moves.some((move) => [first_position, second_position].includes(move)));
    return any_piece;
  }
  castle_vars_for_rook_type(rook_type) {
    if (this.color == Color.white) {
      switch (rook_type) {
        case RookType.long_rook:
          return {
            king_col_modifier: -2,
            rook_col_modifier: 3,
            number_of_squares_between_king_and_rook: 3,
            index_modifier: -1
          };
        case RookType.short_rook:
          return {
            king_col_modifier: 2,
            rook_col_modifier: -2,
            number_of_squares_between_king_and_rook: 2,
            index_modifier: 1
          };
      }
    } else {
      switch (rook_type) {
        case RookType.long_rook:
          return {
            king_col_modifier: 2,
            rook_col_modifier: -3,
            number_of_squares_between_king_and_rook: 3,
            index_modifier: 1
          };
        case RookType.short_rook:
          return {
            king_col_modifier: -2,
            rook_col_modifier: 2,
            number_of_squares_between_king_and_rook: 2,
            index_modifier: -1
          };
      }
    }
  }
  switch_image_with_endgame_image(game_end_type, win_or_lose) {
    if (game_end_type === GameEndType.checkmate) {
      switch (this.color) {
        case Color.black:
          this.svg = win_or_lose === WinOrLose.win ? king_b_win_default : king_b_loss_default;
          break;
        case Color.white:
          this.svg = win_or_lose === WinOrLose.win ? king_w_win_default : king_w_loss_default;
          break;
      }
    } else {
      this.svg = king_b_loss_default;
      this.svg = king_w_loss_default;
    }
    const square = SquareGrid.square_by_board_position(this.pos);
    if (square !== undefined) {
      square.update_image(this.image_builder());
    }
  }
}

// src/components/piece/pieces/knight.ts
class Knight extends Piece {
  move_distance = 1;
  piece_value = 3;
  directions;
  constructor(title, pos, svg, type, color4) {
    super(title, type, pos, svg, color4);
    this.type = type;
    this.directions = [
      PieceDirections.up_right,
      PieceDirections.right_up,
      PieceDirections.right_down,
      PieceDirections.down_right,
      PieceDirections.down_left,
      PieceDirections.left_down,
      PieceDirections.left_up,
      PieceDirections.up_left
    ];
  }
}

// src/components/piece/pieces/pawn.ts
class Pawn extends Piece {
  maximum_move_distance = 2;
  minimum_move_distance = 1;
  attack_distance = 1;
  en_passant_directions = [PieceDirections.west, PieceDirections.east];
  attack_directions = [PieceDirections.north_east, PieceDirections.north_west];
  all_attack_directions = [...this.attack_directions, ...this.en_passant_directions];
  en_passant_position = "";
  move_distance = this.maximum_move_distance;
  piece_value = 1;
  constructor(title, pos, svg, type, color4) {
    super(title, type, pos, svg, color4);
    this.type = type;
    this.directions = [PieceDirections.north];
  }
  build_possible_attack_list() {
    this.all_attack_directions.forEach((direction) => {
      const next_row = SquareGrid.point_at_board_position(this.pos).row + piece_direction_modifier(direction).row;
      const next_col = SquareGrid.point_at_board_position(this.pos).col + piece_direction_modifier(direction).col;
      const piece_at_attack_point = SquareGrid.piece_by_grid_point({
        row: next_row,
        col: next_col
      });
      if (this.conditions_for_adding_attack_square(piece_at_attack_point, next_row, next_col)) {
        if (!this.en_passant_directions.includes(direction)) {
          this.possible_moves.push(SquareID.pos_at_point({ row: next_row, col: next_col }));
        } else {
          this.add_en_passant_move(piece_at_attack_point);
        }
      }
    });
  }
  conditions_for_adding_attack_square(piece_at_attack_point, next_row, next_col) {
    let should_attack = true;
    if (piece_at_attack_point !== undefined) {
      if (piece_at_attack_point.color === this.color) {
        should_attack = false;
      }
      if (Piece.position_restrictions.length > 0 || this.position_restrictions.length > 0) {
        const next_pos = SquareID.pos_at_point({ row: next_row, col: next_col });
        if (!this.any_restrictions_include_position(next_pos)) {
          should_attack = false;
        }
      }
    } else {
      should_attack = false;
    }
    return should_attack;
  }
  any_restrictions_include_position(position) {
    if (Piece.position_restrictions.length > 0 && this.position_restrictions.length > 0) {
      return Piece.position_restrictions.includes(position) && this.position_restrictions.includes(position);
    }
    if (Piece.position_restrictions.length > 0) {
      return Piece.position_restrictions.includes(position);
    }
    if (this.position_restrictions.length > 0) {
      return this.position_restrictions.includes(position);
    }
    return false;
  }
  add_en_passant_move(piece_at_attack_point) {
    const piece_gp = SquareGrid.point_at_board_position(piece_at_attack_point.pos);
    const next_row = piece_gp.row;
    const next_col = piece_gp.col;
    try {
      if (this.conditions_for_en_passant(piece_at_attack_point)) {
        const en_passant_position = SquareID.pos_at_point({ row: next_row - 1, col: next_col });
        this.possible_moves.push(en_passant_position);
        this.en_passant_position = en_passant_position;
      }
    } catch (error) {
      console.log(error);
    }
  }
  conditions_for_en_passant(piece_at_attack_point) {
    if (piece_at_attack_point === undefined) {
      return false;
    }
    if (GameController.move_list.last_move() === undefined) {
      throw Error("Move list is empty and not functioning properly.");
    }
    const last_move = GameController.move_list.last_move();
    if (piece_at_attack_point.type === PieceType.pawn) {
      if (last_move.piece === piece_at_attack_point) {
        if (distance_between_aligned_positions(last_move.from, last_move.to) === this.maximum_move_distance) {
          return true;
        }
      }
    }
    return false;
  }
  move_to(new_square) {
    return new Promise(async (resolve) => {
      if (this.should_en_passant(new_square.square_id)) {
        this.en_passant();
      }
      this.pos = new_square.square_id;
      this.move_distance = this.minimum_move_distance;
      this.possible_moves = [];
      const point = SquareGrid.point_at_board_position(new_square.square_id);
      if (this.should_make_queen(point.row)) {
        this.make_queen();
      }
      resolve();
    });
  }
  should_make_queen(new_square_row) {
    return new_square_row === board_start_index;
  }
  make_queen() {
    PieceList.swap_with_queen(this.title, this.pos, this.color);
  }
  should_en_passant(square_id5) {
    return square_id5 === this.en_passant_position;
  }
  en_passant() {
    const point = SquareGrid.point_at_board_position(this.en_passant_position);
    PieceList.remove_piece_by_point({ row: point.row + 1, col: point.col });
  }
}

// src/components/piece/pieces/queen.ts
class Queen extends Piece {
  move_distance = 7;
  piece_value = 3;
  directions;
  constructor(title, pos, svg, type, color4) {
    super(title, type, pos, svg, color4);
    this.type = type;
    this.directions = [
      PieceDirections.north,
      PieceDirections.north_east,
      PieceDirections.east,
      PieceDirections.south_east,
      PieceDirections.south,
      PieceDirections.south_west,
      PieceDirections.west,
      PieceDirections.north_west
    ];
  }
}

// src/components/piece/piece_factory/assets/bishop-b.svg
var bishop_b_default = "./bishop-b-23bef37e199c75e9.svg";

// src/components/piece/piece_factory/assets/bishop-w.svg
var bishop_w_default = "./bishop-w-ca34f1126001cdfa.svg";

// src/components/piece/piece_factory/assets/king-b.svg
var king_b_default = "./king-b-23d5336e748f86fa.svg";

// src/components/piece/piece_factory/assets/king-w.svg
var king_w_default = "./king-w-17f7b920c0c67281.svg";

// src/components/piece/piece_factory/assets/knight-b.svg
var knight_b_default = "./knight-b-6bf277b524466fe7.svg";

// src/components/piece/piece_factory/assets/knight-w.svg
var knight_w_default = "./knight-w-ad2d41cd9440c72a.svg";

// src/components/piece/piece_factory/assets/pawn-b.svg
var pawn_b_default = "./pawn-b-0cf4309fdd0657e5.svg";

// src/components/piece/piece_factory/assets/pawn-w.svg
var pawn_w_default = "./pawn-w-20db11f147607318.svg";

// src/components/piece/piece_factory/assets/queen-b.svg
var queen_b_default = "./queen-b-e6e5ff9845ee9abd.svg";

// src/components/piece/piece_factory/assets/queen-w.svg
var queen_w_default = "./queen-w-baf75251609bf149.svg";

// src/components/piece/piece_factory/assets/rook-b.svg
var rook_b_default = "./rook-b-2a3de44a9604b864.svg";

// src/components/piece/piece_factory/assets/rook-w.svg
var rook_w_default = "./rook-w-0c69aaccd004e33e.svg";

// src/components/piece/piece_factory/piece_factory.ts
function piece_factory(id, position, type, color5, rook_type) {
  switch (type) {
    case PieceType.bishop:
      return new Bishop(id, position, color5 === Color.black ? bishop_b_default : bishop_w_default, type, color5);
    case PieceType.king:
      return new King(id, position, color5 === Color.black ? king_b_default : king_w_default, type, color5);
    case PieceType.knight:
      return new Knight(id, position, color5 === Color.black ? knight_b_default : knight_w_default, type, color5);
    case PieceType.pawn:
      return new Pawn(id, position, color5 === Color.black ? pawn_b_default : pawn_w_default, type, color5);
    case PieceType.queen:
      return new Queen(id, position, color5 === Color.black ? queen_b_default : queen_w_default, type, color5);
    case PieceType.rook:
      if (rook_type !== undefined) {
        return new Rook(id, position, color5 === Color.black ? rook_b_default : rook_w_default, type, color5, rook_type);
      } else {
        throw new Error("rook_type was not defined");
      }
    default:
      throw new Error(`Unsupported piece type: ${type}`);
  }
}

// src/models/default_piece_list.ts
var default_piece_list = [
  piece_factory("king_b", "E8", PieceType.king, Color.black),
  piece_factory("king_w", "E1", PieceType.king, Color.white),
  piece_factory("queen_b", "D8", PieceType.queen, Color.black),
  piece_factory("queen_w", "D1", PieceType.queen, Color.white),
  piece_factory("bishop_b1", "C8", PieceType.bishop, Color.black),
  piece_factory("bishop_w1", "C1", PieceType.bishop, Color.white),
  piece_factory("bishop_b2", "F8", PieceType.bishop, Color.black),
  piece_factory("bishop_w2", "F1", PieceType.bishop, Color.white),
  piece_factory("knight_w1", "B1", PieceType.knight, Color.white),
  piece_factory("knight_b1", "B8", PieceType.knight, Color.black),
  piece_factory("knight_b2", "G8", PieceType.knight, Color.black),
  piece_factory("knight_w2", "G1", PieceType.knight, Color.white),
  piece_factory("rook_b1", "A8", PieceType.rook, Color.black, RookType.long_rook),
  piece_factory("rook_w1", "A1", PieceType.rook, Color.white, RookType.long_rook),
  piece_factory("rook_b2", "H8", PieceType.rook, Color.black, RookType.short_rook),
  piece_factory("rook_w2", "H1", PieceType.rook, Color.white, RookType.short_rook),
  piece_factory("pawn_b1", "A7", PieceType.pawn, Color.black),
  piece_factory("pawn_w1", "A2", PieceType.pawn, Color.white),
  piece_factory("pawn_b2", "B7", PieceType.pawn, Color.black),
  piece_factory("pawn_w2", "B2", PieceType.pawn, Color.white),
  piece_factory("pawn_b3", "C7", PieceType.pawn, Color.black),
  piece_factory("pawn_w3", "C2", PieceType.pawn, Color.white),
  piece_factory("pawn_b4", "D7", PieceType.pawn, Color.black),
  piece_factory("pawn_w4", "D2", PieceType.pawn, Color.white),
  piece_factory("pawn_b5", "E7", PieceType.pawn, Color.black),
  piece_factory("pawn_w5", "E2", PieceType.pawn, Color.white),
  piece_factory("pawn_b6", "F7", PieceType.pawn, Color.black),
  piece_factory("pawn_w6", "F2", PieceType.pawn, Color.white),
  piece_factory("pawn_b7", "G7", PieceType.pawn, Color.black),
  piece_factory("pawn_w7", "G2", PieceType.pawn, Color.white),
  piece_factory("pawn_b8", "H7", PieceType.pawn, Color.black),
  piece_factory("pawn_w8", "H2", PieceType.pawn, Color.white)
];
var default_piece_list_default = default_piece_list;

// src/models/piece_list.ts
class PieceList {
  static number_of_queens = 2;
  static piece_list = default_piece_list_default;
  static pieces_by_color(color7) {
    return this.piece_list.filter((piece8) => piece8.color === color7);
  }
  static pieces_by_other_color(color7) {
    const other_color = color7 === Color.white ? Color.black : Color.white;
    return this.piece_list.filter((piece8) => piece8.color === other_color);
  }
  static piece_by_position(pos) {
    let p;
    this.piece_list.forEach((piece8) => {
      if (piece8.pos === pos) {
        p = piece8;
      }
    });
    return p;
  }
  static piece_by_id(id) {
    let p;
    this.piece_list.forEach((piece8) => {
      if (piece8.title == id) {
        p = piece8;
      }
    });
    return p;
  }
  static list_of_pieces_by_type(type) {
    let typed_piece_list = [];
    this.piece_list.forEach((piece8) => {
      if (piece8.type == type) {
        typed_piece_list.push(piece8);
      }
    });
    return typed_piece_list;
  }
  static remove_piece_by_id(id) {
    const index = this.piece_list.findIndex((piece8) => piece8.title === id);
    if (index != -1) {
      this.piece_list.splice(index, 1);
    }
  }
  static remove_piece_by_position(pos) {
    const index = this.piece_list.findIndex((piece8) => piece8.pos === pos);
    if (index != -1) {
      this.piece_list.splice(index, 1);
    }
  }
  static remove_piece_by_point(point) {
    const position = SquareID.pos_at_point(point);
    this.remove_piece_by_position(position);
  }
  static king_by_color(color7) {
    switch (color7) {
      case Color.black:
        return this.piece_by_id("king_b");
      case Color.white:
        return this.piece_by_id("king_w");
    }
  }
  static clear_position_restrictions_property() {
    Piece.position_restrictions = [];
    PieceList.piece_list.forEach((piece8) => {
      piece8.position_restrictions = [];
    });
  }
  static swap_with_queen(piece_id, position, color7) {
    this.remove_piece_by_id(piece_id);
    this.piece_list.push(piece_factory(`queen_${++this.number_of_queens}`, position, PieceType.queen, color7));
  }
  static any_pawns_left_in_game() {
    return this.piece_list.some((piece8) => piece8.type === PieceType.pawn);
  }
  static material_value_in_game() {
    return this.piece_list.map((piece8) => piece8.piece_value).reduce((acc, value) => acc + value, 0);
  }
  static only_same_square_color_bishops_left_in_game() {
    if (this.piece_list.length !== 4) {
      return false;
    }
    const bishops = this.piece_list.filter((piece8) => piece8.type === PieceType.bishop);
    if (bishops.length !== 2) {
      return false;
    }
    if (bishops[0].color === bishops[1].color) {
      return false;
    }
    const bishop_1_square_color = SquareGrid.square_by_board_position(bishops[0].pos).color;
    const bishop_2_square_color = SquareGrid.square_by_board_position(bishops[1].pos).color;
    if (bishop_1_square_color !== bishop_2_square_color) {
      return false;
    }
    return true;
  }
}

// src/controllers/game_controller.ts
class GameController {
  static turn = Color.white;
  static move_list = new MoveList;
  static insufficient_material_value = 3;
  static switch_turn() {
    if (GameController.turn == Color.white) {
      GameController.turn = Color.black;
    } else {
      GameController.turn = Color.white;
    }
  }
  static add_move_to_list(move) {
    this.move_list.add_move(move);
  }
  static should_game_end(king2) {
    if (!PieceList.any_pawns_left_in_game()) {
      if (PieceList.material_value_in_game() <= this.insufficient_material_value) {
        console.log("Game Over: Insufficient Material -- King and Minor Piece");
      }
      if (PieceList.only_same_square_color_bishops_left_in_game()) {
        console.log("Game Over: Insufficient Material -- Same Color Bishops");
      }
    }
    if (king2.check_for_checkmate() !== undefined) {
      console.log(king2.check_for_checkmate());
      king2.switch_image_with_endgame_image(GameEndType.checkmate, WinOrLose.lose);
      const winning_king = PieceList.king_by_color(not_color(king2.color));
      winning_king.switch_image_with_endgame_image(GameEndType.checkmate, WinOrLose.win);
    }
  }
}
var GameEndType;
(function(GameEndType2) {
  GameEndType2[GameEndType2["checkmate"] = 0] = "checkmate";
  GameEndType2[GameEndType2["stalemate"] = 1] = "stalemate";
})(GameEndType || (GameEndType = {}));
var WinOrLose;
(function(WinOrLose2) {
  WinOrLose2[WinOrLose2["win"] = 0] = "win";
  WinOrLose2[WinOrLose2["lose"] = 1] = "lose";
})(WinOrLose || (WinOrLose = {}));

// src/components/square/square_id.ts
class SquareID {
  static white_board_positions = [
    "A8",
    "B8",
    "C8",
    "D8",
    "E8",
    "F8",
    "G8",
    "H8",
    "A7",
    "B7",
    "C7",
    "D7",
    "E7",
    "F7",
    "G7",
    "H7",
    "A6",
    "B6",
    "C6",
    "D6",
    "E6",
    "F6",
    "G6",
    "H6",
    "A5",
    "B5",
    "C5",
    "D5",
    "E5",
    "F5",
    "G5",
    "H5",
    "A4",
    "B4",
    "C4",
    "D4",
    "E4",
    "F4",
    "G4",
    "H4",
    "A3",
    "B3",
    "C3",
    "D3",
    "E3",
    "F3",
    "G3",
    "H3",
    "A2",
    "B2",
    "C2",
    "D2",
    "E2",
    "F2",
    "G2",
    "H2",
    "A1",
    "B1",
    "C1",
    "D1",
    "E1",
    "F1",
    "G1",
    "H1"
  ];
  static black_board_positions = [
    "H1",
    "G1",
    "F1",
    "E1",
    "D1",
    "C1",
    "B1",
    "A1",
    "H2",
    "G2",
    "F2",
    "E2",
    "D2",
    "C2",
    "B2",
    "A2",
    "H3",
    "G3",
    "F3",
    "E3",
    "D3",
    "C3",
    "B3",
    "A3",
    "H4",
    "G4",
    "F4",
    "E4",
    "D4",
    "C4",
    "B4",
    "A4",
    "H5",
    "G5",
    "F5",
    "E5",
    "D5",
    "C5",
    "B5",
    "A5",
    "H6",
    "G6",
    "F6",
    "E6",
    "D6",
    "C6",
    "B6",
    "A6",
    "H7",
    "G7",
    "F7",
    "E7",
    "D7",
    "C7",
    "B7",
    "A7",
    "H8",
    "G8",
    "F8",
    "E8",
    "D8",
    "C8",
    "B8",
    "A8"
  ];
  static board_positions() {
    return GameController.turn == Color.white ? SquareID.white_board_positions : SquareID.black_board_positions;
  }
  static pos_at_index(index) {
    return this.board_positions()[index];
  }
  static point_at_index(index) {
    let s = this.board_positions()[index];
    return {
      row: 8 - parseInt(`${s[1]}`),
      col: s[0].charCodeAt(0) - 65
    };
  }
  static pos_at_point(point) {
    let index = point.row * 8 + point.col;
    return this.board_positions()[index];
  }
  static pos_between_points(point_one, point_two) {
    const positions = [];
    const delta_row = point_two.row - point_one.row;
    const delta_col = point_two.col - point_one.col;
    const number_of_points = Math.max(Math.abs(delta_row), Math.abs(delta_col));
    const row_step = delta_row / number_of_points;
    const col_step = delta_col / number_of_points;
    for (let i = 0;i <= number_of_points; i++) {
      const interpolated_point = {
        row: point_one.row + i * row_step,
        col: point_one.col + i * col_step
      };
      const interpolated_position = this.pos_at_point(interpolated_point);
      positions.push(interpolated_position);
    }
    return positions;
  }
}

// src/controllers/move_controller.ts
class MoveController {
  static focused_square;
  static on_square_click(clicked_square) {
    if (this.conditions_for_standard_move(clicked_square)) {
      this.clear_prev_focused_square();
      this.make_standard_move(clicked_square);
    } else if (this.conditions_for_castle(this.focused_square, clicked_square)) {
      this.clear_prev_focused_square();
      this.castle(clicked_square);
    } else {
      this.setup_values_for_move(clicked_square);
    }
  }
  static focused_square_is_defined() {
    return this.focused_square !== undefined;
  }
  static conditions_for_standard_move(clicked_square) {
    let conditions_met = false;
    if (this.focused_square_is_defined()) {
      if (!this.focused_square?.is_empty()) {
        if (this.focused_square?.piece_attached_to_square()?.possible_moves.includes(clicked_square.square_id)) {
          conditions_met = true;
        }
      }
    }
    return conditions_met;
  }
  static make_standard_move(clicked_square) {
    let piece_attached_to_focused_square = this.focused_square?.piece_attached_to_square();
    if (piece_attached_to_focused_square != null) {
      this.move_piece_to(clicked_square, piece_attached_to_focused_square);
    }
  }
  static conditions_for_castle(focused_square, clicked_square) {
    let should_castle = false;
    let focused_piece = focused_square?.piece_attached_to_square();
    let clicked_piece = clicked_square?.piece_attached_to_square();
    if (focused_piece == undefined || clicked_piece == undefined) {
      should_castle = false;
    } else if (focused_piece.type == PieceType.king && clicked_piece.type == PieceType.rook) {
      let king_piece = focused_piece;
      let rook_piece = clicked_piece;
      if (king_piece.color == rook_piece.color) {
        if (!king_piece.has_moved && !rook_piece.has_moved) {
          if (!king_piece.in_check && !king_piece.kings_castle_squares_attacked(rook_piece)) {
            should_castle = true;
          }
        }
      }
    }
    return should_castle;
  }
  static castle(clicked_square) {
    const focused_piece = this.focused_square?.piece_attached_to_square();
    const clicked_piece = clicked_square?.piece_attached_to_square();
    const king_piece = focused_piece;
    const rook_piece = clicked_piece;
    const castle_vars = king_piece.castle_vars_for_rook_type(rook_piece.rook_type);
    if (king_piece.squares_between_king_and_rook_empty(rook_piece)) {
      const king_gp = SquareGrid.point_at_board_position(king_piece.pos);
      const rook_gp = SquareGrid.point_at_board_position(rook_piece.pos);
      const next_king_point = {
        row: king_gp.row,
        col: king_gp.col + castle_vars.king_col_modifier
      };
      const next_rook_point = {
        row: rook_gp.row,
        col: rook_gp.col + castle_vars.rook_col_modifier
      };
      king_piece.possible_moves.push(SquareID.pos_at_point(next_king_point));
      rook_piece.possible_moves.push(SquareID.pos_at_point(next_rook_point));
      let new_king_square = SquareGrid.square_by_grid_point(next_king_point);
      let new_rook_square = SquareGrid.square_by_grid_point(next_rook_point);
      this.move_castle_pieces(new_king_square, king_piece, new_rook_square, rook_piece);
    }
  }
  static clear_prev_focused_square() {
    this.focused_square.remove_border();
    if (this.focused_square.piece_attached_to_square() != null) {
      this.remove_visuals_from_possible_moves(this.focused_square.piece_attached_to_square());
    }
  }
  static setup_values_for_move(clicked_square) {
    if (this.conditions_to_setup_values(clicked_square)) {
      if (this.focused_square !== clicked_square) {
        this.clear_focused_square_visuals();
        this.focused_square = clicked_square;
        this.focused_square.add_border();
        this.add_visuals_to_possible_moves_for(this.focused_square.piece_attached_to_square());
      } else {
        this.remove_visuals_from_possible_moves(this.focused_square.piece_attached_to_square());
        this.focused_square.remove_border();
        this.focused_square = undefined;
      }
    }
  }
  static conditions_to_setup_values(clicked_square) {
    return !clicked_square.is_empty() && clicked_square.piece_attached_to_square().color == GameController.turn;
  }
  static clear_focused_square_visuals() {
    if (this.focused_square != null) {
      this.focused_square.remove_border();
      if (this.focused_square.piece_attached_to_square() != null) {
        this.remove_visuals_from_possible_moves(this.focused_square.piece_attached_to_square());
      }
    }
  }
  static load_possible_moves_lists() {
    PieceList.clear_position_restrictions_property();
    const king_of_color = PieceList.king_by_color(GameController.turn);
    king_of_color.render_legal_squares_surrounding_king();
    king_of_color.render_check_paths_list();
    PieceList.piece_list.forEach((piece8) => {
      if (piece8 !== undefined) {
        piece8.calculate_possible_moves();
        if (piece8.type === PieceType.pawn) {
          const pawn2 = piece8;
          pawn2.build_possible_attack_list();
        }
      }
    });
    GameController.should_game_end(king_of_color);
  }
  static clear_possible_moves_lists() {
    PieceList.piece_list.forEach((piece8) => {
      if (piece8 != null) {
        piece8.possible_moves = [];
      }
    });
  }
  static add_visuals_to_possible_moves_for(piece8) {
    if (piece8 !== undefined) {
      this.add_dots_to_possible_moves_for(piece8);
      this.add_border_to_attacked_piece_for(piece8);
      if (piece8.type === PieceType.king) {
        const king2 = piece8;
        king2.add_borders_to_castleable_rooks(king2.rooks_for_king());
      }
    }
  }
  static add_dots_to_possible_moves_for(piece8) {
    piece8.possible_moves.forEach((possible_move) => {
      let square = SquareGrid.square_by_board_position(possible_move);
      if (square != null) {
        if (square.piece_attached_to_square() == undefined) {
          square.add_dot();
        }
      }
    });
  }
  static add_border_to_attacked_piece_for(piece8) {
    piece8.possible_moves.forEach((position) => {
      const piece_at_position = PieceList.piece_by_position(position);
      if (piece_at_position !== undefined) {
        if (piece8.color !== piece_at_position.color) {
          SquareGrid.square_by_board_position(position).add_border();
        }
      }
    });
  }
  static remove_visuals_from_possible_moves(piece8) {
    if (piece8 === undefined) {
      throw Error("Piece is undefined");
    }
    piece8.possible_moves.forEach((possible_move) => {
      let square = SquareGrid.square_by_board_position(possible_move);
      if (square != null) {
        square.remove_dot();
        square.remove_border();
      }
    });
  }
  static async move_piece_to(selected_square, piece8) {
    if (this.remove_piece_conditions(selected_square)) {
      selected_square.remove_piece();
    }
    GameController.add_move_to_list({ piece: piece8, from: piece8.pos, to: selected_square.square_id });
    await piece8.move_to(selected_square);
    this.redraw();
  }
  static remove_piece_conditions(selected_square) {
    let should_remove_piece = false;
    if (!selected_square.is_empty()) {
      if (selected_square.piece_attached_to_square().color != GameController.turn) {
        should_remove_piece = true;
      }
    }
    return should_remove_piece;
  }
  static async move_castle_pieces(new_king_square, king_piece, new_rook_square, rook_piece) {
    await king_piece.move_to(new_king_square);
    await rook_piece.move_to(new_rook_square);
    this.redraw();
  }
  static async redraw() {
    this.focused_square = undefined;
    GameController.switch_turn();
    Index.board.redraw();
  }
}

// src/components/square/square.ts
class Square extends HTMLElement {
  square_id;
  color;
  element = null;
  constructor(color9, square_id8) {
    super();
    this.square_id = SquareID.pos_at_index(square_id8);
    this.color = color9;
  }
  async build_clickable_square() {
    await this.append_children();
    this.element = document.getElementById(`${this.square_id}`);
    this.add_event_listener();
  }
  append_children() {
    return new Promise(async (resolve) => {
      let div_node = document.createElement("div");
      div_node.className = `${this.color}`;
      div_node.id = `${this.square_id}`;
      let p_node = document.createElement("p");
      p_node.className = "p";
      p_node.innerHTML = `${this.square_id}`;
      div_node.appendChild(p_node);
      div_node.appendChild(this.piece_image());
      this.appendChild(div_node);
      resolve();
    });
  }
  add_event_listener() {
    this.element?.addEventListener("click", this.handle_click.bind(this));
  }
  handle_click() {
    MoveController.on_square_click(this);
  }
  piece_image() {
    let piece8 = this.piece_attached_to_square();
    if (piece8 != null) {
      piece8.image.id = `${this.square_id}-image`;
      return piece8.image;
    } else
      return new Image;
  }
  update_image(new_image) {
    this.element = document.getElementById(`${this.square_id}`);
    const image = document.getElementById(`${this.square_id}-image`);
    if (image !== null) {
      if (this.element !== null) {
        this.element.removeChild(image);
        this.element.appendChild(new_image);
      }
    }
  }
  is_empty() {
    return this.piece_attached_to_square() == undefined;
  }
  piece_attached_to_square() {
    const position = this.square_id;
    return PieceList.piece_by_position(position);
  }
  add_border() {
    if (this.element != null) {
      this.element.style.border = "thick solid #0000FF";
    }
  }
  remove_border() {
    if (this.element != null) {
      this.element.style.border = "";
    }
  }
  add_dot() {
    const node = document.createElement("span");
    node.className = "dot";
    node.id = `${this.square_id}-dot`;
    if (this.element != null) {
      this.element.appendChild(node);
    }
  }
  remove_dot() {
    const node = document.getElementById(`${this.square_id}-dot`);
    if (node !== null) {
      this.element.removeChild(node);
    }
  }
  add_check_border() {
    this.element = document.getElementById(`${this.square_id}`);
    if (this.element != null) {
      this.element.style.backgroundColor = "red";
    }
  }
  remove_piece() {
    let piece8 = this.piece_attached_to_square();
    if (piece8 != null) {
      PieceList.remove_piece_by_id(piece8.title);
    }
  }
}
customElements.define("square-element", Square);

// src/components/square/color.ts
var SquareColor;
(function(SquareColor2) {
  SquareColor2["black"] = "black";
  SquareColor2["white"] = "white";
})(SquareColor || (SquareColor = {}));

// src/components/piece/styles.ts
class PieceStyles {
  static piece_style() {
    let style = document.createElement("style");
    style.innerHTML = `
      .piece {
        height: 80px;
        width: 80px;
        position: absolute;
        top: 65%;
        left: 57%;
        margin: -50px 0 0 -50px;
      }`;
    return style;
  }
}

// src/components/square/styles.ts
class SquareStyles {
  static square_style() {
    let style = document.createElement("style");
    style.innerHTML = `
    .black {
      height: 100px;
      width: 100px;
      background-color: #1FE5DF;
      position: relative;
      box-sizing: border-box
      }
      .white {
        height: 100px;
        width: 100px;
        background-color: #D8ECEC;
        position: relative;
        box-sizing: border-box
      }
      .row {
        height: 100px;
        width: 800px;
        display: flex;
      }
      .container {
        height: 800px;
        width: 800px;
        box-sizing: border-box;
        border: 1px solid #000;
        margin: 0 auto;
      }
      .p {
        position: absolute;
      }
      .dot {
        background-color: #0000FF;
        border-radius: 50%;
        height: 20px;
        width: 20px;
        position: absolute;
        top: 90%;
        left: 87%;
        margin: -50px 0 0 -50px;
      }
      `;
    return style;
  }
}

// src/components/board/board.ts
class Board extends HTMLElement {
  container_node = document.createElement("div");
  static board_size = Math.pow(row_and_column_size, 2);
  constructor() {
    super();
    this.render();
  }
  render() {
    this.add_styles_to_dom();
    this.board_generator();
    MoveController.load_possible_moves_lists();
  }
  add_styles_to_dom() {
    this.appendChild(SquareStyles.square_style());
    this.appendChild(PieceStyles.piece_style());
  }
  board_generator() {
    this.container_node.className = "container";
    this.container_node.id = "container";
    this.add_squares_to_board();
    this.append(this.container_node);
  }
  add_squares_to_board() {
    let next_square;
    let row_node = document.createElement("div");
    row_node.className = "row";
    this.container_node.appendChild(row_node);
    let row_array = [];
    for (let col = board_start_index;col < Board.board_size; col++) {
      next_square = this.instantiate_square(col);
      next_square.build_clickable_square();
      if (col % row_and_column_size === board_start_index && col > board_start_index) {
        row_node = document.createElement("div");
        row_node.className = "row";
        this.container_node.appendChild(row_node);
      }
      row_array.push(next_square);
      row_node.appendChild(next_square);
      if (row_array.length === row_and_column_size) {
        SquareGrid.square_grid.push(row_array);
        row_array = [];
      }
    }
  }
  instantiate_square(index) {
    let color10 = SquareColor.black;
    if (index % 2 === this.current_row(index)) {
      color10 = SquareColor.white;
    }
    let square2 = new Square(color10, index);
    return square2;
  }
  current_row(i) {
    let mod = board_start_index;
    if (i > 7 && i < 16) {
      mod = 1;
    } else if (i > 23 && i < 32) {
      mod = 1;
    } else if (i > 39 && i < 48) {
      mod = 1;
    } else if (i > 55) {
      mod = 1;
    }
    return mod;
  }
  async redraw() {
    SquareGrid.square_grid = [];
    document.querySelectorAll(".row").forEach((e) => e.remove());
    this.add_squares_to_board();
    MoveController.clear_possible_moves_lists();
    MoveController.load_possible_moves_lists();
  }
}
customElements.define("board-element", Board);

// src/index.ts
class Index extends HTMLElement {
  static board = new Board;
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.appendChild(Index.board);
  }
}
customElements.define("index-element", Index);
export {
  Index as default
};
