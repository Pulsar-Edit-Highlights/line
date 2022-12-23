
# Change Log

*If not otherwise specified, commit are by **[@richrace]**.*

<br>

## 0.12.0

`2016 / 12 / 28`

-   Changed to support only `Atom 1.13` selectors.

<br>

## 0.11.2

`2016 / 12 / 28`

<br>

#### [@itiut]

-   Update selected line when consolidating selections.


<br>

## 0.11.1

`2016 / 02 / 02`

<br>

#### [@shemerey]

-   Fixed  <kbd>  Cmd  </kbd>  **+**  <kbd>  L  </kbd>  empty line selection.

<br>

## 0.11.0

`2015 / 04 / 18`

<br>

-   Removed `Space Pen View` dependency

-   No longer adds to the DOM.

<br>

## 0.10.2

`2015 / 04 / 17`

-   Fixed activating package. #66

<br>

## 0.10.1

`2015 / 03 / 01`

-   Fixed 1px border above the status bar. #62

<br>

## 0.10.0

`2015 / 02 / 28`

-   Fixed specs

<br>

#### [@skulled]

-   Fixed deprecations

<br>

## 0.9.3

`2015 / 01 / 14`

-   Added support for Shadow Dom

<br>

## 0.9.0

`2014 / 09 / 04`

-   Use new Event API

-   Use new config settings

<br>

## 0.8.1

`2014 / 08 / 31`

-   Don't hide underline when hide highlight enabled

<br>

## 0.8.0

`2014 / 08 / 24`

-   Total rewrite to use decorations

-   Use selection changed to handle multiple cursors

-   Make lines not exceed 80 columns

-   Ignore tmp folder

-   Add specs

-   Add Travis yml

<br>

## 0.7.6

`2014 / 07 / 22`

-   Don't iterate over every line when resetting

-   Prepared release

<br>

## 0.7.5

`2014 / 07 / 21`

-   Prepared release

<br>

#### [@kelp404]

-   Fixed the highlight style doesn't remove.

<br>

## 0.7.4

`2014 / 07 / 19`

-   Start moving logic into smaller methods

-   Only reset the top `.line`

-   Prepared release

<br>

## 0.7.3

`2014 / 07 / 19`

-   Override theme's highlight line
    
    Don't multilines disappearing

-   Prepared release

<br>

## 0.7.2

`2014 / 06 / 21`

-   Don't crash if the user hasn't selected underline style

-   Prepared release

<br>

## 0.7.1

`2014 / 05 / 29`

-   Use `lineNodeForScreenRow` for React Editor

-   Prepared release

<br>

## 0.7.0

`2014 / 05 / 24`

-   Fixes

-   Fix line height growing.

-   Add support for React Editor

-   Prepared release

<br>

#### [@djak250]

-   Added support for selection borders, in the form of lines above and below the selection. This extends the underline functionality somewhat, and only triggers on multi line selection. Can be toggle with shift-alt-cmd-h. If underline is disabled, this will not show up

-   Added hotkey to toggle hiding the highlight on select

-   updated readme

-   Added screenshot for multi line selection borders

<br>

## 0.6.0

`2014 / 04 / 03`

- Closes #12

- Update Readme

- Prepared release

<br>

#### [@djak250]

-   Added option to hide highlight on line when a chunk of text is selected. It will still show the underline which is a nice touch

<br>

## 0.5.5

`2014 / 03 / 28`

-   Rename update setting

-   Remove all enabled

-   Make sure line is deleted

-   Prepared release

<br>

#### [@philnash]

-   Handles opacity percentages better

<br>

## 0.5.4

`2014 / 03 / 21`

-   Add Hotkeys/Menu for enabling/disabling Background/underline

-   Closes #10

-   Prepared release

<br>

## 0.5.3

`2014 / 03 / 18`

-   Prepared release 

<br>

#### [@sniperbat]

-   Added background color enabler

-   Added back this plugin enable switch, fix syntax error

<br>

## 0.5.2

`2014 / 03 / 15`

-   Keep height consistent.

-   Prepared release

<br>

#### [@sniperbat]

-   Resolved the problem that the height of the line increase by one pixel when underline is enabled

<br>

## 0.5.1

`2014 / 03 / 15`

-   Improve destroying event

-   Prepared release

<br>

## 0.5.0

`2014 / 03 / 15`

-   Disable underline by default

-   Tidy up coffee

-   Updated README to include underline support

-   Prepared release

<br>

#### [@sniperbat]

-   Added underline support


<br>

## 0.4.1

`2014 / 03 / 13`

-   Fix error being thrown when moving tabs to different panes

-   Improve GC

-   Prepared release

<br>

## 0.4.0

`2014 / 03 / 12`

-   Attempt to improve performance and stability

-   Prepared release

<br>

## 0.3.2

`2014 / 03 / 09`

-   Change the triggering event.

-   Prepared release

<br>

## 0.3.1

`2014 / 03 / 09`

-   Only look for Cursors on `EditorViews`.

    Closes #4

-   Prepared release

<br>

## 0.3.0

`2014 / 03 / 09`

-   Add support for multiline highlights.

    Closes #3

-   Prepared release

<br>

## 0.2.1

`2014 / 03 / 06`

-   All opacity to be set at 100

-   Prepared release

<br>

## 0.2.0

`2014 / 03 / 05`

-   Add options to enable or disable the line, and to change the color of the line

-   Update Readme

-   Prepared release

<br>

## 0.1.0

`2014 / 02 / 28`

-   Initial Commit 

-   Stop it from crashing

-   Updated Read Me

-   Removed double brackets

-   Prepared release

<br>


<!----------------------------------------------------------------------------->

[@sniperbat]: https://github.com/sniperbat
[@philnash]: https://github.com/philnash
[@shemerey]: https://github.com/shemerey
[@richrace]: https://github.com/richrace
[@djak250]: https://github.com/djak250
[@kelp404]: https://github.com/kelp404
[@skulled]: https://github.com/skulled
[@itiut]: https://github.com/itiut
