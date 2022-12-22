
# Customisation

You can update the colours by either updating the `line-colors.less` file
once you've installed the package. Or by adding the following to your `style.less`

I don't use the `.cursor-line` class as when you make selection on the
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

To remove unused settings delete them from your `config.cson`.
