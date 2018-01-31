# HTML5 Checkout Form Example

[180114]

This project's been developed while taking
[Kottans Frontend Course](https://github.com/kottans/frontend).

[Check it out](https://kottans-frontend-2018.github.io/assignments_OleksiyRudenko/task_11/index.html)
(click logo to see unstyled page).

[html5 validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fkottans-frontend-2018.github.io%2Fassignments_OleksiyRudenko%2Ftask_11%2Findex.html)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  

- [The Task](#the-task)
  - [Notes from mock-up author](#notes-from-mock-up-author)
- [Assets](#assets)
- [Used Resources Reference](#used-resources-reference)
- [Validation](#validation)
- [Snippets](#snippets)
  - [Skipped Radio Groups](#skipped-radio-groups)
- [Time Track](#time-track)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The Task

 * Make a form according to mockup: 
   https://dribbble.com/shots/1322677-Checkout-Page/attachments/186093
 * Use only HTML & CSS, no JavaScript.  
 * Form elements should be clickable and respond to user action.  
 * The look should be as close as possible to mockup.  
 * Test the result in all available browsers & on different devices.  
 * Turn off CSS styling and check how your form looks and 
   if it is still usable.
 
 [Mock-up decomposition](https://docs.google.com/presentation/d/1HmaVJSr-67Eu3OBkawoHJ112bMO5kv3B65d6eCb3Wlk/edit#slide=id.g2ee63ceef6_0_5)
 _(private access)_
 
### Notes from mock-up author
 
 > The top panel (order summary + help) will be sticky and lively
 updated as the user go through the form. New steps will be 
 revealed progressively.
 
[TOC :arrow_double_up: ](#table-of-contents)
 
## Assets
 
 * [Proxima Nova fonts by Mark Simonson](https://github.com/elliakou/proxima-nova-web-fonts) /
   [Local README.md](fonts/proxima-nova/README.md) (NB! There is a known issue re
   `Proxima Nova Alt Regular.woff2` that results in non-critical error)
 * [Font Awesome](https://fontawesome.com/how-to-use/web-fonts-with-css)
   for icons
   
[TOC :arrow_double_up: ](#table-of-contents)

## Used Resources Reference

 * [Manage page styling](https://guides.codechewing.com/js/disable-enable-stylesheet-javascript)
 * [Repainting PNG with CSS](https://stackoverflow.com/questions/7415872/change-color-of-png-image-via-css/39796437)
   and a [tool](https://codepen.io/sosuke/pen/Pjoqqp) _(you may need recalc values several times to reach target accuracy)_
 * [How To Style A Checkbox With CSS](https://paulund.co.uk/style-checkboxes-with-css)
 * [Custom radio button with rich content](https://codepen.io/adamstuartclark/pen/pbYVYR) 
   // [more...](http://freefrontend.com/css-radio-buttons/) 

[TOC :arrow_double_up: ](#table-of-contents)  
    
## Validation

 * [HTML5 validator](https://html5.validator.nu/?doc=https%3A%2F%2Foleksiyrudenko.github.io%2Fhtml5-checkout-form%2Findex.html&showimagereport=yes&showsource=yes)
 * [CSS validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Foleksiyrudenko.github.io%2Fhtml5-checkout-form%2Findex.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

[TOC :arrow_double_up: ](#table-of-contents)  

## Snippets

### Skipped Radio Groups

Stylized radio buttons where inputs
are hidden are out of keyboard
navigation loop.

Solution:
```css
    .visually-hidden {
      position: absolute;
      overflow: hidden;
      clip: rect(0 0 0 0);
      height: 1px;
      width: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
    }
```

[TOC :arrow_double_up: ](#table-of-contents)

## Time Track

 * `TOTAL= 19h45`
 * `180114 00h10` - setup
 * `180114 01h25` - initialize `index.html`
 * `180116 01h15` - mockup analysis (color map)
 * `180115 00h50` - html: improve layout
 * `180115 00h50` - html: input validation
 * `180115 00h20` - style: logo
 * `180115 10h55` - style: general
 * `180117 02h00` - style: checkbox/radio restyling
 * `180119 00h20` - style: file upload button
    [source](https://codepen.io/OleksiyRudenko/pen/XVoVLe)
 * `180116 00h20` - misc (helpers, chores etc.) 
 * `180118 00h25` - imagery
 * `180123 00h55` - bugfixes

[TOC :arrow_double_up: ](#table-of-contents)
