main()

func main()

Global $stop = 0
Global $exit = 0

Global $dig1 = 0
Global $dig2 = 0
Global $dig3 = 0
Global $dig4 = 0

HotKeySet("{F3}", "Stop")
HotKeySet("{F4}", "ExitProg")
HotKeySet("{F5}", "Start")
HotKeySet("{F6}", "Pause")

While $exit <= 0
   Sleep(100)
WEnd

EndFunc

func Start()
   $stop = 0
   Local $coord1 = 1444
   Local $coord2 = 719

   Do
	  Do
		 Do
			Do

			   Send("{E}")
			   Sleep(Random(1000, 2000, 1))
			   Send ($dig1 & $dig2 & $dig3 & $dig4)
			   Sleep(Random(1000, 2000, 1))
			   MouseClick("left", $coord1, $coord2, 1)
			   Sleep(Random(1000, 2000, 1))
			   if $stop = 1 Then ExitLoop

			   $dig4 = $dig4 + 1

			Until $dig4 > 9

			if $stop = 1 Then ExitLoop
			$dig4 = 0
			$dig3 = $dig3 + 1

		 Until $dig3 > 9

		 if $stop = 1 Then ExitLoop
		 $dig3 = 0
		 $dig2 = $dig2 + 1

	  Until $dig2 > 9

	  if $stop = 1 Then ExitLoop
	  $dig2 = 0
	  $dig1 = $dig1 + 1
	  Until $dig1 > 9

EndFunc

Func Pause()
   $stop = 1
Endfunc

Func Stop()
  $stop = 1
  $dig1 = 0
  $dig2 = 0
  $dig3 = 0
  $dig4 = 0
Endfunc

Func ExitProg()
  $exit = 1
Endfunc