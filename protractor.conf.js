let config = {

    useAllAngular2AppRoots: true,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            // Run without sandbox, set browser language
            args: ['--no-sandbox', 'lang=en-US'],
            // Set Accept-Language header
            prefs: {
                intl: { accept_languages: 'en-US' }
            }
        },
        name: 'Preserver Tests Job',
        logName: 'Chrome - English',
        shardTestFiles: true,
        maxInstances: 4
    },
    specs: ['specs/*.spec.js'],
    suites: {
        about: 'specs/about.spec.js',
        create: 'specs/create.note.spec.js',
        delete: 'specs/delete.note.spec.js',
        all: 'specs/*.spec.js'
    },
    // suite: 'create',
    directConnect: true,
    baseUrl: 'http://www.hiteshbalar.com/preserver/notes',
    // Custom parameters can be specified here
    params: {
        // Custom timeouts to wait for elements on the page
        customTimeout: 3000,
        customMinTimeout: 500,
        implicitTimeout: 2000
    },

    // The timeout in milliseconds for each script run on the browser.
    allScriptsTimeout: 30000,
    // How long to wait for a page to load in milliseconds.
    getPageTimeout: 30000,

    // Remove protractor dot reporter
    jasmineNodeOpts: {
        print: function () {}
    },

    onPrepare: function () {

        global.EC = protractor.ExpectedConditions

        // jasmine.getEnv().addReporter({})

        // Config for https://www.npmjs.com/package/jasmine-spec-reporter
        // let SpecReporter = require('jasmine-spec-reporter')
        // jasmine.getEnv().addReporter(new SpecReporter({
        //     displayStacktrace: 'specs',     // display stacktrace for each failed assertion, (all|specs|summary|none)
        //     displaySuccessesSummary: false, // display summary of all successes after execution
        //     displayFailuresSummary: false,  // display summary of all failures after execution
        //     displayPendingSummary: true,    // display summary of all pending specs after execution
        //     displaySuccessfulSpec: true,    // display each successful spec
        //     displayFailedSpec: true,        // display each failed spec
        //     displayPendingSpec: true,       // display each pending spec
        //     displaySpecDuration: true       // display each spec duration
        // }))

        // Config for https://www.npmjs.com/package/jasmine-console-reporter
        let JasmineConsoleReporter = require('jasmine-console-reporter')

        jasmine.getEnv().addReporter(new JasmineConsoleReporter({
            colors: 2,           // (0|false)|(1|true)|2
            cleanStack: 2,       // (0|false)|(1|true)|2|3
            verbosity: 4,        // (0|false)|1|2|(3|true)|4
            listStyle: 'indent', // "flat"|"indent"
            activity: false      // If your tests log extra data to console, this option should be disabled
        }))

        // Smartly searches for the element for additional time, works on the browser side
        browser.manage().timeouts().implicitlyWait(browser.params.implicitTimeout);

        beforeEach(function () {
            browser.get('')
            browser.sleep(browser.params.customTimeout)
        })

        // This function will be executed after each IT block in this DESCRIBE block
        afterEach(function () {
            // Wiping cookie files ONLY for current domain
            browser.manage().deleteAllCookies()
            // Wiping local and session storage
            browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
                    .then(undefined,
                function (err) {
                // Errors will be thrown when browser is on default data URL.
                // Session and Local storage is disabled for data URLs
                })
            // Wiping indexedDB
            browser.executeScript(`
            indexedDB.webkitGetDatabaseNames().onsuccess = function(sender,args){
                for (let dbname of sender.target.result) {
                    indexedDB.deleteDatabase(dbname)
                }
            };
            `).then(undefined,
                function (err) {
                // Errors will be thrown when browser is on default data URL.
                // indexedDB storage is disabled for data URLs
                })
        })
    }

}

if (process.env.TRAVIS_BUILD_NUMBER) {
    let configCI = require('./ci.conf.js').configCI

    module.exports.config = Object.assign(config, configCI)
} else {
    module.exports.config = config
}
