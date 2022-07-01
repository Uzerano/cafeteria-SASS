const { src, dest, watch, series, parallel } = require("gulp");

// CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

 /// IMAGENES
 const imagemin = require("gulp-imagemin");
 const webp  = require("gulp-webp");
 const avif  = require("gulp-avif");

function css(done) {
  /// compilar sass
  ///  pasos: 1- identificar archivo. 2- Compilar archivo. 3-Guardar en el archivo .css.

  src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"));

  done();
}

function imagenes( done ) {
   src("src/img/**/*")
    .pipe( imagemin( { optimizationLevel: 3} ) ) 
    .pipe(dest('build/img'))
    done();
}

function versionWebp() {
  const opciones = {
    quality: 50
  }
  return src('src/img/**/*.{jpg,png}')
  .pipe(webp( opciones ))
  .pipe(dest('build/img'));
}

function versionAvif() {
  const opciones = {
    quality: 50
  }
   return src('src/img/**/*.{jpg,png}')
   .pipe(avif( opciones ))
   .pipe(dest('build/img'));
}

function dev() {
  watch("src/scss/**/*.scss", css);
  watch('src/img/**/*', imagenes)
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.VersionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);

//series -> Inicia las tareas de una en una, empieza con la primera termina y continua con la siguiente.

//parallel -> Todas las tareas se inician al mismo tiempo.
