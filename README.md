

# Frontendler


[![Bower version](https://badge.fury.io/bo/frontendler.svg)](http://badge.fury.io/bo/frontendler)
[![Build Status](https://travis-ci.org/dbeff/frontendler.svg?branch=master)](https://travis-ci.org/dbeff/frontendler)

The responsive frontend kit.

Simple, efficient.

http://frontendler.com.br/

## Dependencies

Frontendler need sass,nodeJs and gulp to run.

SASS - [How to install](http://sass-lang.com/install)

NODE JS - [How to install](http://nodejs.org/)

GULP
```
$ npm install gulp -g
```

## Install

Install project dependencies ```$ npm install```

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
phone: 100% max 480px,
tablet: 100% min 481px max 1023px,
desktop: 1000px min 1024px max 1200px,
desktop-large: 1200px min 1200px
);
```
grid-row

```scss
@mixin grid-row($gutter: $grid-gutter-outside, $breakpoints: $grid-breakpoints)
```

grid-col

```scss
@mixin grid-col($col, $cols: 12, $gutter: $grid-gutter)
```

grid-col-breakpoint

```scss
@mixin grid-col-breakpoint($device, $col, $cols: 12, $gutter: false)
```

grid-breakpoint

```scss
@mixin grid-breakpoint($devices...){
	...
};
```

grid-breakpoint-hide

```scss
@mixin grid-breakpoint-hide ($devices...);
```

grid-breakpoint-show

```scss
@mixin grid-breakpoint-hide ($devices...);
```

### THEME

$theme-colors

```scss
$theme-colors:(
	//name,background,foreground,background-hover,foreground-hover)
	ocean:  #00a7ca #a4d6e5 #52cbf2 #d5f0fb,
	blue:   #0075d3 #a4c2e9 #2c8bee #d0e0f9,
	purple: #8244a7 #c7b1d6 #9e5dc1 #e4d7ed,
	pink:   #dd318a #f0adca #ff52a1 #ffd5e6,
	green:  #71be48 #c1e0b3 #87d873 #e1f4d8,
	yellow: #f59d37 #fad2aa #ffb950 #ffebd3,
	orange: #f75925 #fbb8a7 #ff7439 #ffdbd0,
	red:    #dd202b #f0a9ab #fe4542 #ffd3d2,
	dark:   #1c2731 #a8abac #313d48 #d0d2d4,
	gray:   #606c78 #bbbfc2 #798591 #dddfe2,
	silver: #939fac #ced3d8 #b4c0cc #eaedf0
)
```

theme-color
```scss
@function theme-color($color-name,$color-status:false)
```

theme-all
```scss
@mixin theme-all($type)
```

theme
```scss
@mixin theme($color,$type) {
	//put your css
}
```
