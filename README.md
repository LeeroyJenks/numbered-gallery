# numbered-slider
A slider gallery plugin with numbers or thumbnails for navigation and touch support.

## Demo
[plugins.getdans.info/numbered-slider](http://plugins.getdans.info/numbered-slider)

## Installation
Download from GitHub

### Requirements
jQuery

### Use
```html
<script>
    $(document).ready(function(){
        $('.image-gallery').numberedSlider();
    });
</script>
```
### Description

Some CSS is required, as the nav is not styled. See the example below for what is used in the demo. A height has to be defined for the images within the gallery in order for the slider to work properly.

### Example

```html
<style>
    /* original image containers css */
    
    .image-container{
        padding: 0 5px;
    }
    
    .image-container img{
        width: auto;
        height: 400px;
        display: block;
    }
    
    /* slider css */
    
    .slider{
        display: block;
        position: relative;
        margin: 0 auto;
        width: 90%;
        max-width: 800px;
        overflow: hidden;
        margin-top: 120px;
        background-color: #26A69A;
    }
    
    /* slider nav */
    
    .slider-nav{
        list-style: none;
        padding: 0;
        margin: 0;
        position: absolute;
        bottom: 15px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    
    .slider-nav li{
        color: #fff;
        cursor: pointer;
        display: inline-block;
        position: relative;
        margin: 0 6px;
    }
    
    .slider-nav li.current::after{
        content: '';
        width: 100%;
        height: 1px;
        background-color: #fff;
        bottom: -1px;
        left: 0;
        display: block;
        position: absolute;
    }
</style>

<div class="image-gallery">
    <div class="image-container"><img src="IMAGE_ONE.jpg" alt="Image 1"/></div>
    <div class="image-container"><img src="IMAGE_TWO.jpg" alt="Image 2"/></div>
    <div class="image-container"><img src="IMAGE_THREE.jpg" alt="Image 3"/></div>
</div>

<script>
    $(document).ready(function(){
        $('.image-gallery').numberedSlider();
    });
</script>
```

### Options

Options   | Definition
--------- | ------------------------------------------------------------------------ 
`exclude` | Image container, if any, to exclude from gallery.<br>Can be class or id.
`navType` | `"number", "thumb"`<br>`default:"number"` 
 
### Methods
 
Method      | Definition         
----------- | ------------------- 
`'destroy'` | Destroy numbered-slider. 
