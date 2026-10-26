const fs = require('fs-extra');
const path = require('node:path');
const {logger} = require('rslog');

/**
 * Build miniprogram_npm using miniprogram-ci's packNpmManually API.
 *
 * We use packNpmManually (not packNpm) because in typical rsmax projects the
 * node_modules lives outside the mini program output directory (e.g. at the
 * workspace / project root). packNpmManually lets us point at the project's
 * package.json and write miniprogram_npm directly into the target output dir.
 *
 * @param {Object} options
 * @param {string} options.projectRoot  - Directory containing package.json
 * @param {string} options.targetDir    - Mini program output dir (where app.json lives)
 * @param {Object} options.projectPkg   - Parsed package.json
 * @param {Object|boolean|undefined} options.npmConfig - `npm` field from rsmax.config.js
 *   - false / { enable: false }  : skip npm build
 *   - true  / undefined          : auto-build when dependencies exist
 *   - { ignores: string[] }      : extra ignore patterns passed to packNpmManually
 * @returns {Promise<boolean>} true if npm build ran successfully, false if skipped
 */
async function buildNpm({projectRoot, targetDir, projectPkg, npmConfig}) {
    // Resolve effective config
    let enable = true;
    let ignores = [];

    if (npmConfig === false) {
        enable = false;
    } else if (npmConfig && typeof npmConfig === 'object') {
        if (npmConfig.enable === false) enable = false;
        if (Array.isArray(npmConfig.ignores)) ignores = npmConfig.ignores;
    }

    if (!enable) {
        logger.debug('[rsmax] npm build disabled by config');
        return false;
    }

    // Skip when there are no runtime dependencies to build
    const deps = projectPkg && projectPkg.dependencies;
    if (!deps || Object.keys(deps).length === 0) {
        logger.debug('[rsmax] no npm dependencies found, skipping npm build');
        return false;
    }

    const packageJsonPath = path.join(projectRoot, 'package.json');
    if (!await fs.pathExists(packageJsonPath)) {
        logger.warn('[rsmax] package.json not found, skipping npm build');
        return false;
    }

    // Lazy-load miniprogram-ci so the compiler can still be used without it
    let ci;
    try {
        ci = require('miniprogram-ci');
    } catch (err) {
        logger.warn(
            '[rsmax] miniprogram-ci is not installed; skipping npm build. ' +
            'Run `npm install miniprogram-ci` or set `npm: false` in rsmax.config.js to silence this.'
        );
        return false;
    }

    logger.log('[rsmax] Building npm (miniprogram_npm)...');
    const startTime = Date.now();

    try {
        const result = await ci.packNpmManually({
            packageJsonPath,
            miniprogramNpmDistDir: targetDir,
            ignores,
        });
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const {miniProgramPackNum = 0, otherNpmPackNum = 0, warnList = []} = result || {};
        logger.success(
            `[rsmax] npm build complete (${elapsed}s) ` +
            `miniProgram: ${miniProgramPackNum}, other: ${otherNpmPackNum}`
        );
        if (warnList && warnList.length > 0) {
            for (const w of warnList) {
                logger.warn(`[rsmax] npm warning: ${w.msg || w}`);
            }
        }
        return true;
    } catch (err) {
        // npm build is a post-processing step; don't fail the whole build
        logger.warn(`[rsmax] npm build failed: ${err.message}`);
        logger.warn('[rsmax] You can still build npm manually in WeChat DevTools (工具 -> 构建 npm)');
        return false;
    }
}

module.exports = {buildNpm};
