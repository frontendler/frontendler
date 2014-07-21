Frontendler
===========

The responsive framework. Clean, simple, efficient. http://frontendler.com.br/


Dependencies
------

Frontendler need sass,nodeJs and gulp to run.

SASS - [How to install](http://sass-lang.com/install)

NODE JS - [How to install](http://nodejs.org/)

GULP - ```$ npm install gulp -g```

Install
------

Install project dependencies ```$ npm install```

Run frontendler
------

watch ```$ gulp watch```
build ```$ gulp watch```


SASS library
------

### GRID

grid-margin ```$grid-margin: 40px;```

grid-col ```@include grid-col ($col, $cols: 12, $collapse: false);```

grid-col-breakpoint ```@include grid-col-breakpoint ($device, $col, $cols: 12, $collapse: false);```

grid-breakpoint ```@include grid-breakpoint ($devices...);```

grid-breakpoint-hide ```@include grid-breakpoint-hide ($device);```

