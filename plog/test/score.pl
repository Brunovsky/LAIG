% score/2
test_scorepattern :-
    findall(X, score(X, _), ListPatterns),
    score_list(ListPatterns),
    (   foreach(Pattern, ListPatterns)
    do  reverse(Pattern, Reversed),
        score(Pattern, Value), score(Reversed, Value)
    ).

% evaluate(List, Value)
test_evaluate :-
    random_list(11, [c,c,w], Wpure),
    list_reversal(Wpure, WpureReversed),
    random_list(8, [c,c,b], Bpure),
    list_reversal(Bpure, BpureReversed),
    random_list(19, [c,c,w,b], Mixed),
    list_reversal(Mixed, MixedReversed),
    random_list(15, [c,c,c,w,w,b], BiasedW),
    list_reversal(BiasedW, BiasedWReversed),
    random_list(26, [c,c,c,b,b,w], BiasedB),
    list_reversal(BiasedB, BiasedBReversed),


    evaluate(Wpure, W1),
    evaluate([c|Wpure], W2), W2 >= W1,
    last(Wpure, c, Wpure1),
    evaluate(Wpure1, W3), W3 >= W1,

    evaluate(WpureReversed, W4), W4 is -W1,
    evaluate([c|WpureReversed], W5), W5 is -W2,
    last(WpureReversed, c, WpureReversed1),
    evaluate(WpureReversed1, W6), W6 is -W3,


    evaluate(Bpure, B1),
    evaluate([c|Bpure], B2), B1 >= B2,
    last(Bpure, c, Bpure1),
    evaluate(Bpure1, B3), B1 >= B3,

    evaluate(BpureReversed, B4), B4 is -B1,
    evaluate([c|BpureReversed], B5), B5 is -B2,
    last(BpureReversed, c, BpureReversed1),
    evaluate(BpureReversed1, B6), B6 is -B3,


    evaluate(Mixed, M1),
    evaluate(MixedReversed, M2), M2 is -M1,


    evaluate(BiasedW, BW1),
    evaluate(BiasedWReversed, BW2), BW2 is -BW1,


    evaluate(BiasedB, BB1),
    evaluate(BiasedBReversed, BB2), BB2 is -BB1.

%captures_score([Wc,Bc], Score)
test_captures_score :-
    \+ captures_score([3, 3], 0),
    captures_score([8, 8], 0),
    captures_score([6, 4], V1),
    captures_score([4, 6], V2), V2 is -V1.
    
    
test_score :- test_all(score, [
    test_scorepattern,
    test_evaluate,
    test_captures_score
]).