# SICSTUS library(lists) Predicates

### select/3

    select(?Element, ?Set, ?Residue).

Set is a list, Element occurs in Set, and Residue is everything in Set except Element, in the same order.

### selectchk/3

    selectchk(+Element, +Set, ?Residue).

Is to select/3 what memberchk/2 is to member/2. Locates first occurrence of Element in Set,
deletes it, and returns Residue.

### append/2

    append(+ListOfLists, -List).

True when ListOfLists is a list[L1, L2, ...] of lists, List is a list, and concatenating L1, ..., Ln together yields List. ListOfLists must be a proper list. List should be a proper list or each of L1, ..., Ln a proper list.

### append/5

    append(?Prefix, ?Tail1, ?List1, ?Tail2, ?List2).

True when both append(Prefix, Tail1, List1) and append(Prefix, Tail2, List2) succeed.

### correspond/4

    correspond(?X, ?Xlist, ?Ylist, ?Y).

True when Xlist and Ylist are lists, X is an element of Xlist, Y is an element of Ylist, and X and Y are in similar places in their lists. Matches only once. See select/4 for multiple matches.

### delete/3

    delete(+List, +Kill, -Residue).

True when List is a list and Residue is a copy of List with all elements equal to Kill deleted. To extract a single instance of Kill use select/3 instead. If List is not proper, it fails. Uses \= for comparison, keep element instantiation in mind.

### delete/4

    delete(+List, +Kill, +Count, -Residue).

Same as delete/3 but delete at most Count element.

### is_list/1

    is_list(+List).

Succeeds when List is a proper list (either nil [] or [H | T] with T proper).

### keys_and_values/3

    keys_and_values(?[K1-V1,K2-V2,...,Kn-Vn], ?[K1,...,Kn], ?[V1,...,Vn]).

True when the arguments are as above.
Used to split a list of value-pairs or to form one from two lists.

### last/2

    last(+List, -Last).

List is proper and Last is the last element.

### nextto(?X, ?Y, ?List).

    nextto(?X, ?Y, ?List).

True when X and Y appear side-by-side in List.

### nth0/3, nth0/4

    nth0(?N, ?List, ?Elem).
    nth0(?N, ?List, ?Elem, ?Rest).

True when Elem is the Nth element of List, counting the first element as 0, i.e. 0-indexed.
Either N should be an integer, or List proper.
Rest is the remainder of the list, with Elem deleted.

### nth1/3, nth1/4

    nth1(?N, ?List, ?Elem).
    nth1(?N, ?List, ?Elem, ?Rest).

Same as nth0 but 1-indexed.

### one_longer(?Longer, ?Shorter).

    one_longer(?Longer, ?Shorter).

True when the length of Longer is one more than that of Shorter.

### perm/2

    perm(+List, ?Perm).

True when List and Perm are permutation of each other. Mainly used to generate permutations. List must be a proper list, Perm may be partially instantiated.

### permutation/2

    permutation(?List, ?Perm).

Like perm/2, but List needs not be a proper list. Prefer perm/2.

### perm2/4

    perm2(?A, ?B, ?C, ?D).

True when {A,B} = {C,D}, i.e. when either A=C and B=D or A=D and B=C.

### proper_length/2

    proper_length(+List, ?Length) :- is_list(List), length(List, Length).

Fails for cyclic lists.

### remove_dups/2

    remove_dups(+List, ?Pruned).

Removed duplicated element from List, which should be proper.

### reverse/2

    reverse(?List, ?Reversed).

List and Reversed are lists with the same elements in opposite directions. Either should be proper.

### rev/2

    rev(+List, ?Reversed).

Like reverse/2 but only one way. Prefer reverse/2.

### same_length/2

    same_length(?List1, ?List2).

If either list is bound to a proper list, this predicate is determinate and terminating.

### same_length/3

    same_length(?List1, ?List2, ?Length).

If either list is bound to a proper list or length is instantiated, this predicate is determinate and terminating.

### select/4

    select(?X, ?Xlist, ?Y, ?Ylist).

True when X is Xlist[K] and Y is Ylist[K] for some K, and apart from that Xlist and Ylist are the same. Use it to replace X by Y or vice versa.

### selectchk/4

    selectchk(?X, +Xlist, ?Y, +Ylist).

Is to select/4 what memberchk/2 is to member/2. Finds K such that X is Xlist[K] and Y is Ylist[K], and commits to this binding.

### shorter_list/2

    shorter_list(?Short, ?Long).

True when Short is strictly shorter than Long.

### subseq/3

    subseq(?Sequence, ?SubSequence, ?Complement).

True when SubSequence and Complement are both subsequences of the list Sequence (the order of corresponding elements being preserved) and every element of Sequence which is not in SubSequence is in Complement and viceversa.
So length(Sequence) = length(SubSequence) + length(Complement).
Can be used to generate subsets and their complements, or to interleave two lists in all possible ways.

### subseq0/2

    subseq0(+Sequence, ?SubSequence).

True when SubSequence is a subsequence of Sequence or Sequence itself.
Consider setof(X, subseq0([a,b,c],X), Xs).

### subseq1/2

    subseq1(+Sequence, ?SubSequence).

True when SubSequence is a proper subsequence of Sequence.
Consider setof(X, subseq1([a,b,c],X), Xs).

### sumlist/2

    sumlist(+Numbers, ?Total).

True when Numbers is a list of integer, and Total their sum.

### transpose/2

    transpose(?X, ?Y).

True when X is a NxM rectangular matrix and Y is its MxN transpose matrix. Both lists should have rectangular form.

### append_length/4

    append_length(?Prefix, ?Suffix, ?List, ?Length) :-
        append(Prefix, Suffix, List),
        length(Prefix, Length).

Normal use is to split List into a Prefix of a given Length and the corresponding Suffix.

### prefix_length/3, proper_prefix_length/3

    prefix_length(?List, ?Prefix, ?Length).
    proper_prefix_length(?List, ?Prefix, ?Length).

True when Prefix is the (proper) prefix sublist of List with length Length.

### suffix_length/3, proper_suffix_length/3

    suffix_length(+List, ?Suffix, ?Length).
    proper_suffix_length(+List, ?Prefix, ?Length).

List must be a proper List. Suffix is the (proper) suffix sublist of List with length Length.

### rotate_list/3

    rotate_list(+Amount, ?List, ?Rotated).

Is true when List and Rotated are list of the same length, and List is rotated left by Amount to yields Rotated. If either list is bound to a proper list, rotate_list is determinate.

### sublist/5

    sublist(+Whole, ?Part, ?Before, ?Length, ?After).

True when Whole is a proper list, Part is a list, Whole = Alpha | Part | Omega, and the lengths of Alpha, Part, Omega are Before, Length, After respectively.
Should be used to extract ranges within Whole.

### cons/3, last/3, head/2, tail/2

    cons(?Head, ?Tail, ?List).
    last(?Fore, ?Last, ?List) :- append(Fore, [Last], List).
    head(?List, ?Head).
    tail(?List, ?Tail).

### prefix/2, proper_prefix/2

    prefix(?List, ?Prefix).
    proper_prefix(?List, ?Prefix).

Prefix is a (proper) prefix of List.

### suffix/2, proper_suffix/2

    suffix(?List, ?Suffix).
    proper_suffix(?List, ?Suffix).

Suffix is a (proper) suffix of List.

### segment/2, proper_segment/2
    
    segment(?List, ?Segment).
    proper_segment(?List, ?Segment).

True when Segment is a (proper) subsegment of List, as if by sublist/5.
Notice maximum (n+1)(n+2)/2 solutions.

### cumlist/4, cumlist/5, cumlist/6

    cumlist(:Pred, +[X1,...,Xn], ?V0, ?[V1,...,Vn]).
    cumlist(:Pred, +[X1,...,Xn], +[Y1,...,Yn], ?V0, ?[V1,...,Vn]).
    cumlist(:Pred, +[X1,...,Xn], +[Y1,...,Yn], +[Z1,...,Zn], ?V0, ?[V1,...,Vn]).

Accumulator.
cumlist/4 maps a ternary predicate Pred down the list [X1,...,Xn] just as scanlist/4 does, and returns a list of the results. It terminates when the lists run out. If Pred is bidirectional, it may be used to derive [X1,...,Xn] from V0 and [V1,...,Vn].

    cumlist(Pred, Xs, V0, Cum) :-
    (   foreach(X, Xs),
        foreach(V, Cum),
        fromto(V0, V1, V, _),
        param(Pred)
    do  call(Pred, X, V1, V)
    ).
        
    cumlist(Pred, Xs, Ys, V0, Cum) :-
    (   foreach(X, Xs),
        foreach(Y, Ys),
        foreach(V, Cum),
        fromto(V0, V1, V, _),
        param(Pred)
    do  call(Pred, X, Y, V1, V)
    ).
        
    cumlist(Pred, Xs, Ys, Zs, V0, Cum) :-
    (   foreach(X, Xs),
        foreach(Y, Ys),
        foreach(Z, Zs),
        foreach(V, Cum),
        fromto(V0, V1, V, _),
        param(Pred)
    do  call(Pred, X, Y, Z, V1, V)
    ).

### maplist/2, maplist/3, maplist/4

    maplist(:Pred, +List).
    maplist(:Pred, +OldList, ?NewList).
    maplist(:Pred, ?Xs, ?Ys, ?Zs).

maplist/2 succeeds when Pred(X) succeeds for each element X of List. List should be proper.

maplist/3 succeeds when Pred(Old, New) succeeds for each corresponding Old in OldList, New in NewList. Either OldList or NewList should be a proper list.

maplist/4 succeeds when Pred(X, Y, Z) succeeds for each corresponding X, Y, Z in Xs, Ys, Zs. At least one of Xs, Ys, Zs should be proper.

    maplist(Pred, Xs) :-
    (   foreach(X, Xs),
        param(Pred)
    do  call(Pred, X)
    ).

    maplist(Pred, Xs, Ys) :-
    (   foreach(X, Xs),
    (   foreach(Y, Ys),
        param(Pred)
    do  call(Pred, X, Y)
    ).
        
    maplist(Pred, Xs, Ys) :-
    (   foreach(X, Xs),
    (   foreach(Y, Ys),
        param(Pred)
    do  call(Pred, X, Y)
    ).

### map_product/4

    map_product(:Pred, +Xs, +Ys, -PredOfProduct).

If Xs = [X1,...,Xm] and Ys = [Y1,...,Yn] then P(Xi,Yj,Zij), PredOfProduct = [Z11,Z12,...,Zmn].

    map_product(Pred, Xs, Ys, Zs) :-
    (   foreach(X,Xs),
        fromto(Zs,S0,S,[]),
        param([Ys,Pred])
    do  (   foreach(Y,Ys),
            fromto(S0,[Z|S1],S1,S),
            param([X,Pred])
        do  call(Pred, X, Y, Z)
        )
    ).

### scanlist/4, scanlist/5, scanlist/6

    scanlist(:Pred, [X1,...,Xn], ?V1, ?V).
    scanlist(:Pred, [X1,...,Xn], [Y1,...,Yn], ?V1, ?V).
    scanlist(:Pred, [X1,...,Xn], [Y1,...,Yn], [Z1,...,Zn], ?V1, ?V).

Maps a ternary relation Pred down a list. The computation is Pred(X1, V1, V2), Pred(X2, V2, V3), ..., Pred(Xn, Vn, V). So if Pred is plus/3, scanlist is an accumulator.

    scanlist(Pred, Xs, V0, V) :-
    (   foreach(X,Xs),
        fromto(V0,V1,V2,V),
        param(Pred)
    do  call(Pred, X, V1, V2)
    ).
        
    scanlist(Pred, Xs, Ys, V0, V) :-
    (   foreach(X,Xs),
        foreach(Y,Ys),
        fromto(V0,V1,V2,V),
        param(Pred)
    do  call(Pred, X, Y, V1, V2)
    ).
        
    scanlist(Pred, Xs, Ys, Zs, V0, V) :-
    (   foreach(X,Xs),
        foreach(Y,Ys),
        foreach(Z,Zs),
        fromto(V0,V1,V2,V),
        param(Pred)
    do  call(Pred, X, Y, Z, V1, V2)
    ).

### some/2, somechk/2, some/3, somechk/3, some/4, somechk/4

    some(:Pred, +List).
    some(:Pred, +Xs, +Ys).
    some(:Pred, +Xs, +Ys, +Zs).

some/2 succeeds when Pred(Elem) succeeds for some Elem in List). It will try all ways of proving Pred for each Elem, and will try each Elem in the List. somechk/2 is to some/2 what memberchk/2 is to member/2, cutting and binding to the first solution.
some/3 uses Pred(Xi, Yi) and some/4 uses Pred(Xi, Yi, Zi).

### convlist/3

    convlist(:Rewrite, +OldList, ?NewList).

Like maplist/3, but elements for which the mapping fails are not represented in NewList.

    convlist(Pred, Xs, News) :-
    (   foreach(X,Xs),
        fromto(News,S0,S,[]),
        param(Pred)
    do  (call(Pred,X,N) -> S0 = [N|S]; S0 = S)
    ).

### exclude/3, exclude/4, exclude/5

    exclude(:Pred, +Xs, ?SubList).
    exclude(:Pred, +Xs, +Ys, ?SubList).
    exclude(:Pred, +Xs, +Ys, +Zs, ?SubList).

exclude/3 succeeds when SubList is the sublist of Xs containing all the elements Xi for which Pred(Xi) is false. exclude/4 and exclude/5 use Pred(Xi, Yi) and Pred(Xi, Yi, Zi) respectively but only include Xi in SubList.

    exclude(Pred, Xs, News) :-
    (   foreach(X,Xs),
        fromto(News,S0,S,[]),
        param(Pred)
    do  (call(Pred,X) -> S0 = S ; S0 = [X|S])
    ).
        
    exclude(Pred, Xs, Ys, News) :-
    (   foreach(X,Xs),
        foreach(Y,Ys),
        fromto(News,S0,S,[]),
        param(Pred)
    do  (call(Pred,X,Y) -> S0 = S ; S0 = [X|S])
    ).
        
    exclude(Pred, Xs, Ys, Zs, News) :-
    (   foreach(X,Xs),
        foreach(Y,Ys),
        foreach(Z,Zs),
        fromto(News,S0,S,[]),
        param(Pred)
    do  (call(Pred,X,Y,Z) -> S0 = S ; S0 = [X|S])
    ).

### include/3, include/4, include/5

    include(:Pred, +Xs, ?SubList).
    include(:Pred, +Xs, +Ys, ?SubList).
    include(:Pred, +Xs, +Ys, +Zs, ?SubList).

include/3 succeeds when SubList is the sublist of Xs containing all the elements Xi for which Pred(Xi) is true. include/4 and include/5 use Pred(Xi, Yi) and Pred(Xi, Yi, Zi) respectively but only include Xi in SubList.

    include(Pred, Xs, News) :-
    (   foreach(X,Xs),
        fromto(News,S0,S,[]),
        param(Pred)
    do  (call(Pred,X) -> S0 = [X|S] ; S0 = S)
    ).
        
    include(Pred, Xs, Ys, News) :-
    (   foreach(X,Xs),
        foreach(Y,Ys),
        fromto(News,S0,S,[]),
        param(Pred)
    do  (call(Pred,X,Y) -> S0 = [X|S] ; S0 = S)
    ).
    include(Pred, Xs, Ys, Zs, News) :-
    (   foreach(X,Xs),
        foreach(Y,Ys),
        foreach(Z,Zs),
        fromto(News,S0,S,[]),
        param(Pred)
    do  (call(Pred,X,Y,Z) -> S0 = [X|S] ; S0 = S)
    ).

### partition/5

    partition(:Pred, +List, ?Less, ?Equal, ?Greater).

Call Pred(X, R) for each element X of List, and map X to Less, Equal or Greater according to R being <, = or > (atoms).

### group/4

    group(:Pred, +List, ?Front, ?Back).

True when append(Front, Back, List) and maplist(Pred, Front), and Front is as long as possible.

### group/5

    group(:Pred, +Key, +List, ?Front, ?Back) :-
        group(call(Pred, Key), List, Front, Back).

### group/3

    group(:Pred, +List, ?ListOfLists).

True when append(ListOfLists, List), each element of ListOfLists has the form [H|T] such that group(Pred, H, T, T, []), and each element of ListOfLists is as long as possible.

### ordered/1

    ordered(+List).

True when the list is ordered by @=<.

### ordered/2

    ordered(:P, +List).

True when the list is ordered by P.

### max_member/2, min_member/2

    max_member(?Xmax, Xs).
    min_member(?Xmin, Xs).

True when Xmax is the maximum element of Xs; Xmin is the minimum element of Xs. Comparison with @=<.

    max_member(Maximum, [Head|Tail]) :-
    (   foreach(X,Tail),
        fromto(Head,M0,M,Maximum)
    do  (X@=<M0 -> M = M0 ; M = X)
    ).
        
    min_member(Minimum, [Head|Tail]) :-
    (   foreach(X,Tail),
        fromto(Head,M0,M,Minimum)
    do  (M0@=<X -> M = M0 ; M = X)
    ).

### max_member/3, min_member/3

    max_member(:P, ?Xmax, Xs).
    min_member(:P, ?Xmin, Xs).

True when Xmax is the maximum element of Xs; Xmin is the minimum element of Xs. Comparison with P.

    max_member(Pred, Maximum, [Head|Tail]) :-
    (   foreach(X,Tail),
        fromto(Head,M0,M,Maximum),
        param(Pred)
    do  (call(Pred,X,M0) -> M = M0 ; M = X)
    ).
        
    min_member(Pred, Minimum, [Head|Tail]) :-
    (   foreach(X,Tail),
        fromto(Head,M0,M,Minimum),
        param(Pred)
    do  (call(Pred,M0,X) -> M = M0 ; M = X)
    ).

### select_min/3, select_min/4, select_max/3, select_max/4

    select_min(?Element, +Set, ?Residue).
    select_min(:P, ?Element, +Set, ?Residue).
    select_max(?Element, +Set, ?Residue).
    select_max(:P, ?Element, +Set, ?Residue).

Should be pretty obvious what these do by now.

### increasing_prefix/3, increasing_prefix/4, decreasing_prefix/3, decreasing_prefix/4

    increasing_prefix(?Sequence, ?Prefix, ?Suffix).
    increasing_prefix(:P, ?Sequence, ?Prefix, ?Suffix).
    decreasing_prefix(?Sequence, ?Prefix, ?Suffix).
    decreasing_prefix(:P, ?Sequence, ?Prefix, ?Suffix).

Get the longest prefix which is a monotonous increasing or decreasing subsequence, according to @=< or P.

### clumps/2

    clumps(+Items, -Clumps).

Split Items into buckets containing equal elements. It holds that append(Clumps, Items) and all lists in Clumps have only one unique element.

### keyclumps/2

    keyclumps(+Pairs, ?Clumps).

Same as clumps/2, split Items -- which is a key-value pair list -- into buckets containing equal keys.

### clumped/2

    clumped(+Items, ?Counts).

Same as clumps/2, but extracts the length of the sublists instead of the sublists themselves.

### keyclumped/2

    keyclumped(+Pairs, ?Groups).

Same as keyclumps/2, but extracts K-[V1,...,Vn] instead of [K-V1,...,K-Vn].
