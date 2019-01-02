% nth0(N, List, Elem), nth1(N, List, Elem)
test_nth :-
    nth0(3, [0,1,2,3,4,1,2,3,2], 3),
    nth1(3, [0,1,2,3,4,1,2,3,2], 2),
    findall(N1, nth0(N1, [0,1,2,3,4,1,2,3,2], 2), [2,6,8]),
    findall(N2, nth1(N2, [0,1,2,3,4,1,2,3,2], 2), [3,7,9]),
    findall(X1, nth0(_, [0,1,2,3,4,1,2,3,2], X1), [0,1,2,3,4,1,2,3,2]),
    findall(X2, nth1(_, [0,1,2,3,4,1,2,3,2], X2), [0,1,2,3,4,1,2,3,2]),
    findall(N3, nth0(N3, [0,1,2,3,4,1,2,3,2], _), [0,1,2,3,4,5,6,7,8]),
    findall(N4, nth1(N4, [0,1,2,3,4,1,2,3,2], _), [1,2,3,4,5,6,7,8,9]),
    setof(X5, N5^nth0(N5, [0,1,2,3,4,1,2,3,2], X5), [0,1,2,3,4]),
    setof(X6, N6^nth1(N6, [0,1,2,3,4,1,2,3,2], X6), [0,1,2,3,4]).

% select(Elem, Set, Residue), selectchk(Elem, Set, Residue)
test_select :-
    select(a, [a,b,c,d,a,b,c,a,b], [b,c,d,a,b,c,a,b]),
    select(a, [a,b,c,d,a,b,c,a,b], [a,b,c,d,b,c,a,b]),
    select(a, [a,b,c,d,a,b,c,a,b], [a,b,c,d,a,b,c,b]),
    selectchk(a, [a,b,c,d,a,b,c,a,b], [b,c,d,a,b,c,a,b]),
    \+ selectchk(a, [a,b,c,d,a,b,c,a,b], [a,b,c,d,b,c,a,b]),
    \+ selectchk(a, [a,b,c,d,a,b,c,a,b], [a,b,c,d,a,b,c,b]),
    setof(X1, select(a, X1, [b,c]), [[a,b,c], [b,a,c], [b,c,a]]),
    setof(X2, selectchk(a, X2, [b,c]), [[a,b,c]]),
    setof(X3, select(a, [a,b,c,a,d,a], X3), L3),
    perm(L3, [[b,c,a,d,a],[a,b,c,d,a],[a,b,c,a,d]]),
    setof(X4, selectchk(a, [a,b,c,a,d,a], X4), [[b,c,a,d,a]]).
    
% selectnth0(X, Xlist, Y, Ylist, N), selectnth1(X, Xlist, Y, Ylist, N)
test_selectnth5 :-
    selectnth0(c, [a,b,c,d], A, [a,b,A,d], 2),
    selectnth1(c, [a,b,c,d], B, [a,b,B,d], 3),
    findall(C, selectnth0(_, [a,b,c,d], _, _, C), [0,1,2,3]),
    findall(D, selectnth1(_, [a,b,c,d], _, _, D), [1,2,3,4]),
    findall(E, selectnth0(_, [a,b,c], z, E, _), [[z,b,c],[a,z,c],[a,b,z]]),
    findall(F, selectnth1(_, [a,b,c], z, F, _), [[z,b,c],[a,z,c],[a,b,z]]),
    findall(G, selectnth0(a, [a,b,c,a,d,a], z, G, _), [[z,b,c,a,d,a],[a,b,c,z,d,a],[a,b,c,a,d,z]]),
    findall(H, selectnth1(a, [a,b,c,a,d,a], z, H, _), [[z,b,c,a,d,a],[a,b,c,z,d,a],[a,b,c,a,d,z]]),
    % replace
    selectnth0(_, [a,b,c,d,e,f], z, [a,b,c,z,e,f], 3),
    selectnth1(_, [a,b,c,d,e,f], z, [a,b,c,z,e,f], 4).


% fill_n(N, Elem, List).
test_fill_n :-
    fill_n(4, a, [a,a,a,a]),
    fill_n(7, b, [b,b,b,b,b,b,b]),
    fill_n(2, 0, [0,0]),
    fill_n(0, a, []),
    fill_n(3, [a,X], [[a,X],[a,X],[a,X]]),
    \+ fill_n(3, a, [a,a,a,a]),
    \+ fill_n(5, c, [c,c,c]).

% range(List, I, Part).
test_range :-
    range([0,1,2,3,4,5], [2,3,4], [3,5]),
    range([a,b,c,d,e,f,g], [b,c,d,e,f], [2,6]),
    \+ range([a,b,c,d], [c,d], [3,10]),
    \+ range([a,b,c], [], [4,5]),
    range([0,1,2,3,4,5], [3,4,5], 4),
    range([a,b,c,d,e,f,g], [e,f,g], 5).

% consecutive(List, Elem, N).
test_consecutive :-
    consecutive([0,1,3,3,2,4,2,3,3,3,7,4], 3, 3),
    %\+ consecutive([0,0,3,3,4,9,7,3,4,3,0,3,3,3,3,5], 3, 5),
    %consecutive([6,4,2,8,3,4,4,5,8,8,9,9,9,8,1,2,3,5,6,8,8,2,3,9], 9, 3),
    %consecutive([3,2,4,4,4,4,2,0], 4, 4),
    %\+ consecutive([3,2,4,4,4,2,0], 4, 4),
    \+ consecutive([0,1], a, 5).

% map(P, List, R).
test_map :-
    map(length, [[a,b,c],[d,e],[f,g,h,i]], [3,2,4]),
    map(last, [[a,b,c],[d,e],[f,g,h,i]], [c,e,i]),
    map(reverse, [[a,b,c],[d,e,f]], [[c,b,a],[f,e,d]]),
    map(_, [], []).

% l_map(P, List, Args, R).
test_l_map :-
    lb_map(index, [a], [[a,b,a],[b,b,a,b],[c,c,b,a]], [1,3,4]),
    b_map(fill_n, a, [3,4,2], [[a,a,a],[a,a,a,a],[a,a]]),
    la_map(range, [[2,3]], [[a,b,c,d],[e,f,g,h]], [[b,c],[f,g]]).

% flatten(List, Flat).
test_flatten :-
    flatten([[a,b,c],[d,e,f]], [a,b,c,d,e,f]),
    \+ flatten([[a,b],c,d], _),
    flatten([[a,b,c],[d,[e,f]]], [a,b,c,d,[e,f]]).

% mixed_flatten(List, Flat).
test_mixed_flatten :-
    mixed_flatten([[a,b,c],[d,e,f]], [a,b,c,d,e,f]),
    mixed_flatten([[a,b],c,d], [a,b,c,d]),
    mixed_flatten([[a,b,c],[d,[e,f]]], [a,b,c,d,[e,f]]).

% deep_flatten(List, Flat).
test_deep_flatten :-
    deep_flatten([[a,b,c],[d,e,f]], [a,b,c,d,e,f]),
    deep_flatten([[a,b],c,d], [a,b,c,d]),
    deep_flatten([[a,b,c],[d,[e,f]]], [a,b,c,d,e,f]),
    deep_flatten([[a,[b,c,[d,[e,f]],[g,h]]],[i],j], [a,b,c,d,e,f,g,h,i,j]).

% clear_empty_list(L, R).
test_clear_empty_list :-
    clear_empty_list([a,b,[],c,d,[]], [a,b,c,d]),
    clear_empty_list([[],[],[],[]], []),
    clear_empty_list([a,b,c],[a,b,c]).

% index(List, Elem, I).
test_index :-
    index([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 5),
    \+ index([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 8),
    \+ index([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 12),
    \+ index([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 14),
    index([a,b,a,a,b,b,a,c,b,a,a,b,c,a], c, 8),
    \+ index([a,b,a,a,b,b,a,c,b,a,a,b,c,a], c, 13),
    index([a,b,c,d], b, 2),
    \+ index([a,b,a,a,b,b], c, _),
    \+ index([], _, _).

% last_index(List, Elem, I).
test_last_index :-
    \+ last_index([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 5),
    \+ last_index([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 8),
    \+ last_index([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 12),
    last_index([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 14),
    \+ last_index([a,b,a,a,b,b,a,c,b,a,a,b,c,a], c, 8),
    last_index([a,b,a,a,b,b,a,c,b,a,a,b,c,a], c, 13),
    last_index([a,b,c,d], b, 2),
    \+ last_index([a,b,a,a,b,b], c, _),
    \+ last_index([], _, _).

% indices(List, Elem, I).
test_indices :-
    indices([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 5),
    indices([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 8),
    indices([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 12),
    indices([a,b,a,a,c,b,b,c,a,a,b,c,a,c,b], c, 14),
    indices([a,b,a,a,b,b,a,c,b,a,a,b,c,a], c, 8),
    indices([a,b,a,a,b,b,a,c,b,a,a,b,c,a], c, 13),
    indices([a,b,c,d], b, 2),
    \+ indices([a,b,a,a,b,b], c, _),
    \+ indices([], _, _).

% *_*_suchthat(P, List, Args, I).
test_suchthat :-
    index_suchthat(var, [0,b,_,0,b,_,a,7,q,_,s,y], 3),
    \+ index_suchthat(var, [0,b,_,0,b,_,a,7,q,_,s,y], 6),
    \+ index_suchthat(var, [0,b,_,0,b,_,a,7,q,_,s,y], 10),
    \+ last_index_suchthat(var, [0,b,_,0,b,_,a,7,q,_,s,y], 3),
    \+ last_index_suchthat(var, [0,b,_,0,b,_,a,7,q,_,s,y], 6),
    last_index_suchthat(var, [0,b,_,0,b,_,a,7,q,_,s,y], 10),
    indices_suchthat(var, [0,b,_,0,b,_,a,7,q,_,s,y], 3),
    indices_suchthat(var, [0,b,_,0,b,_,a,7,q,_,s,y], 6),
    indices_suchthat(var, [0,b,_,0,b,_,a,7,q,_,s,y], 10),
    a_index_suchthat(char_uppercase, [0,b,_,0,b,_,a,7,q,_,s,y], 'B', 2),
    \+ a_index_suchthat(char_uppercase, [0,b,_,0,b,_,a,7,q,_,s,y], 'B', 5),
    \+ a_index_suchthat(char_uppercase, [0,b,_,0,b,_,a,7,q,_,s,y], 'B', 6),
    \+ a_last_index_suchthat(char_uppercase, [0,b,_,0,b,_,a,7,q,_,s,y], 'B', 2),
    \+ a_last_index_suchthat(char_uppercase, [0,b,_,0,b,_,a,7,q,_,s,y], 'B', 5),
    a_last_index_suchthat(char_uppercase, [0,b,_,0,b,_,a,7,q,_,s,y], 'B', 10),
    a_indices_suchthat(char_uppercase, [0,b,_,0,b,_,a,7,q,_,s,y], 'B', 2),
    a_indices_suchthat(char_uppercase, [0,b,_,0,b,_,a,7,q,_,s,y], 'B', 5),
    a_indices_suchthat(char_uppercase, [0,b,_,0,b,_,a,7,q,_,s,y], 'B', 10),
    l_index_suchthat(char_uppercase, [0,b,_,0,a,_,a,7,q,_,s,y], ['A'], 3),
    \+ l_index_suchthat(char_uppercase, [0,b,_,0,a,_,a,7,q,_,s,y], ['A'], 5),
    \+ l_index_suchthat(char_uppercase, [0,b,_,0,a,_,a,7,q,_,s,y], ['A'], 6),
    \+ l_last_index_suchthat(char_uppercase, [0,b,_,0,a,_,a,7,q,_,s,y], ['A'], 3),
    \+ l_last_index_suchthat(char_uppercase, [0,b,_,0,a,_,a,7,q,_,s,y], ['A'], 5),
    l_last_index_suchthat(char_uppercase, [0,b,_,0,a,_,a,7,q,_,s,y], ['A'], 10),
    l_indices_suchthat(char_uppercase, [0,b,_,0,a,_,a,7,q,_,s,y], ['A'], 5),
    l_indices_suchthat(char_uppercase, [0,b,_,0,a,_,a,7,q,_,s,y], ['A'], 7),
    l_indices_suchthat(char_uppercase, [0,b,_,0,a,_,a,7,q,_,s,y], ['A'], 10).


test_lists :- test_all(lists, [
    test_nth,
    test_select,
    test_selectnth5,
    test_fill_n,
    test_range,
    test_consecutive,
    test_map,
    test_l_map,
    test_flatten,
    test_mixed_flatten,
    test_deep_flatten,
    test_clear_empty_list,
    test_index,
    test_last_index,
    test_indices,
    test_suchthat
]).
