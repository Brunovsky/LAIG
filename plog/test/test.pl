% Utils
print_test(Test) :-
    catch(Test, A, true),
    (var(A) -> format('[OK] ~w~n', Test);
               format('[EXCEPTION] ~w~n', Test),
               print_message(error, A)
    ), !;
    format('[FAIL] ~w~n', Test), !.

test_all(Name, Tests) :-
    format('=======[TESTS]======= ~s', Name),
    nl,
    foreach(print_test, Tests),
    nl.

% Everything in test/
:- compile('lists.pl').
:- compile('matrix.pl').
:- compile('board.pl').
:- compile('score.pl').
:- compile('tree.pl').
:- compile('value.pl').

test :-
    test_lists,
    test_matrix,
    test_board,
    test_score,
    test_tree,
    test_value.
    