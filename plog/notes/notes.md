### Execute goal immediately:

:- Goal.

## Control Predicates

http://www.swi-prolog.org/pldoc/man?section=control


#### fail/0, false/0

Fail immediately. Anything in a clause past fail is unreachable.


#### true/0

Succeed immediately. Anything in a clause past true is unreachable.


#### repeat/0

Always succeed, providing an infinite number of choice points.


### !/0

Cut. Discard all choice points created since entering the predicate in
which the cut appears (commit to it).

    H :- A, B, C, D.
    G :- A, B, !, C, D.

Suppose A and B succeed.
If C fails, H backtracks to B and reevaluates choice points. If choice
points exist, choose another; if they don't exist, backtrack further to A.
On the other hand, G backtracks to ! and just fails.
If D fails, both H and G backtrack to C and reevaluate choice points in C.

### If then: ->

    :Condition -> :Action

    If -> Then; Else :- If, !, 