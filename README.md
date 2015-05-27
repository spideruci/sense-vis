# SeeSoftOnD3


### Directions
- set c_id and c_secret values for increasing github limit rate
How to get c_id, c_secret:
~~~
1. goto: github - settings - application - developer applications - register new application
2. put any values on the form and it will produce client_id and client_secret.
~~~

- Zoom in: mouse click, Zoom out: alt + mouse click

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

1. Added Double Click Show details functionality.

**f55759ddf3e92a7e97c1b8e84f670bab14e8300f**

1. Added D3 Autocomplete feature. Issue: The dropped down list is opaque.

**5f808a5cdc97408a63fd9105be197b40032b9016**

1. Added the lines of code as "pre" HTML elements with a background color.
	 More operations like zooming and redirection on top of this.

**248d12bd63564582180c0a10a2bdc9765a589aa1**

1. Colors made lighter allowing <pre> to overflow.

**89056d264be36567e050e6e5793935cd76348a70**

1. On clicking a particular line of the source code in the SeeSoft view, the
	 user is redirected to the GitHub page of the file with the clicked on like
	 highlighted.

**f846cd1f1095bdde3e1e10f6aa1ee39019fc7699**

1. On clicking the "+" or "-" above the SeeSoft View, one can zoom in and out
   accordingly. The next step is to be able to zoom in and out using a slider.

****

1. Implemented a range slider to zoom in an out of the SeeSoft view better.
