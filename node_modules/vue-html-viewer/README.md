# vue-html-viewer

## Setup

In order to add the package to your application, install it with `npm`
```
npm install vue-html-viewer --save
```
and then include it in your Vue component like this
```
import HtmlPreview from 'vue-html-viewer';
```

## How to use

The HtmlPreview component uses `Slots` in order to render your `HTML`. To use the component, simply import it in your Vue Component and then provide the respective `HTML` like this
```
<HtmlPreview>
 <div class="input">
      <a>Hello</a>
  </div>
</HtmlPreview>
```

The visual representation will be the following:

![Image of the HTML viewer](https://i.imgur.com/nlv74e5.png)

You can view the HTML via the `Switch` button

![Image of the HTML viewer](https://i.imgur.com/ZG1Euk0.png)
