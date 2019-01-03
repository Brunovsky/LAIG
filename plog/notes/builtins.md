# Builtin SICSTUS Prolog Predicates

[Documentation SICSTUS 4.4.1](https://sicstus.sics.se/sicstus/docs/latest4/pdf/sicstus.pdf)

### abolish/[1,2]

    abolish(+Predicates).
    abolish(+Predicates, +Options).

Removes procedures from the Prolog database.
Predicates is a predicate or a list of predicates.

### abort/0

    abort.

Abandons the current execution and returns to the beginning of the current break level, or terminates the enclosing query.

### acyclic_term/1

    acyclic_term(+Term).

Term is currently instantiated to a finite and acyclic term.

### append/3

    append(?List1, ?List2, ?List3).

Appends list List1 and List2, forming List3. Three-way predicate.

### arg/3

    arg(+ArgNum, +Term, -Arg).

Unifies Arg with the ArgNum argument of term Term.
ArgNum  integer, nonvar and non-negative.
Term    compound, nonvar.
Arg     term.

### assert/[1,2]

    assert(+Clause).

Adds the dynamic clause Clause to the Prolog database.
Undefined whether Clause will precede or follow clauses already in the database.

### asserta/[1,2]

    asserta(+Clause).

Adds the dynamic clause Clause to the Prolog database, before any other clause.

### assertz/[1,2]

    assertz(+Clause).

Adds the dynamic clause Clause to the Prolog database, after any other clause.

### atom/1

    atom(+Term).

Succeeds if Term is an atom.

### atom_chars/2

    atom_chars(+Atom, -Chars).
    atom_chars(-Atom, +Chars).

Chars is a list of chars comprising the printed representation of Atom.
Either must be instantiated.

### atom_codes/2

    atom_codes(+Atom, -Codes).
    atom_codes(-Atom, +Codes).

Codes is a list of codes comprising the printed representation of Atom.
Either must be instantiated.

### atom_concat/3

    atom_concat(+Atom1, +Atom2, -Atom12).
    atom_concat(-Atom1, -Atom2, +Atom12).

Like append/3, but for atoms.

### atom_length/2

    atom_length(+Atom, -Length).

Like length/2, but for atoms.

### atomic/1

    atomic(+Term) :- atom(+Term); integer(+Term).

Succeeds if Term is an atom or integer.

### bagof/3

    bagof(+Template, +Generator, -Set).

See also findall/3 and setof/3.
Like setof/3 except that the list or alternative lists returned
will not be ordered and may contain duplicates.

### block/1

    :- block +BlockSpec

:BlockSpec
    callable, ground.
    Goal template or list of goal templates, of the form
    f(Arg1, Arg2, ...)
    where ArgN is one of:
    -   part of a block condition
    ?   otherwise

When a goal for a block declared predicate is to be executed, the block specs are interpreted as conditions for blocking the goal, and if at least one condition evaluates to true, then the goal is blocked.
A block condition evaluates to true iff all arguments specified as - are uninstantiated, in which case the goal is blocked until at least one of those variables is instantiated. If several conditions evaluate to true, the implementation picks one of them.

### break/0

    break.

Causes the current execution to be interrupted; enters next break level.

### call/[1,2,...,255]

    call(+P).
    call(+P,?Q,...).

Executes goal P, optionally obtained by augmenting P with remaining arguments.

### callable/1

    callable(+Term) :- atom(Term); compound(Term).

Succeeds if Term is instantiated to an atom or compound term.

### char_code/2

    char_code(+Char, -Code).
    char_code(-Char, +Code).

Code is the character code comprising the printed representation of Char.

### close/[1,2]

    close(+Stream).
    close(+Stream, +Options).

Closes the stream Stream.

### compare/3

    compare(-Order, +Term1, +Term2).

    Succeeds if the result of comparing terms Term1 and Term2 is Order:
        =    if Term1 is identical to Term2.
        <    if Term1 is before Term2 in the standard order.
        >    if Term1 is after Term2 in the standard order.

### compile/1

    compile(+Files) :- load_files(Files, [load_type(source),compilation_mode(compile)]).

Compiles the specified Prolog source files into memory.

### compound/1

    compound(+Term).

Term is instantiated to a compound term.

### consult/1, reconsult/1

    consult(+Files) :- load_files(Files, [load_type(source),compilation_mode(consult)]).
    reconsult(+Files).

Consults the specified Prolog source files into memory.
There is no difference between consult/1 and reconsult/1.

### copy_term/[2,3]

    copy_term(+Term, -Copy).

Unifies Copy with a copy of Term in which all variables have been replaced by brand new ones,
and all mutables by brand new mutables.

### current_input/1

    current_input(-Stream).

Gets the current input stream.

### current_output/1

    current_output(-Stream).

Gets the current output stream.

### !/0

    !

Cut. When first encountered as a goal, cut suceeds immediately. If backtracking should later
return to the cut, then the parent goal will fail (the parent goal is the one that matched the head of the clause containing the cut). In particular this means other possible unifications of the parent goal will not be carried out.

### debug/0, trace/0, zip/0

    debug.
    trace.
    zip.

Turns on the debugger in debug mode.

### debugging/0

    Prints out the current debugging state.

### dif/2

    dif(+X, +Y).

Constrains X and Y to represent different terms, i.e. to be non-unifiable.
Calls to dif/2 either succeed, fail, or are blocked depending on whether X and Y are sufficiently instantiated.

### do/2

    (+Iterator do +Body)

+Iterator  iterator, must be nonvar.
:Body      callable, must be nonvar.

This contorl structure reduces the need to write auxiliary predicates performing simple iterations. It iterates Body until Iterator's termination condition is true.

Possible Iterators:

    fromto(First, In, Out, Last)

In the first iteration, In is First. In the second iteration, In is the value that Out
has at the end of the first iteration.
In and Out are local variables in Body.
The termination condition is Out = Last.

    foreach(X, List)

Iterate Body with X ranging over all elements of List. Can also be used for constructing a list.
X is a local variable in Body.
The termination condition is Tail = [], where Tail is the suffix of List that follows the elements that have been iterated over.

    foreacharg(X, Struct)
    foreacharg(X, Struct, I)

Iterate Body with X ranging over all arguments of Struct and I ranging over the argument number, 1-based. Cannot be used for constructing a term.
X and I are local variables in Body.
So the termination condition is true iff all arguments have been iterated over.

    count(I, MinExpr, Max)

This is normally used for counting the number of iterations. Let Min take the value
integer(MinExpr). Iterate Body with I ranging over integer from Min.
I is a local variable in Body.
The termination condition is I = Max, so Max can be a variable.

    for(I, MinExpr, MaxExpr)

A standard for loop. Let Min take the value integer(MinExpr), let Max take the value integer(MaxExpr), and let Past take the value max(Min, Max+1). Iterate Body with I ranging over integer from Min to max(Min,Max) inclusive.
I is a local variable in Body.
The termination condition is I = Past.

    param(X)

For declaring variables in Body global, i.e. shared with the context. X can be a single variable, or a list of them.
The termination condition is true.
The variables in Body have local scope.

    iterator,iterator,...

The iterators are iterator synchronously, that is, they all take their first value for
the first execution of Body, their second value for the second execution, etc. The order in which they are written does not matter, and the set of local variables in Body is the union of those of the iterators.
The termination condition is the conjunction of those of the iterators.

### ^/2

    +X ^ +P

Equivalent to "there exists an X such that P is true", thus X is normally an unbound variable.
The use of this operator outside setof/3 or bagof/3 is superfluous, and equivalent to simply
calling P.

### fail/0, false/0

    fail.
    false.

Fail immediately. Anything in a body past fail is unreachable.

### findall/[3,4]

    findall(+Template, +Generator, -List).
    findall(+Template, +Generator, -List, +Remainder).

See also bagof/3 and setof/3.

List is the list of all the instances of Template for which the goal Generator succeeds,
appended to Remainder. Remainder defaults to the empty list.

A special case of bagof/3, where all free variables in the generator are taken to be existentially qualified, as if by ^ operator. Contrary to bagof/3 and setof/3, if there are no instances of Template such that Generator succeeds, then List = Remainder.

##### Examples

    | ?- [user].
    | foo(1,2).
    | foo(1,2).
    | foo(2,3).
    |
    % user compiled in module user, 0.100 sec 352 bytes
    yes
    | ?- bagof(X, foo(X,Y), L).
    Y = 2,
    L = [1,1] ? ;
    Y = 3,
    L = [2] ? ;
    no
    | ?- bagof(X, Y^foo(X,Y), L).
    L = [1,1,2] ? ;
    no
    | ?- findall(X, foo(X,Y), L).
    L = [1,1,2] ? ;
    no
    | ?- findall(X, foo(X,Y), L, S).
    L = [1,1,2|S] ? ;
    no
    | ?- setof(X, foo(X,Y), L).
    X = _3342,
    Y = 2,
    L = [1] ;
    X = _3342,
    Y = 3,
    L = [2] ;
    no

### float/1

    float(+Term).

Term is instantiated to a float.

### flush_output/1

    flush_output.
    flush_output(+Stream).

Forces the buffered output of Stream to be flushed.

### format/[2,3]

    format(+Control, +Args).
    format(+Stream, +Control, +Args).

Interprets the Args according to the Control string and prints the result on Stream,
in similar fashion to printf in C but with different matchers.

    ~a

Print atom without quoting.

    ~Ne,~NE

Print float in exponential notation.

    ~Nf, ~NF

Print float in fixed-point notation.

    ~Ng,~NG

Print float in generic notation.

    ~Nh, ~NH

Print float precisely.

    ~Nd, ~ND

Print decimal. The second separates with ',' groups of three digs left of the decimal point.

    ~Ns

Print a code-list.

    ~i

Ignore the argument.

    ~p

Print the argument using print/1.

    ~w

Print the argument using write/1.

    ~Nn

Print N newlines.

### functor/3

    functor(+Term, -Name, -Arity).
    functor(-Term, +Name, +Arity).

Succeeds if the principal functor of term Term has name Name and arity Arity.

### garbage_collect/0

    garbage_collect.
    garbage_collect_atoms.

Invokes the garbage collector.

### get_byte/[1,2]
    
    get_byte(-Byte).
    get_byte(+Stream, -Byte).

Unifies Byte with the next byte from Stream or with -1 if there are no more bytes.

### get_char/[1,2]

    get_char(-Char).
    get_char(+Stream, -Char).

Unifies Char with the next char from Stream or with end_of_file if there are no more characters.

### get_code/[1,2]

    get_code(-Code).
    get_code(+Stream, -Code).

Unifies Code with the next code from Stream or with -1 if there are no more characters.

### ground/1

    ground(+Term).

Term is currently fully instantiated, i.e. is a ground term.

### halt/[0,1]

    halt.
    halt(+ExitCode).

Causes the process to exit.

### if/3

    if(+P, +Q, +R).

If P then Q else R, for all solutions of P.
All P, Q, R must be callable.

Note that P -> Q ; R explores only one solution for P, while if(P, Q, R) explores all solutions. The first should be preferred if it is known that only one solution exists or is of interest.

Cuts in P do not make sense, but are allowed, their scope being the goal P. The scope of cuts in Q and R is the containing clause.

This is part of the syntax of the language, but you can call call(if(P,Q,R)).

### ->/2

    +P -> +Q

When occurring other than as the first argument of a disjunction operator, this is equivalent to P -> Q ; fail.

This is part of the syntax of the language, but you can call call((P -> Q)).

Operator precedence of -> is greater than 1000, so it dominates commas.

Essentially, -> cuts away any choice points in the execution of P.

Cuts in P do not make sense, but are allowed, their scope being the goal P. The scope of cuts in Q is the containing clause.

### include/1

    :- include +Files

Literally embed the Prolog causes and directives in Files into the file being loaded, as if by #include in C.

### initialization/1

    :- initialization +Goal

Declares that :Goal is to be run when the file in which the declaration appears is loaded into a running system, or when a standalone program or runtime system that contains the file is started up.

### integer/1

    integer(+Term).

Term is instantiated to an integer.

### is/2

    -Term is +Expression.

Evaluates Expression as an arithmetic expression, and unifies the resulting number with Term.

Expression
    Must be ground, or an expression made up of:
        functors representing arithmetic operations
        numbers
        variables bound to numbers or arithmetic expressions
Term
    A number

### keysort/2

    keysort(+Pairs, -Sorted).

Sorts the elements of the list Pairs into ascending standard order with respect to the key
of the pair structure. A Pair is a term of the form Key-Value. Multiple occurrences of the same key are not removed. The sort is stable and O(N log(N)).

### leash/1

    leash(+Mode).

Starts leashing on the ports given by Mode.

Mode is one of:
    call
    exit
    redo
    fail
    exception
    all      all five ports
    half     exception, call, redo
    loose    exception, call
    tight    exception, call, redo, fail
    off

### length/2

    length(?List, ?Integer).

Integer is the length of List. If List is instantiated to a proper list of term, or Integer to an integer, then the predicate is determinate.

If List is a list of indefinite length, and if Integer is bound to an integer, then List is made to be a list of length Integer with unique variables used to pad the list.

### listing/[0,1]

    listing.
    listing(+Predicate).

Prints the clauses of all the interpreted procedures currently in the type-in module of the Prolog database.

### load_files/[1,2]

    load_files(+Files).
    load_files(+Files, +Options).

Loads the specified Prolog source and or object files into memory. Subsumes all other load predicates.

Options:
    if(X)  true or changed
    when(X)  always or compile_time
    load_type(X)  source or object
    compilation_mode(X)  compile or consult or assert_all
    ...

### member/2

    member(?Element, ?List).

Is true if Element occurs in the List. It may be used to test for an element or to enumerate all the element by backtracking. Indeed, it may be used to generate the List.
Provides for each element as many choice points as the number of occurrences of the element in the list, so:

    X = 3, member(X, [2,3,1,3]).

provides two choice points.

### memberchk/2

    memberchk(?Element, ?List) :- member(Element, List), !.

Same as member/2, but provides only one choice point.

### multifile/1

    :- multifile +PredSpecs

Declares the clauses of the predicates defined by PredSpecs to be multifile in the source file, suppressing compile-time warnings.

### mutable/1

    mutable(+Term).

Term is instantiated to a mutable term.

### name/2

    name(+Constant, -Codes).
    name(-Constant, +Codes).

Codes is the list consisting of the codes comprising the printed representation of Constant.

### nl/[0,1]

    nl.
    nl(+Stream).

Terminates current output record (essentially prints a newline).

### nodebug/0, notrace/0, nozip/0

    nodebug.
    notrace.
    nozip.

Turns the debugger off.

### nonmember/2

    nonmember(?Element, ?List).

Is true if the given Element does not occur in the given List. Its purpose is to test of membership. Usually the two arguments are ground. Provides only one choice point for Element.

### nonvar/1

    nonvar(+Term).

Term is currently instantiated.

### spy/[1,2], nospy/1, nospyall/1

    spy +PredSpecs.
    spy(+PredSpecs, +Conditions).
    nospy +PredSpecs.
    nospyall.

Add and remove spy points from predicates.

### =:=/2, =\=/2, =</2, >=/2

    +Expr1 =:= +Expr2
    +Expr1 =\= +Expr2.
    +Expr1 =< +Expr2.
    +Expr1 >= +Expr2.

### \+/1

    \+ +P.
    call(P) -> fail ; true.

Fails if the goal P has a solution, succeeds otherwise.

Part of the syntax of the language, but you can call call((\+ P)).

### \=/2

    +Term1 \= +Term2

Term1 and Term2 do not unify. Equivalent to \+ Term1 = Term2.

### number/1

    number(+Term) :- integer(Term); float(Term).

Term is instantiated to a number.

### number_chars/2

    number_chars(+Number, -Chars).
    number_chars(-Number, +Chars):

Chars in the chars comprising the printed representation of Number.

### number_codes/2

    number_codes(+Number, -Codes)
    number_codes(-Number, +Codes).

Codes is the codes comprising the printed representation of Number.

### once/1

    once(+P).
    call(P) -> true ; fail.

Cuts in P do not make sense.

### op/3

    op(+Precedence, +Type, +Name).

Declares Name to be an operator of the stated Type and Precedence.

Precedence    integer, nonvar between 1 and 1200.
Type          one of [xfx, xfy, yfx, fx, fy, xf, yf], must be nonvar
Name          atom or list of atom, must be ground.

### open/[3,4]

    open(+FileSpec, +Mode, -Stream).
    open(+FileSpec, +Mode, -Stream, +Options).

Creates a Prolog stream by opening the file FileSpec in mode Mode with options Options.

Mode is one of read, write, append.

### ;/2

    +P; +Q.

Disjunction: Succeeds if P succeeds or Q succeeds.

    +P -> +Q; +R.

If P then Q else R, using first solution of P only. See also if/3.

The operator precedences of ';' and '->' are both greater than 1000, so they dominate commas.

### otherwise/0, true/0.

Always succeed. Useful for laying out conditionals.

### peek_byte/[1,2]

    peek_byte(-Byte).
    peek_byte(+Stream, -Byte).

Looks ahead for the next byte in the input stream.

### peek_char/[1,2]

    peek_char(-Char).
    peek_char(+Stream, -Char).

Looks ahead for the next char in the input stream.

### peek_code/[1,2]

    peek_code(-Code).
    peek_code(+Stream, -Code).

Looks ahead for the next code in the input stream.

### prompt/2

    prompt(-OldPrompt, +NewPrompt).

Queries of changes the prompt string of the current input stream, indicating that a read or get as been called and the engine is waiting for user input.

To get the current prompt, OldPrompt and NewPrompt should be the same unbound variable.

To set the current prompt, NewPrompt should be an instantiated atom, and OldPrompt an unbound variable.

### put_byte/[1,2]

    put_byte(+Byte).
    put_byte(+Stream, +Byte).

The byte is written to the output stream.

### put_char/[1,2]

    put_char(+Char).
    put_char(+Stream, +Char).

The char is written to the output stream.

### put_code/[1,2]

    put_code(+Code).
    put_code(+Stream, +Code).

The code is written to the output stream.

### raise_exception/1, throw/1

    raise_exception(+Exception).
    throw(+Exception).

### read/[1,2]

    read(-Term) :- read_term(Term, []).
    read(+Stream, -Term) :- read_term(Stream, Term, []).

Reads the next term from Stream and unifies it with Term.

### read_line/[1,2]

    read_line(-Line).
    read_line(+Stream, -Line).

Reads one line of input from Stream, and unifies the codes with Line.
On end of file, Line is unified with end_of_file.

### read_term/[2,3]

    read_term(-Term, +Options).
    read_term(+Stream, -Term, +Options).

Read a term from Stream, optionally returning extra information about the term.

### repeat/0

    repeat.

Succeeds immediately when called and whenever reentered by backtracking.
Generally used to simulate the looping constructs found in traditional procedural languages.
The canonical repeat loop looks like the following:

    Head :-
            ...
            save_state(OldState),
            repeat,
              generate(Data),
              action(Data),
              test(Data),
            !,
            restore_state(OldState),
            ...

A repeat must at some point be followed by a cut or an exception, otherwise Head will never fail and backtracking will repeat indefinitely.

### store/1, restore/1

    store(+FileSpec).
    restore(+FileSpec).

Store and restore saved states.

### save_files/2, save_predicates/2

    save_files(+SourceFiles, +File).
    save_predicates(+PredSpecs, +File).

Any code loaded from SourceFiles, as well as from any file included by them, is saved into File in PO format.

Saves all predicates PredSpecs into File in PO format.

### see/1, set_input/1

    see(+FileOrStream).
    set_input(+Stream).

Sets the current input stream.

### seeing/1

    seeing(-FileOrStream).

Gets the current input stream.

### seek/4

    seek(+Stream, +Offset, +Method, -NewLocation).

### seen/0

    seen.

Closes the current input stream.

### setof/3

    setof(+Template, +Generator, -Set).

See also bagof/3 and findall/3.

Returns the nonempty set Set of all instances of Template such that Generator is provable.
This can succeed nondeterminately, generating alternative values for Set corresponding to different instantiations of the free varaibles of Generator.

### simple/1

    simple(+Term) :- \+ compound(Term).

Term is not instantiated to a compound term.

### skip_byte/[1,2]

    skip_byte(+Byte).
    skip_byte(+Stream, +Byte).

Read up to and including the first occurrence of byte on the input stream.

### skip_char/[1,2]

    skip_char(+Char).
    skip_char(+Stream, +Char).

Read up to and including the first occurrence of char on the input stream.

### skip_code/[1,2]

    skip_code(+Code).
    skip_code(+Stream, +Code).

Read up to and including the first occurrence of code on the input stream.

### skip_line/[0,1]

    skip_line.
    skip_line(+Stream).

Skips the remaining input characters on the current line on Stream.

### sort/2

    sort(+List, -Sorted).

Sorts the elements of List into ascending standard order, and removes any multiple occurrences of an element. The resulting sorted list is unified with the list Sorted.

### tell/1, set_output/1

    tell(+FileOrStream).
    set_output(+Stream).

Sets the current output stream.

### telling/1

    telling(-FileOrStream).

Gets the current output stream.

### told/0.

    told.

Closes the current output stream.

### statistics/[0,2]
    
    statistics.
    statistics(?Keyword, ?List).

Displays statistics relating to memory usage and execution time.

### subsumes_term/2

    subsumes_term(+General, +Specific).

True when Specific is an instance of General. Does not bind any variables.

### ==/2

    +Term1 == +Term2

Succeeds if Term1 and Term2 are identical terms, without forcing unification.

### \==/2

    +Term1 \== +Term2

Success if Term1 and Term2 are not identical terms, without forcing unification.

### @>/2, @</2

    +Term1 @> +Term2
    +Term1 @< +Term2
    +Term1 @>= +Term2
    +Term1 @=< +Term2

Compares terms in the standard order.

### ?=/2

    ?=(+Term1, +Term2).

Succeeds if Term1 and Term2 are identical terms, or if they are synctactically non-unifiable.

### term_variables/2

    term_variables(+Term, -Variables).

Gets a list of variables occurring in Term, without duplicates, in first occurrence order.

### =/2
    
    +Term1 = +Term2.

Unification.

### unify_with_occurs_check/2

    unify_with_occurs_check(+Term1, +Term2).

Unify Term1 and Term2 to a finite acyclic term.

### =../2

    +Term =.. -List
    -Term =.. +List

Unifies List with a list whose head is the atomic term corresponding to the principal functor of Term and whose tail is a list of the arguments of Term.

### var/1

    var(+Term).

Term is instantiated.

### when/2

    when(+Condition, +Goal).

Blocks Goal until Condition is true.

Condition is one of
    
    nonvar(X)
    ground(X)
    ?=(X,Y)
    Condition,Condition
    Condition;Condition

### write/[1,2]

    write(+Stream, +Term).
    write(+Term) :- write_term(+Term, [numbervars(true)]).

Writes Term on the standard output stream, without quoting atoms.

### write_canonical/[1,2]

    write_canonical(+Stream, +Term).
    write_canonical(+Term) :- write_term(Term, [quoted(true), ignore_ops(true), quoted_charset(portable)]).

Writes Term to standard output stream, quoting atoms, in functional notation, and without treating '$VAR'/1 terms specially.

### write_term/[2,3]

    write_term(+Term, +Options).
    write_term(+Stream, +Term, +Options).

### writeq/[1,2]

    writeq(+Stream, +Term).
    writeq(+Term).

Writes Term on the standard output stream, quoting atoms.
