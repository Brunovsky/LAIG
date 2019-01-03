% build_start_node/2
test_build_start_node :-
    Board = [
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,w,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,w,b,b,b,b,w,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,b,w,w,w,w,b,c,c,c,c,c,c],
        [c,c,c,c,c,c,b,c,w,b,c,c,w,c,c,c,c,c,c],
        [c,c,c,c,b,w,w,w,w,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,b,c,w,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,w,c,b,w,b,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,b,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c]
    ],
    build_start_node(Board, b, [0,0], Node),
    %print_node(Node), nl,
    Node = node(Board, b, Val, [0,0], [], Total),
    evaluate_board(Board, Val),
    totalval(Val, [0,0], Total).

% build_child_node/3
test_build_child_node :-
    Board = [
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,w,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,w,b,b,b,b,w,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,b,w,w,w,w,b,c,c,c,c,c,c],
        [c,c,c,c,c,c,b,c,w,b,c,c,w,c,c,c,c,c,c],
        [c,c,c,c,b,w,w,w,w,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,b,c,w,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,w,c,b,w,b,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,b,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c]
    ],
    place_stone(b, Board, [12,13], NewBoard, _), !, % does not capture
    build_start_node(Board, b, [0,0], Node),
    %print_node(Node), nl, !,
    build_start_node(NewBoard, w, [0,0], NewNode), !,
    %print_node(NewNode), nl,
    build_child_node([12,13], Node, ChildNode),
    %print_node(ResultNode), nl,
    ChildNode = NewNode.

% order_children/3
test_order_children :-
    C1 = [10000-([1,4]-a), 7000-([3,2]-b), -500000-([4,5]-c), 0-([7,8]-d)],
    WC1 = [10000-([1,4]-a), 7000-([3,2]-b), 0-([7,8]-d), -500000-([4,5]-c)],
    reverse(WC1, BC1),
    C2 = [4-([1,1]-a), 7-([2,2]-b), 5-([3,3]-c), 6-([4,4]-d)],
    WC2 = [7-([2,2]-b), 6-([4,4]-d), 5-([3,3]-c), 4-([1,1]-a)],
    reverse(WC2, BC2),
    %print_children(C1), nl, print_children(WC1), nl, print_children(BC1), nl,
    %print_children(C2), nl, print_children(WC2), nl, print_children(BC2), nl,
    order_children(w, C1, WC1),
    order_children(w, C2, WC2),
    order_children(b, C1, BC1),
    order_children(b, C2, BC2).

% build_children/3
test_build_children :-
    Options = [turn(4), padding(2), width([10,5,3,2]), current(0), depth(2), rule(true)],
    Board = [
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,w,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,w,b,b,b,b,w,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,b,w,w,w,w,b,c,c,c,c,c,c],
        [c,c,c,c,c,c,b,c,w,b,c,c,w,c,c,c,c,c,c],
        [c,c,c,c,b,w,w,w,w,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,b,c,w,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,w,c,b,w,b,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,b,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c]
    ],
    build_start_node(Board, b, [0,0], BNode),
    build_start_node(Board, w, [0,0], WNode),
    build_children(BNode, _, Options),
    build_children(WNode, _, Options),
    print_tree_deep(BNode),
    print_tree_deep(WNode).

% build_tree/3
test_build_tree :-
    Options = [turn(73), padding(1), width([10,5,3,2]), current(0), depth(4), rule(true), traverse(false)],
    Board = [
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,w,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,w,b,b,b,b,w,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,b,w,w,w,w,b,c,c,c,c,c,c],
        [c,c,c,c,c,c,b,c,w,b,w,c,w,c,c,c,c,c,c],
        [c,c,c,c,b,w,w,w,w,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,b,c,w,b,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,w,c,b,w,b,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,b,c,c,c,c,b,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c],
        [c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c]
    ],
    Game = game(Board, b, [0,0], 74, Options),
    analyze_tree(Game, Tree),
    print_tree_deep(Tree), nl.

test_tree :- test_all(tree, [
    test_build_start_node,
    test_build_child_node,
    test_order_children,
    test_build_children,
    test_build_tree
]).
