module.exports.config = {
    useAllAngular2AppRoots: true,
    specs: 'spec.js',
    directConnect: true,
    // Custom parameters can be specified here
    params: {
        // Custom timeouts to wait for elements on the page
        customTimeout: 3000,
        customMinTimeout: 500,
    }
}
