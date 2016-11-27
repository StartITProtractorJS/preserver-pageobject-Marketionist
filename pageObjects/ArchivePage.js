let BasePage = require('./BasePage.js').BasePage
let EC = protractor.ExpectedConditions

class ArchivePage extends BasePage {

    constructor() {
        super()
        this.iconUnarchive = $('[title="Unarchive"] > .fa-upload')
        this.iconDelete = $('[title="Delete"] > .fa-trash')
    }

    unarchiveNote() {
        browser.actions().mouseMove(this.noteFirst).perform()
        this.iconUnarchive.click()
        browser.wait(EC.visibilityOf(this.notificationSuccess), browser.params.customTimeout,
            'Success notification should be visible after note unarchiving')
        this.goTo(this.optionMyNotes)
    }

    deleteNote() {
        browser.actions().mouseMove(this.noteFirst).perform()
        this.iconDelete.click()
        browser.wait(EC.visibilityOf(this.notificationSuccess), browser.params.customTimeout,
            'Success notification should be visible after note deletion')
        this.goTo(this.optionRecycleBin)
    }
}

// Exports this page object to use it in all other files
module.exports.ArchivePage = ArchivePage
