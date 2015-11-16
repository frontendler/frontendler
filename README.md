

# Frontendler

[![Frontendler version](http://img.shields.io/badge/frontendler-v2.0.0-blue.svg?style=flat)](https://github.com/frontendler/frontendler)
[![Build Status](http://img.shields.io/travis/frontendler/frontendler.svg?style=flat)](https://travis-ci.org/frontendler/frontendler)

The responsive frontend kit.

Simple, efficient.

http://frontendler.com.br/

## Dependencies

Frontendler need Nodejs and Gulp to run.

NODE JS - [How to install](http://nodejs.org/)

GULP ```$ npm install gulp -g```

## Install

Install project node dependencies ```$ npm install```

##Run frontendler

watch
```
$ gulp watch
```

build
```
$ gulp build
```


## SASS

### GRID

grid-gutter

```scss
$grid-gutter: 40px;
```
grid-gutter-outside

```scss
grid-gutter-outside: 5px;
```

grid-breakpoints

```scss
$grid-breakpoints:(
	"phone": 100% max 480px,
	"tablet": 100% min 481px max 768px,
	"tablet-large": 100% min 769px max 1023px,
	"desktop": 1024px min 1024px max 1199px,
	"desktop-large": 1200px min 1200px
);
```
grid-row

```scss
@mixin grid-row($gutter: $grid-gutter-outside, $breakpoints: $grid-breakpoints)
```

grid-column

```scss
@mixin grid-column($column, $columns: 12, $gutter: $grid-gutter)
```

grid-column-breakpoint

```scss
@mixin grid-column-breakpoint($breakpoint, $column, $columns: 12, $gutter: false)
```
or
```scss
@mixin grid-column-breakpoint($breakpoint, $column, $columns: 12, $gutter: false){
	"optional custom css"
}
```

grid-breakpoint

```scss
@mixin grid-breakpoint($breakpoints...){
	...
};
```

grid-breakpoint-hide

```scss
@mixin grid-breakpoint-hide ($breakpoints...);
```

grid-breakpoint-show

```scss
@mixin grid-breakpoint-show ($breakpoints...);
```

###  COLOR

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
);
```

color
```scss
@function color($color-name,$amount:50%)
```
