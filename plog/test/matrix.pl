% is_matrix/1
test_is_matrix :-
    is_matrix([]),
    \+ is_matrix([[],[]]), \+ is_matrix(atom), \+ is_matrix(1),
    is_matrix([[1,2,3],[4,5,6]]),
    is_matrix([[1],[2],[3]]),
    \+ is_matrix([[1,2,3],[4,5,6,7]]),
    \+ is_matrix([[1,2,3],[4,5]]),
    \+ is_matrix([1,2,3]).

% matrixnth0/3, matrixnth1/3
test_matrixnth :-
    matrixnth0([2,1], [[a,b,c,d],[0,1,2,3],[x,y,z,w]], y),
    findall(P, matrixnth0(P, [[a,b,c,d],[w,z,x,y],[x,y,z,w]], y), [[1,3],[2,1]]),
    matrixnth1([3,2], [[a,b,c,d],[0,1,2,3],[x,y,z,w]], y),
    findall(P, matrixnth1(P, [[a,b,c,d],[w,z,x,y],[x,y,z,w]], y), [[2,4],[3,2]]).

% matrix_select/4
test_matrix_select :-
    matrix_select(4, [[1,2,3],[4,5,6]], a, [[1,2,3],[a,5,6]]),
    matrix_select(b, [[1,2],[a,b],[b,c]], z, [[1,2],[a,z],[b,c]]),
    matrix_select(b, [[1,2],[a,b],[b,c]], z, [[1,2],[a,b],[z,c]]),
    matrix_selectnth0(_, [[1,2,3],[4,5,6]], a, [[1,2,3],[4,a,6]], [1,1]),
    findall(P, matrix_selectnth0(b, [[1,2],[a,b],[b,c]], _, _, P), [[1,1],[2,0]]),
    matrix_selectnth1(_, [[1,2,3],[4,5,6]], a, [[1,2,3],[4,a,6]], [2,2]),
    findall(P, matrix_selectnth1(b, [[1,2],[a,b],[b,c]], _, _, P), [[2,2],[3,1]]).

% matrix_row/3, matrix_col/3, matrix_cell
test_matrix_rowcolcell :-
    matrix_row(2, [[1,2,3],[4,5,6],[7,8,9],[a,b,c]], [4,5,6]),
    matrix_row(1, [[1,2,3],[4,5,6],[7,8,9],[a,b,c]], [1,2,3]),
    \+ matrix_row(5, [[1,2,3],[4,5,6],[7,8,9],[a,b,c]], _),
    matrix_col(3, [[1,2,3],[4,5,6],[7,8,9],[a,b,c]], [3,6,9,c]),
    matrix_col(1, [[1,2,3],[4,5,6],[7,8,9],[a,b,c]], [1,4,7,a]),
    \+ matrix_col(4, [[1,2,3],[4,5,6],[7,8,9],[a,b,c]], _),
    matrix_cell([2,2], [[1,2,3],[4,5,6],[7,8,9],[a,b,c]], 5),
    matrix_cell([4,3], [[1,2,3],[4,5,6],[7,8,9],[a,b,c]], c),
    \+ matrix_cell([5,3], [[1,2,3],[4,5,6],[7,8,9],[a,b,c]], _).

% matrix_remove_*/3
test_matrix_remove :-
    matrix_remove_row(2, [[1,2,3],[4,5,6]], [[1,2,3]]),
    matrix_remove_row(1, [[1,2],[3,4],[5,6]], [[3,4],[5,6]]),
    matrix_remove_col(3, [[1,2,3,4],[4,5,6,7]], [[1,2,4],[4,5,7]]),
    matrix_remove_col(1, [[a,b,c,d],[a,b,c,d]], [[b,c,d],[b,c,d]]),
    matrix_remove_rowcol([3,2], [[a,b,c,d],[1,2,3,4],[x,y,z,w],[q,w,e,r]], [[a,c,d],[1,3,4],[q,e,r]]),
    matrix_remove_rows([2,4], [[a,b],[1,2],[c,d],[x,y],[z,w],[5,6]], [[a,b],[z,w],[5,6]]),
    matrix_remove_cols([2,3], [[a,b,c,d,e],[1,2,3,4,5]], [[a,d,e],[1,4,5]]),
    matrix_remove_rowscols([[2,3],[2,4]], [[a,b,c,d],[x,y,z,w],[1,2,3,4],[i,j,k,l],[4,3,2,1]], [[a],[i],[4]]),
    matrix_remove_row(3, [[1,2],[3,4],[5,6]], [[1,2],[3,4],[5,6]]),
    \+ matrix_remove_col(0, [[1],[2],[3]], _),
    matrix_remove_rowcol([5,3], [[a,b],[c,d],[e,f],[1,2],[x,y]], [[a,b],[c,d],[e,f],[1,2]]).

% matrix_*_reverse/2
test_matrix_reverse :-
    matrix_row_reverse([[1,2,3],[4,5,6],[7,8,9]], [[7,8,9],[4,5,6],[1,2,3]]),
    matrix_col_reverse([[1,2,3],[4,5,6],[7,8,9]], [[3,2,1],[6,5,4],[9,8,7]]),
    matrix_rowcol_reverse([[1,2,3],[4,5,6],[7,8,9]], [[9,8,7],[6,5,4],[3,2,1]]).

% matrix_range/3
test_matrix_range :-
    matrix_range([[1,2,3],[4,5,6],[7,8,9]], [[5,6],[8,9]], [[2,3],[2,3]]),
    matrix_range([[1,2,3],[4,5,6],[7,8,9]], [[5,6],[8,9]], [2,2]),
    matrix_range([[1,2],[3,4],[5,6],[7,8]], [[2],[4],[6]], [[1,3],2]),
    findall(X1, matrix_range([[1,2],[3,4],[1,2],[3,4]], [[1],[3]], X1), L1),
    perm(L1, [[[1,2], [1,1]], [[3,4],[1,1]]]).

% matrix_main_diagonal/2
test_matrix_main_diagonal :-
    matrix_main_diagonal([], []),
    matrix_main_diagonal([[1,2,3],[4,5,6],[7,8,9]], [1,5,9]),
    matrix_main_diagonal([[1,2,3],[4,5,6]], [1,5]),
    matrix_main_diagonal([[1,2,3],[4,5,6],[7,8,9],[a,b,c]], [1,5,9]).

% matrix_left_diagonal/3, matrix_right_diagonal/3
test_matrix_diagonal :-
    matrix_left_diagonal([2,3], [[1,2,3],[4,5,6],[7,8,9]], [2,6]),
    matrix_left_diagonal([3,1], [[1,2,3],[4,5,6],[7,8,9]], [7]),
    matrix_right_diagonal([2,3], [[1,2,3],[4,5,6],[7,8,9]], [6,8]),
    matrix_right_diagonal([3,1], [[1,2,3],[4,5,6],[7,8,9]], [3,5,7]).

% matrix_left_diagonals/2, matrix_right_diagonals/2
test_matrix_diagonals :-
    matrix_left_diagonals([[1,2,3],[4,5,6],[7,8,9]], [[3],[2,6],[1,5,9],[4,8],[7]]),
    matrix_right_diagonals([[1,2,3],[4,5,6],[7,8,9]], [[1],[2,4],[3,5,7],[6,8],[9]]),
    matrix_diagonals([[1,2,3,4],[5,6,7,8],[a,b,c,d]], L),
    perm(L, [[4],[3,8],[2,7,d],[1,6,c],[5,b],[a],[1],[2,5],[3,6,a],[4,7,b],[8,c],[d]]).

% matrix_map/3
test_matrix_map :-
    matrix_map(<, [[1,6,3,4],[5,2,3,1]], [[2,9,7,5],[10,3,4,6]]).

% segment_any_*/2, segment_matrix/2
test_matrix_segment :-
    segment_any_row([[1,2,3,4],[5,6,7,8],[a,b,c,d]], [6,7]),
    \+ segment_any_row([[1,2,3,4],[5,6,7,8],[a,b,c,d]], [8,d]),
    segment_any_col([[1,2,3,4],[5,6,7,8],[a,b,c,d]], [3,7]),
    \+ segment_any_col([[1,2,3,4],[5,6,7,8],[a,b,c,d]], [3,c]),
    segment_any_diagonal([[1,2,3,4],[5,6,7,8],[a,b,c,d]], [1,6,c]),
    segment_any_diagonal([[1,2,3,4],[5,6,7,8],[a,b,c,d]], [8,c]),
    \+ segment_any_diagonal([[1,2,3,4],[5,6,7,8],[a,b,c,d]], [3,7]),
    segment_matrix([[1,2,3,4],[5,6,7,8],[a,b,c,d]], [3,8]).

% matrix_boundary/4
test_matrix_boundary :-
    M = [
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,w,c,c,c,c,c,c,c],
        [c,c,c,c,c,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,w,c,b,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,b,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,w,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c]
    ],
    matrix_boundary(M, c, 0, [[5,14],[6,10]]),
    matrix_boundary(M, c, 1, [[4,15],[5,11]]),
    matrix_boundary(M, c, 10, [[1,15],[1,15]]),
    matrix_boundary(M, c, [0,3], [[5,14],[3,13]]),
    matrix_boundary(M, c, [[3,0],[4,2]], [[2,14],[2,12]]).

test_matrix :- test_all(matrix, [
    test_is_matrix,
    test_matrixnth,
    test_matrix_select,
    test_matrix_rowcolcell,
    test_matrix_remove,
    test_matrix_reverse,
    test_matrix_range,
    test_matrix_main_diagonal,
    test_matrix_diagonal,
    test_matrix_diagonals,
    test_matrix_map,
    test_matrix_segment,
    test_matrix_boundary
]).
