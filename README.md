

# Frontendler

[![Frontendler version](http://img.shields.io/badge/frontendler-v0.0.9-blue.svg?style=flat)](https://github.com/frontendler/frontendler)
[![Build Status](http://img.shields.io/travis/frontendler/frontendler.svg?style=flat)](https://travis-ci.org/frontendler/frontendler)
[![Issues](http://img.shields.io/github/issues/frontendler/frontendler.svg?style=flat)](https://github.com/frontendler/frontendler/issues)

The responsive frontend kit.

Simple, efficient.

http://frontendler.com.br/

## Dependencies

Frontendler need sass,nodeJs and gulp to run.

RUBY - [How to install](https://www.ruby-lang.org/)

SASS (3.3.14) ```$ gem install sass -v 3.3.14```


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
	phone: 100% max 480px,
	tablet: 100% min 481px max 768px,
	tablet-large: 100% min 769px max 1024px,
	desktop: 1024px min 1024px max 1199px,
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
@mixin grid-col-breakpoint($device, $col, $cols: 12, $gutter: false){
	"optional custom css"
}
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
@mixin grid-breakpoint-show ($devices...);
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

theme
```scss
@mixin theme ($color-name,$background-property:background,$foreground-property:color,$state:false)
```
