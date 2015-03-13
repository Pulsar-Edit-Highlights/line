[![Build Status](https://travis-ci.org/richrace/highlight-line.svg?branch=master)](https://travis-ci.org/richrace/highlight-line)

# Highlight Line Package

Highlights the current line in the editor; really simple.

![screenshot](http://i.imgur.com/fa32Wtr.png)

You can now also underline the the current lines thanks to
[@sniperbat](https://github.com/sniperbat). This isn't enabled by default, and
you can edit the colour and type of line.

![screenshot](http://i.imgur.com/lIYBxQX.png)


When selecting more than one line of text, you can enable selection borders at
the top and bottom of the selections. This isn't enabled by default.
Courtesy of [@djak250](https://github.com/djak250)

![screenshot](http://i.imgur.com/G1b8eAJ.png)

You can now toggle the highlighted line by:  ```cmd+alt+H```
You can now toggle the hiding the highlight on selecting text by:  ```cmd+shift+alt+H```

You can now toggle the underline by:  ```cmd+alt+U```
You can now toggle the selection borders by:  ```cmd+shift+alt+U```

I've moved this package to use the new decorations API and as such we can no
longer set arbitrary style on the lines. So, this means no more entering colours/
opacity in the settings.

# Customisation

You can update the colours by either updating the ```line-colors.less``` file
once you've installed the package. Or by adding the following to your ```style.less```

I don't use the ```.cursor-line``` class as when you make selection on the
same line, you then lose the highlight.

```scss
atom-text-editor::shadow {
  // The cursor line important to use rgba for opacity, also requires !important
  // to override any theme.
  .line.highlight-line {
    background: rgba(255, 0, 0, 0.3) !important;
  }

  // Replace 'solid', with 'dashed' or 'dotted' depending of what you have
  // set in the settings page.

  // This is for the bottom line (underline)
  .line.highlight-line-multi-line-solid-bottom {
    border-bottom-color: red;
  }

  // This is for the top line when you have the selection borders enabled.
  .line.highlight-line-multi-line-solid-top {
    border-top-color: red;
  }
}
```

To remove unused settings delete them from your ```config.cson```.
