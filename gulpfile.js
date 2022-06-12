const { src, dest } = require('gulp');
const sass = require('gulp-sass') (require('sass'));

function css( done ) {
/// compilar sass
///  pasos: 1- identificar archivo. 2- Compilar archivo. 3-Guardar en el archivo .css.
      
src('src/scss/app.scss')
    .pipe( sass() )
    .pipe( dest('build/css'))

    done();
}




exports.css = css;