
# Highlight Line Package

[![Version](https://img.shields.io/apm/v/highlight-line.svg?style=flat-square)](https://atom.io/packages/highlight-line)
[![Github Actions CI](https://img.shields.io/github/workflow/status/richrace/highlight-line/CI.svg?style=flat-square)](https://github.com/richrace/highlight-line/actions?query=workflow%3ACI)
[![Downloads](https://img.shields.io/apm/dm/highlight-line.svg?style=flat-square)](https://atom.io/packages/highlight-line)
[![Licence](https://img.shields.io/apm/l/highlight-line.svg?style=flat-square)](https://atom.io/packages/highlight-line)
[![David](https://img.shields.io/david/richrace/highlight-line.svg?style=flat-square)](https://david-dm.org/richrace/highlight-line)

Highlights the current line in the editor; really simple.

[![Image Showcase]][#]

You can now also underline the the current lines thanks to
[@sniperbat](https://github.com/sniperbat). This isn't enabled by default, and
you can edit the colour and type of line.

[![Image Underline]][#]

When selecting more than one line of text, you can enable selection borders at
the top and bottom of the selections. This isn't enabled by default.
Courtesy of [@djak250](https://github.com/djak250)

[![Image Selection]][#]

You can now toggle the highlighted line by: `cmd+alt+H`
You can now toggle the hiding the highlight on selecting text by: `cmd+shift+alt+H`

You can now toggle the underline by: `cmd+alt+U`
You can now toggle the selection borders by: `cmd+shift+alt+U`

I've moved this package to use the new decorations API and as such we can no
longer set arbitrary style on the lines. So, this means no more entering colours/
opacity in the settings.




<!----------------------------------------------------------------------------->

[#]: #

[Image Selection]: Resources/Screenshots/Selection.png
[Image Underline]: Resources/Screenshots/Underline.png
[Image Showcase]: Resources/Screenshots/Showcase.png
