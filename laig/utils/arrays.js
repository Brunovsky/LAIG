function isMatrix(matrix) {
    if (matrix == null || matrix.length === 0) return false;

    const cols = matrix.length;
    const rows = matrix[0].length;

    for (let i = 0; i < cols; ++i) {
        if (matrix[i].length != rows) return false;
    }

    return true;
}
