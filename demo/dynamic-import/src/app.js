import assign from 'object-assign';

// ES Module
import esModule from './lib/es6';

document.querySelector('#entry').textContent = JSON.stringify(
  assign(
    {'ES Modules': esModule()},
  )
);

(async function() {
  await import(/* webpackChunkName: "commonjs-lazy" */'./lib/commonjs-lazy');
  await import(/* webpackChunkName: "es6-lazy" */'./lib/es6-lazy');
})();
