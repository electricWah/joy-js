module.exports = `
(* FILE:   inilib.joy *)

LIBRA

    _inilib == true;


(* - - - - -  I N P U T   O U T P U T  - - - - *)

    newline == '\\n putch;
    putln == put newline;
    space == '\\032 putch;
    bell == '\\007 putch;
(* this is now a primitive in raw Joy:
    putchars == [putch] step;
*)
    putstrings == [putchars] step;

    ask == "Please " putchars putchars newline get;

(* - - - - -   O P E R A T O R S   - - - - - *)

    dup2 ==  dupd dup swapd;
    pop2 == pop pop;
    newstack == [] unstack;
    truth == true;
    falsity == false;
    to-upper == ['a >=] [32 -] [] ifte;
    to-lower == ['a < ] [32 +] [] ifte;
    boolean == [logical] [set] sequor;
    numerical == [integer] [float] sequor;
    swoncat == swap concat;

(* date and time *)

    weekdays ==
        [ "Monday" "Tuesday" "Wednesday" "Thursday" "Friday"
              "Saturday" "Sunday" ];
    months ==
        [ "JAN" "FEB" "MAR" "APR" "MAY" "JUN"
          "JUL" "AUG" "SEP" "OCT" "NOV" "DEC" ];
    localtime-strings ==
        time localtime
        [ [ 0 at 'd 4 4 format              ]
          [ 1 at pred months of             ]
          [ 2 at 'd 2 2 format              ]
          [ 3 at 'd 2 2 format              ]
          [ 4 at 'd 2 2 format              ]
          [ 5 at 'd 2 2 format              ]
          [ 6 at [] ["true"] ["false"] ifte ]
          [ 7 at 'd 5 5 format              ]
          [ 8 at pred weekdays of           ] ]
        [i] map
        popd;
    today ==
        localtime-strings
        [ [8 at] [" "] [2 at] ["-"] [1 at] ["-"] [0 at rest rest] ]
        [i] map
        popd
        "" [concat] fold;
    now ==
        localtime-strings
        3 drop
        [ [0 at] [":"] [1 at] [":"] [2 at] ]
        [i] map
        popd
        "" [concat] fold;
    show-todaynow ==
        today putchars space now putchars newline;

(* program operators *)

    conjoin == [[false] ifte] cons cons;
    disjoin == [ifte] cons [true] swons cons;
    negate == [[false] [true] ifte] cons;

(* - - - - -  C O M B I N A T O R S  - - - - - *)

    sequor == [pop true] swap ifte;
    sequand == [pop false] ifte;
    dipd == [dip] cons dip;
    dip2 == [dip] cons dip;
    dip3 == [dip2] cons dip;
    call == [] cons i;
    i2 == [dip] dip i;
    nullary2 == [nullary] cons dup i2 swapd;
(* this is now a primitive in raw Joy:
    unary2 == [unary  ] cons dup i2;
*)
    repeat == dupd swap [i] dip2 while;
    forever == maxint swap times;

(* library inclusion *)

    verbose == false;
    libload ==
        [ '_ swons intern body null ]
        [ ".joy" concat include ]
        [ [ verbose ]
          [ putchars "  is already loaded\\n" putchars ]
          [ pop ]
          ifte ]
        ifte;
    basic-libload ==
        "agglib" libload
        "seqlib" libload
        "numlib" libload;
    special-libload ==
        "mtrlib" libload
        "tutlib" libload
        "lazlib" libload
        "lsplib" libload
        "symlib" libload;

    all-libload == basic-libload special-libload;

    INILIB == "inilib.joy - the initial library, assumed everywhere\\n".
                            (* end LIBRA *)

"inilib  is loaded\\n" putchars.

(* END   inilib.joy *)
`.trim()
