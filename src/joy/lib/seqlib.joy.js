module.exports = `
(* FILE:   seqlib.joy *)

"agglib" libload.

LIBRA

    _seqlib == true;

    putlist ==
        "[ " putchars
        [ null ]
        [ pop ]
        [ unswons
          put
          [ "\\n  " putchars put ] step ]
        ifte
        "]\\n" putchars;
    reverse == [[]] [""] iflist swap shunt;
    reverselist == [] swap shunt;
    reversestring == "" swap shunt;
    flatten == [null] [] [uncons] [concat] linrec;
    restlist == [null] [[] cons] [dup rest] [cons] linrec;
    product == 1 [*] fold;
(* this does short circuiting
    product ==
        1 swap
        [ null not ]
        [ [first null]
          [[pop 0] dip pop []]
          [uncons [*] dip]
          ifte ]
        while
        pop;
*)
    scalarproduct == [0] dip2
        [null2] [pop2] [uncons2 [* +] dip2] tailrec;
    frontlist1 == (* Thompson p 247 *)
        [null] [[] cons]
        [uncons]
        [ [cons] map popd [] swons ]
        linrec;
    frontlist == (* also works for sets and strings *)
        [null] [[] cons]
        [uncons]
        [ [cons] map popd dup first rest swons ]
        linrec;
    subseqlist == (* Thompson p 247 *)
        [null]
        [[] cons]
        [ uncons dup
          [frontlist [cons] map popd] dip ]
        [concat]
        linrec;
    powerlist1 ==
        [null] [[] cons] [uncons]
        [dup swapd [cons] map popd concat] linrec;
    powerlist2 ==
        [null] [[] cons] [uncons]
        [dup swapd [cons] map popd swoncat] linrec;
    insertlist ==        (*   Sequence  Item   ->   List(Sequence) *)
        swons
        [ small ]
        [ unitlist ]
        [ dup                           (* keep original *)
          unswons unconsd swons ]       (* take out second *)
        [ swap [swons] cons map         (* swons in second *)
          cons ]                        (* cons in original *)
        linrec;
    permlist ==
        [ small ]
        [ unitlist ]
        [ uncons ]
        [ swap [insertlist] cons map
          flatten ]
        linrec;
    qsort ==
        [small] [] [uncons [>] split] [swapd cons concat] binrec;
    qsort1-1 ==
        [small]
        []
        [uncons unswonsd [first >] split [swons] dip2]
        [swapd cons concat]
        binrec;
    qsort1 ==
        [small] [] [uncons [[first] unary2 >] split] [swapd cons concat] binrec;
    mk_qsort ==
        [ [small] [] ] dip
        [ unary2 >] cons [split] cons [uncons] swoncat
        [ swapd cons concat ]
        binrec;
    merge ==
        [ [ [null] [pop] ]
          [ [pop null] [popd] ]
          [ [unswons2 <] [unconsd] [cons] ]
          [ [unswons2 >] [uncons swapd] [cons] ]
          [ [uncons2] [cons cons] ] ]
        condlinrec;
    merge1 ==
        [ [ [null] [pop] ]
          [ [pop null] [popd] ]
          [ [unswons2 [first] unary2 <] [unconsd] [cons] ]
          [ [unswons2 [first] unary2 >] [uncons swapd] [cons] ]
          [ [uncons2] [cons cons] ] ]
        condlinrec;
    insert ==
        [pop null] [firstd >=] disjoin
        [ swons ]
        [ unconsd]
        [ cons ]
        linrec;
    insert-old ==
        [ [ [pop null] [swons] ]
          [ [firstd >= ] [swons] ]
          [ [unconsd] [cons] ] ]
        condlinrec;
    delete ==
        [ [ [pop null] [pop] ]
          [ [firstd >] [pop] ]
          [ [firstd =] [pop rest] ]
          [ [unconsd] [cons] ] ]
        condlinrec;
    transpose == (* READE p 133 *)
        [ [null] [true] [[null] some] ifte ]
        [ pop [] ]
        [ [[first] map] [[rest] map] cleave ]
        [ cons ]
        linrec;
    cartproduct == [[]] dip2 [pairlist swap [swons] dip] pairstep;
    orlist == [list] swap disjoin;
    orlistfilter == orlist [filter] cons;
    treeshunt == [swons] treestep;
    treeflatten == [] swap treeshunt reverse;
    treereverse == [] [reverse] [map] treegenrec;
    treestrip == [list] treefilter;
(*
    treemap == [map] treerec;
*)
    treemap == [] [map] treegenrec;
    treefilter == [] swap orlistfilter [map] treegenrec;
    treesample == [ [1 2 [3 4] 5 [[[6]]] 7 ] 8 ];

    SEQLIB == "seqlib.joy - sequence library, assumes agglib.joy\\n".
                                                        (* end LIBRA *)

"seqlib  is loaded\\n" putchars.

(* END   seqlib.joy *)
`.trim()
