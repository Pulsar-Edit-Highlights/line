## Change Log

### v0.11.1 2016/02/02
- Fix `cmd + l` empty line selection ([@shemerey])

### v0.11.0 2015/04/18
- Remove Space Pen View dependency and no longer add to the DOM. ([@richrace])

### v0.10.2 2015/04/17
- Fix activating package. ([@richrace] #[66])

### v0.10.1 2015/03/01
- Fix 1px border above the status bar. ([@richrace] #[62])

### v0.10.0 2015/02/28
- Fix deprecations ([@skulled])
- Fix Specs ([@richrace])

### v0.9.3 2015/01/14
- Support for Shadow Dom ([@richrace])

### v0.9.0 2014/09/04
- Use new Event API ([@richrace])
- Use new config settings ([@richrace])

### v0.8.1 2014/08/31
- Don't hide underline when hide highlight enabled ([@richrace])

### v0.8.0 2014/08/24
- Total rewrite to use decorations ([@richrace])
- Use selection:changed to handle multiple cursors ([@richrace])
- Make lines not exceed 80 columns ([@richrace])
- Ignore tmp folder. ([@richrace])
- Add specs ([@richrace])
- Add Travis yml ([@richrace])

### v0.7.6 (2014/07/22 07:53 +00:00)
- [9c90d08](https://github.com/richrace/highlight-line/commit/9c90d08eefcd567dfd4fb1db8b48037aedd7752e) Don't iterate over every line when reseting (@richrace)
- [09081b4](https://github.com/richrace/highlight-line/commit/09081b45e180959391607c8939cd76f2628efd18) Prepare 0.7.6 release (@richrace)

### v0.7.5 (2014/07/21 07:02 +00:00)
- [404fa40](https://github.com/richrace/highlight-line/commit/404fa4048fb43ea58598e8aa4b56709ba14989e5) fixed the highlight style doesn't remove. ([@kelp404])
- [58f7980](https://github.com/richrace/highlight-line/commit/58f79803086b605cf96dce3204b43513469e0361) Prepare 0.7.5 release (@richrace)

### v0.7.4 (2014/07/19 11:01 +00:00)
- [ecec9dd](https://github.com/richrace/highlight-line/commit/ecec9dd2605797c6682158bc09925eea2e752de8) Start moving logic into smaller methods (@richrace)
- [1391398](https://github.com/richrace/highlight-line/commit/1391398aeebdcc9cc5421d28ec1f8aff02f85120) Only reset the top '.line' (@richrace)
- [a17627a](https://github.com/richrace/highlight-line/commit/a17627a02172e5fd49a61db8982e0c5bb25070a1) Prepare 0.7.4 release (@richrace)

### v0.7.3 (2014/07/19 09:07 +00:00)
- [477fcd6](https://github.com/richrace/highlight-line/commit/477fcd633d73229af1854cc9298aae4a984cedf2) Override theme's highlight line; Don't multilines disappearing (@richrace)
- [4c7c53b](https://github.com/richrace/highlight-line/commit/4c7c53b777d1463a84957c3f351f6b463ea5c345) Prepare 0.7.3 release (@richrace)

### v0.7.2 (2014/06/21 08:41 +00:00)
- [fc1da44](https://github.com/richrace/highlight-line/commit/fc1da44d7d7be57ba1bab181064b5a5210f679bf) Don't crash if the user hasn't selected underline style (@richrace)
- [43df5c1](https://github.com/richrace/highlight-line/commit/43df5c1b5429c77ca8b0d3beb76146e1febfb2d8) Prepare 0.7.2 release (@richrace)

### v0.7.1 (2014/05/29 20:22 +00:00)
- [f81bb71](https://github.com/richrace/highlight-line/commit/f81bb7111fbf934349511110d3b9d033dbf6a1ac) Use lineNodeForScreenRow for React Editor (@richrace)
- [a02a61f](https://github.com/richrace/highlight-line/commit/a02a61fe7d1a10eef063de7ff83f8e202b7f4230) Prepare 0.7.1 release (@richrace)

### v0.7.0 (2014/05/24 11:16 +00:00)
- [16b951b](https://github.com/richrace/highlight-line/commit/16b951be1dcf094ecd7d1d5c60464bf12e026f12) Added support for selection borders, in the form of lines above and below the selection. This extends the underline functionality somewhat, and only triggers on multi line selection. Can be toggle with shift-alt-cmd-h. If underline is disbled, this will not show up ([@djak250])
- [a23c306](https://github.com/richrace/highlight-line/commit/a23c3063baba8355702e025943782d213c05c7ab) Added hotkey to toggle hiding the highlight on select ([@djak250])
- [9ab60e2](https://github.com/richrace/highlight-line/commit/9ab60e27e1cb56f4c83ecf8d83ab174f20c66a20) updated readme ([@djak250])
- [01f56c0](https://github.com/richrace/highlight-line/commit/01f56c0c158fcae4d50f9f455fe77c12a82f6503) Added screenshot for multi line selection borders ([@djak250])
- [6a3f00d](https://github.com/richrace/highlight-line/commit/6a3f00ddbf28f612b27402316b1870f3200d0d7b) Fixes (@richrace)
- [15a3844](https://github.com/richrace/highlight-line/commit/15a38441418728ac1a9aabf64d89e5b22955b644) Fix line height growing. (@richrace)
- [d846ff7](https://github.com/richrace/highlight-line/commit/d846ff71bcd2015bd493b68fff3ba60a0e583fb2) Add support for React Editor (@richrace)
- [4926352](https://github.com/richrace/highlight-line/commit/4926352264a96cf731f37de014bc376de70c24c8) Prepare 0.7.0 release (@richrace)

### v0.6.0 (2014/04/03 19:41 +00:00)
- [3d8bd26](https://github.com/richrace/highlight-line/commit/3d8bd2678405b9fdb446aa1e203d8c4f4a1fab46) Added option to hide highlight on line when a chunk of text is selected. It will still show the underline which is a nice touch ([@djak250])
- [bf08b51](https://github.com/richrace/highlight-line/commit/bf08b517d3faa9793db34a72c7bd8eecb39635d6) Closes #12 (@richrace)
- [1b0c126](https://github.com/richrace/highlight-line/commit/1b0c126e4ea314c996e54caa37e21b8491058e36) Update Readme (@richrace)
- [ab997cb](https://github.com/richrace/highlight-line/commit/ab997cb75b9c3ce8b2f1b124289e666eda491680) Prepare 0.6.0 release (@richrace)

### v0.5.5 (2014/03/28 01:41 +00:00)
- [b0fd1b9](https://github.com/richrace/highlight-line/commit/b0fd1b92d96fad4f3a047f01ae4e362bf884bc64) Rename update setting (@richrace)
- [a39e8de](https://github.com/richrace/highlight-line/commit/a39e8de92458de0d91d8310b34782760e533b2e9) Remove all enabled (@richrace)
- [b3793a8](https://github.com/richrace/highlight-line/commit/b3793a8acd28e335e7c89a7496307a69920fa99b) Make sure line is deleted (@richrace)
- [538ff4a](https://github.com/richrace/highlight-line/commit/538ff4a5b1d0fb5236fe3ddca6ddafdd99e1afe2) Handles opacity percentages better (@philnash)
- [2d6f9a8](https://github.com/richrace/highlight-line/commit/2d6f9a89056fe375fd199a5fb767c6c9b870fd17) Prepare 0.5.5 release (@richrace)

### v0.5.4 (2014/03/21 21:34 +00:00)
- [215ca2c](https://github.com/richrace/highlight-line/commit/215ca2c036c2be15f163d86fbf2180c4a56d3edf) Add Hotkeys/Menu for enabling/disabling Background/underline (@richrace)
- [3198613](https://github.com/richrace/highlight-line/commit/31986138b80b49d78582c78da0513e7e4758e7f7) Closes #10 (@richrace)
- [9f2f686](https://github.com/richrace/highlight-line/commit/9f2f68695ea89bc7e078403d6e7ff77b72d85992) Prepare 0.5.4 release (@richrace)

### v0.5.3 (2014/03/18 21:54 +00:00)
- [d0ee161](https://github.com/richrace/highlight-line/commit/d0ee1610eefcba7b6b61f9937214dd812f9bfb81) add background colour enabler ([@sniperbat])
- [c5e4488](https://github.com/richrace/highlight-line/commit/c5e44888ded3396baf37063cc611152560d380b4) add back this plugin enable switch, fix syntax error ([@sniperbat])
- [a6c26d5](https://github.com/richrace/highlight-line/commit/a6c26d50d39a70d7c9bf0c2214823a959308b2d4) Prepare 0.5.3 release (@richrace)

### v0.5.2 (2014/03/15 18:13 +00:00)
- [8a08f70](https://github.com/richrace/highlight-line/commit/8a08f706300b84667d1f49a7ff88fdd44d758d8c) Resolved the problem that the height of the line increase by one pixel when underline is enabled ([@sniperbat])
- [7080cc5](https://github.com/richrace/highlight-line/commit/7080cc58e5d523eceb4b32d442df01750a7f563c) Keep height consistent. (@richrace)
- [484ac15](https://github.com/richrace/highlight-line/commit/484ac15dc767a08d1d72bc8c467463640dccf575) Prepare 0.5.2 release (@richrace)

### v0.5.1 (2014/03/15 16:09 +00:00)
- [86bfc9e](https://github.com/richrace/highlight-line/commit/86bfc9e6cb362a0944ba724949a5821c5a3ba163) Improve destroying event (@richrace)
- [93e06c0](https://github.com/richrace/highlight-line/commit/93e06c06934b86cd473e1fa444a5f2da97f6c3e0) Prepare 0.5.1 release (@richrace)

### v0.5.0 (2014/03/15 15:25 +00:00)
- [4b67c18](https://github.com/richrace/highlight-line/commit/4b67c189b969ac58206469e7d5cd949def441b2b) add underline support ([@sniperbat])
- [7204de1](https://github.com/richrace/highlight-line/commit/7204de10c40004a116b3a312a5c59340ec0897ee) Disable underline by default (@richrace)
- [0779093](https://github.com/richrace/highlight-line/commit/07790934fb72fe779d0185672fd19c4cb677407a) Tidy up coffee (@richrace)
- [dda1a49](https://github.com/richrace/highlight-line/commit/dda1a49ffae51855b450da281687ef643f0e40f0) Updated README to include underline support (@richrace)
- [ee9d71f](https://github.com/richrace/highlight-line/commit/ee9d71f16ca8ea8874f72793b0e86af24bdff1aa) Prepare 0.5.0 release (@richrace)

### v0.4.1 (2014/03/13 20:38 +00:00)
- [37d0aa9](https://github.com/richrace/highlight-line/commit/37d0aa9f2fb3e6307f63fa664f327640a20b2643) Fix error being thrown when moving tabs to different panes (@richrace)
- [5e352d0](https://github.com/richrace/highlight-line/commit/5e352d0e566e198fc9f070cfb27e6d6c6bd99ebc) Improve GC (@richrace)
- [98945b7](https://github.com/richrace/highlight-line/commit/98945b7b39bdae61d156be486d55bae2f11ef598) Prepare 0.4.1 release (@richrace)

### v0.4.0 (2014/03/12 23:34 +00:00)
- [5683ab2](https://github.com/richrace/highlight-line/commit/5683ab29b340f3f85c39b45b0dae3b336f7b70bf) Attempt to improve performance and stability (@richrace)
- [a51616b](https://github.com/richrace/highlight-line/commit/a51616b85ed99c05ec657f62fd23f59e99ce49f7) Prepare 0.4.0 release (@richrace)

### v0.3.2 (2014/03/09 16:03 +00:00)
- [ddcb3a5](https://github.com/richrace/highlight-line/commit/ddcb3a53ece48c1f541bc7bc414329288bd9a18f) Change the triggering event. (@richrace)
- [cc3f25f](https://github.com/richrace/highlight-line/commit/cc3f25f51d19cf759c495c4d46232b20abe6591a) Prepare 0.3.2 release (@richrace)

### v0.3.1 (2014/03/09 09:39 +00:00)
- [e2e33e7](https://github.com/richrace/highlight-line/commit/e2e33e7557f0e6bba18972d9cea2e834b14ec667) Only look for Cursors on EditorViews. Closes #4 (@richrace)
- [0b23d7e](https://github.com/richrace/highlight-line/commit/0b23d7e90d64ccd27f494ab18f11ee1f60d543dd) Prepare 0.3.1 release (@richrace)

### v0.3.0 (2014/03/09 00:13 +00:00)
- [6f5c046](https://github.com/richrace/highlight-line/commit/6f5c04624f529460e92574e4b02a857e984067d5) Add support for multiline highlights. Closes #3 (@richrace)
- [9e5fa86](https://github.com/richrace/highlight-line/commit/9e5fa86c429c50443d8a6ef417e78ec04149f600) Prepare 0.3.0 release (@richrace)

### v0.2.1 (2014/03/06 23:01 +00:00)
- [8b56291](https://github.com/richrace/highlight-line/commit/8b56291482a254ee4c13f6d47372fd9eb46686b6) All opacity to be set at 100 (@richrace)
- [aaa9426](https://github.com/richrace/highlight-line/commit/aaa9426c769760fea982b109e5136ae769cdc8ce) Prepare 0.2.1 release (@richrace)

### v0.2.0 (2014/03/05 23:38 +00:00)
- [406dad4](https://github.com/richrace/highlight-line/commit/406dad4e4daccdabe0450c4141d745f4f1b5da44) Add options to enable or disable the line, and to change the colour of the line (@richrace)
- [38f6268](https://github.com/richrace/highlight-line/commit/38f6268d258c6d71e9ce183f239f7c8bd227193a) Update Readme (@richrace)
- [ab0aace](https://github.com/richrace/highlight-line/commit/ab0aaceebfdb59691a7dccf64419cec88f269e64) Prepare 0.2.0 release (@richrace)

### v0.1.0 (2014/02/28 23:39 +00:00)
- [c378453](https://github.com/richrace/highlight-line/commit/c378453c896347f029f3585c3ec62b797dcda8cc) Initial Commit (@richrace)
- [1c890e1](https://github.com/richrace/highlight-line/commit/1c890e17722bd878773196b53bddb57d76e85068) Stop it from crashing. (@richrace)
- [6ffd264](https://github.com/richrace/highlight-line/commit/6ffd26423635c293bddf9c17c9821dce94328cac) Updated Read Me (@richrace)
- [e8c504e](https://github.com/richrace/highlight-line/commit/e8c504ee4bbfc23ad8ad0b0d079d3dbb698f37c8) Removed double brackets. (@richrace)
- [bd6d9e0](https://github.com/richrace/highlight-line/commit/bd6d9e07398e79ddd56569dc804fabee4470cdee) Prepare 0.1.0 release (@richrace)

[@djak250]: https://github.com/djak250
[@richrace]: https://github.com/richrace
[@kelp404]: https://github.com/kelp404
[@sniperbat]: https://github.com/sniperbat
[@skulled]: https://github.com/skulled
[@shemerey]: https://github.com/shemerey
[62]: https://github.com/richrace/highlight-line/issues/62
[66]: https://github.com/richrace/highlight-line/issues/62
