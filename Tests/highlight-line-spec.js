
const { Range , Point } = require('atom');

const path = require('path');


const cmd = path
    .join(__dirname,'Workspace');


const { workspace , packages , project , config , views } = atom;


describe(`Highlight Line`,() => {

    let activationPromise ,
        workspaceElement ,
        editorElement ,
        editor ;


    const queryAll = ( selector ) =>
        editorElement.querySelectorAll(selector);

    const selectRanges = ( ... ranges ) =>
        editor.setSelectedBufferRanges(ranges);

    const selectArea = ( a , b ) =>
        selectRanges(new Range(
            new Point( ... a ) ,
            new Point( ... b ) ))

    const selectPosition = ( x , y ) =>
        selectArea([ x , y ],[ x , y ]);

    const addClass = ( classname ) =>
        config.set(`highlight-line.${ classname }`,true);

    const expectSelector = ( selector , amount ) =>
        expect(queryAll(selector)).toHaveLength(amount);


    beforeEach(async () => {

        workspaceElement = views
            .getView(workspace);

        project.setPaths([ cmd ]);

        await workspace.open('Example.coffee');

        runs(() => {

            jasmine.attachToDOM(workspaceElement);

            editor = workspace
                .getActiveTextEditor();

            editorElement = views
                .getView(editor);

            activationPromise = packages
                .activatePackage('highlight-line');
        });

        return await activationPromise
    });


    describe(`When the view is loaded`,() =>
        it(`does not attach to the view`,() =>
            expectSelector('.highlight-view',0)));


    return describe(`When the background color is enabled`,() => {

        beforeEach(() =>
            addClass('enabledBackgroundColor'));

        describe(`When there is only one cursor`,() => {

            beforeEach(() =>
                selectPosition(8,2));

            it(`adds the background class to the cursor line`,() =>
                expectSelector('.cursor-line.highlight-line',1));

            return describe(`When hide highlight on select is enabled`,() => {

                beforeEach(() =>
                    addClass('hideHighlightOnSelect'));

                it('will have a highlight when there is no text selected', () =>
                    expectSelector('.cursor-line.highlight-line',1));

                return it(`won't have a highlight when there is text selected`,() => {

                    selectArea([ 8 , 2 ],[ 8 , 5 ]);

                    return expectSelector('.cursor-line.highlight-line',0);
                });
            });
        });


        describe(`When underline is enabled`,() => {

            beforeEach(() =>
                addClass('enableUnderline'));

            describe(`When solid settings has been set`,() => {

                beforeEach(() => {
                    config.set('highlight-line.underline','solid');
                    return selectPosition(8,2);
                });

                it(`adds an underline to the current line`,() =>
                    expectSelector('.cursor-line.highlight-line-multi-line-solid-bottom',1));

                return describe(`When hide highlight on select is enabled`,() => {

                    beforeEach(() =>
                        addClass('hideHighlightOnSelect'));

                    return it(`will still have a line`,() => {

                        selectArea([ 8 , 2 ],[ 8 , 5 ])

                        return expectSelector('.line.highlight-line-multi-line-solid-bottom',1);
                    });
                });
            });

            describe(`When dashed settings has been set`,() => {

                beforeEach(() => {

                    config.set('highlight-line.underline','dashed');

                    return selectPosition(8,2);
                });

                return it(`adds an underline to the current line`,() =>
                    expectSelector('.cursor-line.highlight-line-multi-line-dashed-bottom',1));
            });

            return describe(`When dotted settings has been set`,() => {

                beforeEach(() => {

                    config.set('highlight-line.underline','dotted');

                    return selectPosition(8,2);
                });

                return it(`adds an underline to the current line`,() =>
                    expectSelector('.cursor-line.highlight-line-multi-line-dotted-bottom',1));
            });
        });

        describe(`When there are two cursors`,() => {

            beforeEach(() =>
                selectRanges(
                    new Range(new Point(8,2),new Point(8,2)) ,
                    new Range(new Point(10,2),new Point(10,2))
                ));

            return it(`adds the background class to the cursor line`,() =>
                expectSelector('.cursor-line.highlight-line',2));
        });


        return describe(`When there is a multi row selection`,() => {

            beforeEach(() =>
                selectArea([ 8 , 2 ],[ 10 , 8 ]));

            it(`won't add a highlight line class`,() =>
                expectSelector('.cursor-line.highlight-line',0));

            return describe(`When selection border is enabled`,() => {

                beforeEach(() => {
                    addClass('enableSelectionBorder');
                    config.set('highlight-line.underline','solid');
                    return selectArea([ 8 , 2 ],[ 10 , 8 ])
                });

                return it(`will add highlights to the top and bottom`,() =>
                    expectSelector('.cursor-line .highlight-line-multi-line-solid-top .highlight-line-multi-line-solid-bottom',0));
            });
        });
    });
});
