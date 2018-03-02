module.exports = function solveSudoku(matrix, row = 0, col = 0) {
    // your solution
    let location = findUnassignedLocation(matrix, row, col);
    row = location[0];
    col = location[1];

    if (row === -1) {
        return matrix;
    }
    for (let n = 1; n <= 9; n++) {
        if (conflicts(row, col, n, matrix)) {
            matrix[row][col] = n;

            if (solveSudoku(matrix, row, col)) {
                return matrix;
            }

            matrix[row][col] = 0;
        }
    }
    return false;

    function conflicts(r, c, n, matrix) {
        for (let i = 0; i < 9; i++) {
            if (matrix[i][c] === n) {
                return false;
            } else if (matrix[r][i] === n) {
                return false;
            }
        }

        r = Math.floor(r / 3) * 3;
        c = Math.floor(c / 3) * 3;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (matrix[row + r][col + c] === n) {
                    return false;
                }
            }
        }

        return true;
    }

    function findUnassignedLocation(grid, row, col) {
        for (; row < 9; col = 0, row++) {
            for (; col < 9; col++) {
                if (grid[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return [-1, -1];
    }
}
