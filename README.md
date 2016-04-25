# Frontendler
[![Frontendler version](http://img.shields.io/badge/frontendler-v2.0.0-blue.svg?style=flat)](https://github.com/frontendler/frontendler) [![Build Status](http://img.shields.io/travis/frontendler/frontendler.svg?style=flat)](https://travis-ci.org/frontendler/frontendler)

The responsive frontend kit.

Simple, efficient.

[http://frontendler.com.br/](http://frontendler.com.br/)

## Dependencies
Frontendler need Nodejs and Gulp to run.

NODE JS - [How to install](http://nodejs.org/)

GULP `$ npm install gulp -g`

## Install
Install project node dependencies `$ npm install`

## Run frontendler
watch

```
$ gulp watch
```

build

```
$ gulp build
```

## SASS

### RESET
reset

```scss
@include reset;
```


### GRID
grid-gutter

```scss
$grid-gutter: 40px !default;
```

grid-breakpoints

```scss
$grid-breakpoints:(
	"xsmall": 100% max 600px,
	"small":  100% min 601px max 960px,
	"medium": 100% min 961px max 1280px,
	"large":  1280px min 1281px max 1600px,
    "xlarge": 1600px min 1601px
)!default;
```

grid-row

```scss
@include grid-row()
```

grid-column

```scss
@include grid-column($column, $columns: 12, $gutter: $grid-gutter)
```

grid-column-breakpoint

```scss
@include grid-column-breakpoint($breakpoint, $column, $columns: 12, $gutter: false)
```

or

```scss
@include grid-column-breakpoint($breakpoint, $column, $columns: 12, $gutter: false){
    "optional custom css"
}
```

grid-breakpoint

```scss
@include grid-breakpoint($breakpoints...){
    ...
};
```

grid-breakpoint-hide

```scss
@include grid-breakpoint-hide ($breakpoints...);
```

grid-breakpoint-show

```scss
@include grid-breakpoint-show ($breakpoints...);
```

### COLOR
colors

```scss
$colors:(
	"ocean":   #00a7ca,
	"blue":    #0075d3,
	"purple":  #8244a7,
	"pink":    #dd318a,
	"green":   #71be48,
	"yellow":  #f59d37,
	"orange":  #f75925,
	"red":     #dd202b,
	"dark":    #1c2731,
	"gray":    #606c78,
	"silver":  #939fac
) !default;
```

color

```scss
@function color($color-name,$amount:50%)
```

### ANIMATIONS

animations
```scss
@include animations;
```
animation-duration
```scss
$animation-duration: 0.25s !default;
```
animation-time-functions
```scss
$animation-time-functions: (
	"in-out-quad": cubic-bezier(0.455, 0.030, 0.515, 0.955),
	"in-out-cubic": cubic-bezier(0.645, 0.045, 0.355, 1.000),
	"in-out-quart": cubic-bezier(0.770, 0.000, 0.175, 1.000),
	"in-out-quint": cubic-bezier(0.860, 0.000, 0.070, 1.000),
	"in-out-sine": cubic-bezier(0.445, 0.050, 0.550, 0.950),
	"in-out-expo": cubic-bezier(1.000, 0.000, 0.000, 1.000),
	"in-out-circ": cubic-bezier(0.785, 0.135, 0.150, 0.860),
) !default;
```
animation-keyframes
```scss
$animation-keyframes:(
	"fade-in",
	"fade-out",
	"bounce-in-down",
	"bounce-in-up",
	"rubber-band",
	"zoom-in",
	"slide-in-up",
	"slide-in-down",
	"alert"
) !default;
```

### UTILS
clearfix

```scss
@include clearfix;
```


box-shadow

```scss
@include box-shadow ($level);
```
