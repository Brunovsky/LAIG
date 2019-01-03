# SICSTUS library(trees) Predicates

Updatable binary trees with logarithmic access time.

### gen_label/3

    gen_label(?I, +Tree, ?Value).

Like nth1/3 but for binary trees. Tree is a proper binary tree, and Value is
the Ith element in Tree.

### get_label/3

    get_label(+, +Tree, -Label).

Treats Tree as an array of N elements and returns the Ith element. If I < 1
or > N it fails. As Tree does not need to be fully instantiated, and is potentially unbounded, we cannot enumerate Indices.

### list_to_tree/2

    list_to_tree(+List, -Tree).

Takens a proper List of N elements and constructs a binary Tree where

    get_label(K, Tree, Elem)  <=>  nth1(K, List, Elem).

All the trees created by this predicate have the same size and the same shape.

### map_tree/3

    map_tree(:P, ?Xtree, ?Ytree).

True when OldTree and NewTree are binary trees of the same shape and P(X, Y)
holds for each corresponding X in Xtree and Y in Ytree.

### put_label/4

    put_label(+I, +OldTree, +Elem, -NewTree).

NewTree is a tree equal to OldTree expect the Ith element is Elem.

### put_label/5

    put_label(+I, +OldTree, ?OldLabel, -NewTree, +NewLabel).

True when OldTree and NewTree are equal trees expect that the Ith element of
OldTree is OldLabel and that of NewTree is NewLabel.

### tree_size/2

    tree_size(+Tree, ?Size).

Tree is a tree with Size elements.

### tree_to_list/2

    tree_to_list(+Tree, -List).

Maps a tree to a list. Mapping operations can be performed by transforming
the tree into a list, mapping, and converting back