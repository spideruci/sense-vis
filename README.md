# SeeSoftOnD3


### Directions
- set c_id and c_secret values for increasing github limit rate
How to get c_id, c_secret:
~~~
1. goto: github - settings - application - developer applications - register new application
2. put any values on the form and it will produce client_id and client_secret.
~~~

- Zoom in: mouse click, Zoom out: alt + mouse click

### Testing

- The javascript code in this project is tested using the BDD testing framework, [Jasmine](http://jasmine.github.io/)[v2.3.4](https://github.com/jasmine/jasmine/releases).
- The Jasmin library, its dependencies, and the actual test runner (SpecRunner.html) is included in the tests directory.
- The tests/spec folder contains the actual tests, written in javascript.
- Writing/adding more javascript tests
    + You *do not* have to download the library. That is already done for *this* project.
    + You can add more tests (written in JS) in tests/spec
    + Declare your cod-under-test and the spec inside SpecRunner.html, i.e. the test-runner.
    + Here are some awesome links to learn more about Jasmine:
        * Official Introduction: http://jasmine.github.io/2.3/introduction.html
        * A Hello World Tutorial for Jasmine: http://evanhahn.com/how-do-i-jasmine/
    + To run your tests, just open SpecRunner.html in your browser (works on Firefox).

### Change Log

**038d8875eade281910486cbcbaa261a9f2b89b8d**

1. Reduced the size of the TreeMap Layout
2. Added the search functionality which does the same thing as zooming in on any file
3. Added a line to erase the previous TreeMap on update
4. Implemented "autocomplete" using jQuery
5. Added a restore button to restore it to the original view.


**d524c82712e3c6cb87ac328ba11f0a6da706c076**

1. Add commit log
2. Add source view
3. fix zoom behavior
	- zoom in: left mouse click
	- zoom out: left mouse click + alt

**17b9d98a39517ff144f891e249462899f213de4a**

Added Double Click Show details functionality.

**f55759ddf3e92a7e97c1b8e84f670bab14e8300f**

Added D3 Autocomplete feature. Issue: The dropped down list is opaque.

**5f808a5cdc97408a63fd9105be197b40032b9016**

Added the lines of code as "pre" HTML elements with a background color.
	 More operations like zooming and redirection on top of this.

**248d12bd63564582180c0a10a2bdc9765a589aa1**

Colors made lighter allowing "pre" section to overflow.

**89056d264be36567e050e6e5793935cd76348a70**

On clicking a particular line of the source code in the SeeSoft view, the user is redirected to the GitHub page of the file with the clicked on like highlighted.

**f846cd1f1095bdde3e1e10f6aa1ee39019fc7699**

On clicking the "+" or "-" above the SeeSoft View, one can zoom in and out accordingly. The next step is to be able to zoom in and out using a slider.

**38f1b884f343ae6514ee07e8163382bab90a300b**

Implemented a range slider to zoom in an out of the SeeSoft view better.

**f9200db0495b7c2429bcea2d03fd23f9ddfce76b**

1. On clicking any colored rectangle, the SeeSoft is zoomed in and the page is
   scrolled down the exact line number that was clicked. On double clicking the
   line, a new window with a link to the highlighted line of the GitHub page of
   the source code.
2. Made colors a bit lighter.

**ff9b221794fca9b44095e8ca1f95d9d9777eb60c**

Added bootstrap.css to make it look better. Will later use the sections to
make it appear more organized later.

**bfd7d83ade2985806467aa7e12eb02855740ff75**

Fixed the auto-scrolling on the click listener on every "pre" object.

**3485663162717f677f2b85e6015afc13065676bb**

Varied column size with the zoom.

**d82a51f1df2d87559c607f680b552e30bc9c971c**

Beautifying with Bootstrap classes and HTML.

**bcedae1dbb1c8ef934f653a68137cb3c2e09834b**

Fixed the search function to hook on to the SeeSoft view.

**b009e88d2085c55e67ccb7dab28e182632f587e6**

Added gradient effect to the TreeMap but had to remove the commit brightener.
Will make it look neater and incorporate commit information.

**90e7eba9d8a640956d8bb37255148892a056cf1c**
Tied up the radius of the bright spot with the number of commits.

**df4bd177179e815a8f359c260b1f6ae8c63cab22**
Changed the appearance from a bright spot to a bright ring.

**d22d70fd72532e5e2b050b416ff1bf744526d1d3**
Changed the bight spot to a corner gradient. Also put the TreeMap in the
"jumbotron" element.

**93f755c85ad3741c5e91de333508b1945ce1ad8b**
Cascading the SeeSoft views. Also removed the margin from the TreeMap. Made the
background black but it doesn't stretch.

**cfd006b2aaa993c1859d7f531777b021422773a1**
Added Tabs that get appended once every new file is displayed. More Work
required here.

**a0a24b5c3e9c03df728b20c153a1286b2d95daed**
Tabs finally working.

**6c2cbaff97c80093f80c6a4448bd2803ca4d2d50**
Minor bug fixes with tabs. Removed the jQuery search.

**1be0f184a8af215aa6d97b075c32b1775fce0422**
Added the X button to close tabs.

**The next one**
Changed the UI by putting the zoom changer and tab selector on the header.
The default tab opens to the tree map.
