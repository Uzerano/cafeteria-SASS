
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass') (require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css( done ) {
/// compilar sass
///  pasos: 1- identificar archivo. 2- Compilar archivo. 3-Guardar en el archivo .css.
      
src('src/scss/app.scss')
    .pipe( sass() )
    .pipe(postcss( [ autoprefixer() ] ))
    .pipe( dest('build/css'))

    done();
}

function dev() {
        watch('src/scss/app.scss', css);
}




exports.css = css;
exports.dev = dev;
exports.default = series( css, dev );

//series -> Inicia las tareas de una en una, empieza con la primera termina y continua con la siguiente.

//parallel -> Todas las tareas se inician al mismo tiempo.