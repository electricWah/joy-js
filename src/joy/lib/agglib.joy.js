module.exports = `
(* FILE:   agglib.joy *)

LIBRA

    _agglib == true;

(* - - - - -  O P E R A T O R S  - - - - - *)

    unitset == {} cons;
    unitstring == "" cons;
    unitlist == [] cons;
    pairset == {} cons cons;
    pairstring == "" cons cons;
    pairlist == [] cons cons;
    unpair == uncons uncons pop;
    second == rest first;
    third == rest rest first;
    fourth == 3 drop first;
    fifth == 4 drop first;
    string2set == {} swap shunt;
    elements == {} swap [swons] step;
(*
    set2string == "" swap [chr swons] step;
*)
    set2string == "" [[chr] dip cons] foldr;
    shunt == [swons] step;

(* "dipped" versions *)

    nulld == [null] dip;
    consd == [cons] dip;
    swonsd == [swons] dip;
    unconsd == [uncons] dip;
    unswonsd == [unswons] dip;
    firstd == [first] dip;
    restd == [rest] dip;
    secondd == [secondd] dip;
    thirdd == [third] dip;

(* on two operands *)

    null2 == nulld null or;
    cons2 == swapd cons consd;
    uncons2 == unconsd uncons swapd;
    swons2 == swapd swons swonsd;
    unswons2 == [unswons] dip unswons swapd;

    zip == [null2] [pop2 []] [uncons2] [[pairlist] dip cons] linrec;

    from-to ==                (*  lo  hi  agg             *)
        [] cons  [pop pop] swoncat
        [>] swap
        [ [dup succ] dip ]
        [cons]
        linrec;
    from-to-list == [] from-to;
    from-to-set == {} from-to;
    from-to-string == "" from-to;

(* - - - - -  C O M B I N A T O R S  - - - - - *)

(*  Left to Right *)

    (* inbuilt:          step map fold filter split      *)
    (* desirable:        step2 map2 fold2                *)

    (* cartesian product -like *)
    pairstep == [dupd] swoncat [step pop] cons cons step;

(* Right to Left *)

    mapr ==
        [ [null] [] [uncons] ] dip               (* P1 P2 P3 *)
        [dip cons] cons                          (* P4 *)
        linrec;
    foldr ==
        [ [ [null] ] dip                         (* P1 *)
          [] cons [pop] swoncat                  (* P2 *)
          [uncons] ] dip                         (* P3 *)
        linrec;

    stepr2 ==
        [ [null2]  [pop pop] ] dip               (* P1 P2 *)
        [dip] cons [dip] cons [uncons2] swoncat  (* P3 *)
        tailrec;
    fold2 == rollupd stepr2;

    mapr2 ==        (* == zipwith  B&W p 57 *)
        [ [null2] [pop2 []] [uncons2] ] dip      (* P1 P2 P3 *)
        [dip cons] cons                          (* P4 *)
        linrec;
    foldr2 ==
        [ [ [null2] ] dip                        (* P1 *)
          [] cons [pop2] swoncat                 (* P2 *)
          [uncons2] ] dip                        (* P3 *)
        linrec;
    interleave2 == [cons cons] foldr2;
    interleave2list == [] interleave2;

    sum == 0 [+] fold;
    average == [sum] [size] cleave / ;
    variance ==                 (* [..] variance                *)
        0.0 swap dup            (* 0.0 [..] [..]                *)
        [sum] [size] cleave dup (* 0.0 [..] su n n              *)
        [ /                     (* 0.0 [..] av n                *)
          [ - dup * + ] cons    (* 0.0 [..] [av - dup * +] n    *)
          step ]                (* sumsq n                      *)
        dip
        pred / ;

    AGGLIB == "agglib.joy - aggregate library\\n".
                                                (* end LIBRA *)

"agglib  is loaded\\n" putchars.

(* END   agglib.joy *)
`.trim()
