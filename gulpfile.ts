import path from "path";
import { Transform } from "stream";
import chalk from "chalk";
import { dest, parallel, series, src, type TaskFunction } from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import rename from "gulp-rename";
import consola from "consola";
import postcss from "postcss";
import cssnano from "cssnano";
import type Vinyl from "vinyl";

const distFolder = path.resolve(__dirname, "theme-chalk");

/**
 * using `postcss` and `cssnano` to compress CSS
 * 用 postcss + cssnano 压缩 CSS
 * @returns
 */
function compressWithCssnano() {
  const processor = postcss([
    cssnano({
      preset: [
        "default",
        {
          colormin: false,
          minifyFontValues: false,
        },
      ],
    }),
  ]);
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const file = chunk as Vinyl;
      if (file.isNull()) {
        callback(null, file);
        return;
      }
      if (file.isStream()) {
        callback(new Error("Streaming not supported"));
        return;
      }
      const cssString = file.contents!.toString();
      processor.process(cssString, { from: file.path }).then((result) => {
        const name = path.basename(file.path);
        file.contents = Buffer.from(result.css);
        consola.success(
          `${chalk.cyan(name)}: ${chalk.yellow(
            cssString.length / 1000,
          )} KB -> ${chalk.green(result.css.length / 1000)} KB`,
        );
        callback(null, file);
      });
    },
  });
}

/**
 * compile theme-chalk scss & minify
 * @returns
 */
function buildThemeChalk() {
  const sass = gulpSass(dartSass);
  const noLdPrefixFile = /(index|base|display)/;
  return src(path.resolve(__dirname, "packages/**/*.scss"))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(compressWithCssnano())
    .pipe(
      rename((path) => {
        path.dirname = path.dirname.replace(/[\\/]?style(s)?$/, "");
        if (!noLdPrefixFile.test(path.basename)) {
          path.basename = `ld-${path.basename}`;
        }
      }),
    )
    .pipe(dest(distFolder));
}

export const build: TaskFunction = parallel(series(buildThemeChalk));

export default build;
