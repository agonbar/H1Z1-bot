main()

func main()

Global $stop = 0
Global $exit = 0

HotKeySet("{F4}", "ExitProg")
HotKeySet("{F5}", "Start")
HotKeySet("{F6}", "Stop")

While $exit <= 0
   Sleep(100)
WEnd

EndFunc

func Start()
   $stop = 0
   Local $coord1 = 1444
   Local $coord2 = 719

   For $dig1 = 0 To 9 Step +1
	  For $dig2 = 0 To 9 Step +1
		 For $dig3 = 0 To 9 Step +1
			 For $dig4 = 0 To 9 Step +1

			   Send("{E}")
			   Sleep(Random(1000, 2000, 1))
			   Send ($dig1 & $dig2 & $dig3 & $dig4)
			   Sleep(Random(1000, 2000, 1))
			   MouseClick("left", $coord1, $coord2, 1)
			   Sleep(Random(1000, 2000, 1))
			   if $stop = 1 Then ExitLoop

			Next
			if $stop = 1 Then ExitLoop
		 Next
		 if $stop = 1 Then ExitLoop
	  Next
	  if $stop = 1 Then ExitLoop
   Next
EndFunc

Func Stop()
  $stop = 1
Endfunc

Func ExitProg()
  $exit = 1
Endfunc