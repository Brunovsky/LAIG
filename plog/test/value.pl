% sumval/2, totalval/3
test_sumval :-
    Val1 = val([5,73,60], [173,561,-430], [34,51,-70,-54,30], [-34,0,82,52,-90]),
    Val2 = val([0,100,10000], [400,4000,40000], [0,0,0,0,0], [0,0,0,0,0]),
    Val3 = val([0,-100,-10000], [-400,-4000,-40000], [500,500,500,500,500], [0,0,0,0,0]),
    %print_val(Val1), nl, print_val(Val2), nl, print_val(Val3), nl,
    sumval(Val1, 443),
    sumval(Val2, 54500),
    sumval(Val3, -52000).

% test_evaluate_board/2
test_evaluate_board :-
    Board = [
        [c,w,b,c],
        [w,b,b,w],
        [w,c,w,w],
        [b,w,c,c]
    ],
    evaluate_board(Board, Val),
    %print_val(Val), nl,
    Val = val(RowV,ColV,LeftV,RightV),
    RowV = [Row1,Row2,Row3,Row4],
    ColV = [Col1,Col2,Col3,Col4],
    LeftV = [Left1,Left2,Left3,Left4,Left5,Left6,Left7],
    RightV = [Right1,Right2,Right3,Right4,Right5,Right6,Right7],
    evaluate([c,w,b,c], Row1), !,
    evaluate([w,b,b,w], Row2), !,
    evaluate([w,c,w,w], Row3), !,
    evaluate([b,w,c,c], Row4), !,
    evaluate([c,w,w,b], Col1), !,
    evaluate([w,b,c,w], Col2), !,
    evaluate([b,b,w,c], Col3), !,
    evaluate([c,w,w,c], Col4), !,
    evaluate([c], Left1), !,
    evaluate([b,w], Left2), !,
    evaluate([w,b,w], Left3), !,
    evaluate([c,b,w,c], Left4), !,
    evaluate([w,c,c], Left5), !,
    evaluate([w,w], Left6), !,
    evaluate([b], Left7), !,
    evaluate([c], Right1), !,
    evaluate([w,w], Right2), !,
    evaluate([b,b,w], Right3), !,
    evaluate([c,b,c,b], Right4), !,
    evaluate([w,w,w], Right5), !,
    evaluate([w,c], Right6), !,
    evaluate([c], Right7).

% test_reevaluate_cell/4, test_reevaluate_board/4
test_reevaluate :-
    Board = [
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,w,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,b,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,b,c,w,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,b,c,w,c,w,c,c,c,b,c,c,c,c,c],
        [c,c,c,c,c,c,b,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,b,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,w,c,c,w,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,b,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c]
    ],
    place_stone(w, Board, [10,13], NewBoard, _), !, % does not capture
    evaluate_board(Board, OldVal), !,
    evaluate_board(NewBoard, Val), !,
    reevaluate_board(Board, NewBoard, OldVal, Val), !,
    reevaluate_cell([10,13], NewBoard, OldVal, Val).

test_value :- test_all(value, [
    test_sumval,
    test_evaluate_board,
    test_reevaluate
]).
